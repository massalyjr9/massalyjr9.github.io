package dev.massaly.portfolio.contact;

public class RateLimitExceededException extends RuntimeException {

    public RateLimitExceededException() {
        super("Trop de messages envoyés, réessayez plus tard");
    }
}
