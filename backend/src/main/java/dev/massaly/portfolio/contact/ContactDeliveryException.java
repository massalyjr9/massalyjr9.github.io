package dev.massaly.portfolio.contact;

public class ContactDeliveryException extends RuntimeException {

    public ContactDeliveryException(Throwable cause) {
        super("Échec de l'envoi du message", cause);
    }
}
