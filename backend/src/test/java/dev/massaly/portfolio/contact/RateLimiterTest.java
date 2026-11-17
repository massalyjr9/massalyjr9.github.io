package dev.massaly.portfolio.contact;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneOffset;

import org.junit.jupiter.api.Test;

class RateLimiterTest {

    private final MutableClock clock = new MutableClock(Instant.parse("2026-01-01T10:00:00Z"));
    private final RateLimiter limiter =
            new RateLimiter(new ContactProperties("a@b.c", "a@b.c", 2, Duration.ofHours(1)), clock);

    @Test
    void bloqueAuDelaDuQuota() {
        assertThat(limiter.tryAcquire("1.2.3.4")).isTrue();
        assertThat(limiter.tryAcquire("1.2.3.4")).isTrue();
        assertThat(limiter.tryAcquire("1.2.3.4")).isFalse();
    }

    @Test
    void compteChaqueIpSeparement() {
        limiter.tryAcquire("1.1.1.1");
        limiter.tryAcquire("1.1.1.1");

        assertThat(limiter.tryAcquire("2.2.2.2")).isTrue();
    }

    @Test
    void libereLeQuotaQuandLaFenetreExpire() {
        limiter.tryAcquire("1.2.3.4");
        limiter.tryAcquire("1.2.3.4");

        clock.advance(Duration.ofMinutes(61));

        assertThat(limiter.tryAcquire("1.2.3.4")).isTrue();
    }

    private static final class MutableClock extends Clock {
        private Instant now;

        MutableClock(Instant now) {
            this.now = now;
        }

        void advance(Duration d) {
            now = now.plus(d);
        }

        @Override
        public Instant instant() {
            return now;
        }

        @Override
        public java.time.ZoneId getZone() {
            return ZoneOffset.UTC;
        }

        @Override
        public Clock withZone(java.time.ZoneId zone) {
            return this;
        }
    }
}
