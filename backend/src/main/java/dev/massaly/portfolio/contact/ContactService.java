package dev.massaly.portfolio.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final JavaMailSender mailSender;
    private final ContactProperties properties;

    public ContactService(JavaMailSender mailSender, ContactProperties properties) {
        this.mailSender = mailSender;
        this.properties = properties;
    }

    /** Envoie le message par email. Les envois piégés par le honeypot sont ignorés sans erreur. */
    public void send(ContactRequest request) {
        if (request.isSpam()) {
            log.info("Message ignoré : honeypot rempli");
            return;
        }
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(properties.sender());
        mail.setTo(properties.recipient());
        mail.setReplyTo(request.email());
        mail.setSubject("[Portfolio] Message de " + request.name());
        mail.setText(body(request));
        try {
            mailSender.send(mail);
        } catch (MailException e) {
            throw new ContactDeliveryException(e);
        }
    }

    private static String body(ContactRequest request) {
        String company = request.company() == null || request.company().isBlank() ? "—" : request.company();
        return """
                Nom : %s
                Email : %s
                Entreprise : %s

                %s
                """.formatted(request.name(), request.email(), company, request.message());
    }
}
