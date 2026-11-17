package dev.massaly.portfolio.contact;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mail.MailSendException;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    private static final String VALID = """
            {"name":"Jeanne Martin","email":"jeanne@acme.fr","company":"Acme","message":"Bonjour, parlons d'un poste."}
            """;

    @Autowired
    MockMvc mvc;

    @MockitoBean
    ContactService contactService;

    @MockitoBean
    RateLimiter rateLimiter;

    @BeforeEach
    void setUp() {
        when(rateLimiter.tryAcquire(anyString())).thenReturn(true);
    }

    @Test
    void accepteUnMessageValide() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID))
                .andExpect(status().isAccepted());

        verify(contactService).send(any(ContactRequest.class));
    }

    @Test
    void rejetteUnFormulaireInvalideAvecLeDetailDesChamps() throws Exception {
        String invalid = """
                {"name":"","email":"pas-un-email","message":"court"}
                """;

        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(invalid))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.message").exists());

        verify(contactService, never()).send(any());
    }

    @Test
    void repond429QuandLeQuotaEstAtteint() throws Exception {
        when(rateLimiter.tryAcquire(anyString())).thenReturn(false);

        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID))
                .andExpect(status().isTooManyRequests());

        verify(contactService, never()).send(any());
    }

    @Test
    void repond502SiLeServeurMailEstIndisponible() throws Exception {
        doThrow(new ContactDeliveryException(new MailSendException("down"))).when(contactService).send(any());

        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID))
                .andExpect(status().isBadGateway());
    }

    @Test
    void autoriseLeFrontEnCors() throws Exception {
        mvc.perform(options("/api/contact")
                        .header("Origin", "http://localhost:4200")
                        .header("Access-Control-Request-Method", "POST"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:4200"));
    }
}
