package dev.massaly.portfolio.contact;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portfolio.contact")
public record ContactProperties(String recipient, String sender, int maxPerWindow, Duration window) {
}
