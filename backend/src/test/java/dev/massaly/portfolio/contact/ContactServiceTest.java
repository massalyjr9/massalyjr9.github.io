package dev.massaly.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import java.time.Duration;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    JavaMailSender mailSender;

    ContactService service;

    @BeforeEach
    void setUp() {
        var properties = new ContactProperties("moi@example.com", "noreply@example.com", 5, Duration.ofHours(1));
        service = new ContactService(mailSender, properties);
    }

    @Test
    void envoieUnEmailAvecReplyToVersLExpediteur() {
        service.send(new ContactRequest("Jeanne Martin", "jeanne@acme.fr", "Acme", "Bonjour, parlons d'un poste.", null));

        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(captor.capture());
        SimpleMailMessage mail = captor.getValue();
        assertThat(mail.getTo()).containsExactly("moi@example.com");
        assertThat(mail.getFrom()).isEqualTo("noreply@example.com");
        assertThat(mail.getReplyTo()).isEqualTo("jeanne@acme.fr");
        assertThat(mail.getSubject()).contains("Jeanne Martin");
        assertThat(mail.getText()).contains("Acme").contains("parlons d'un poste");
    }

    @Test
    void ignoreSilencieusementLesMessagesDuHoneypot() {
        service.send(new ContactRequest("Bot", "bot@spam.io", null, "Buy cheap stuff now!!!", "http://spam.io"));

        verify(mailSender, never()).send(any(SimpleMailMessage.class));
    }

    @Test
    void encapsuleLesErreursSmtp() {
        doThrow(new MailSendException("smtp down")).when(mailSender).send(any(SimpleMailMessage.class));

        assertThatThrownBy(() -> service.send(
                new ContactRequest("Jeanne", "jeanne@acme.fr", null, "Un message assez long.", "")))
                .isInstanceOf(ContactDeliveryException.class);
    }
}
