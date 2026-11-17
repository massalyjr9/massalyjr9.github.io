package dev.massaly.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Message envoyé depuis le formulaire de contact.
 *
 * @param website champ piège (honeypot) : invisible pour un humain, rempli par les robots.
 */
public record ContactRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 150) String email,
        @Size(max = 100) String company,
        @NotBlank @Size(min = 10, max = 5000) String message,
        String website) {

    public boolean isSpam() {
        return website != null && !website.isBlank();
    }
}
