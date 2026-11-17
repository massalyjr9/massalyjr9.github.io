package dev.massaly.portfolio.contact;

import java.time.Clock;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

/**
 * Limite le nombre d'envois par adresse IP sur une fenêtre glissante.
 * En mémoire : suffisant pour une seule instance, à remplacer par Redis si l'API passe à plusieurs instances.
 */
@Component
public class RateLimiter {

    private final Map<String, Deque<Instant>> hits = new ConcurrentHashMap<>();
    private final ContactProperties properties;
    private final Clock clock;

    public RateLimiter(ContactProperties properties, Clock clock) {
        this.properties = properties;
        this.clock = clock;
    }

    /** @return {@code true} si l'appel est autorisé (et le comptabilise), {@code false} sinon. */
    public boolean tryAcquire(String key) {
        Instant now = clock.instant();
        Instant windowStart = now.minus(properties.window());
        Deque<Instant> timestamps = hits.computeIfAbsent(key, k -> new ArrayDeque<>());
        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(windowStart)) {
                timestamps.pollFirst();
            }
            if (timestamps.size() >= properties.maxPerWindow()) {
                return false;
            }
            timestamps.addLast(now);
            return true;
        }
    }
}
