import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot : doit rester vide. */
  website: string;
}

export type ContactError = 'invalid' | 'rate-limited' | 'unavailable';

@Injectable({ providedIn: 'root' })
export class ContactApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  send(message: ContactMessage): Observable<void> {
    // L'API peut dormir sur un hébergement gratuit : on laisse le temps du réveil
    return this.http.post<void>(`${this.baseUrl}/api/contact`, message).pipe(
      timeout(60_000),
      map(() => undefined),
      catchError((error: unknown) => throwError(() => toContactError(error))),
    );
  }

  /** Réveille l'API en avance (hébergement gratuit en veille), sans attendre de réponse. */
  warmUp(): void {
    fetch(`${this.baseUrl}/actuator/health`, { mode: 'no-cors' }).catch(() => undefined);
  }
}

function toContactError(error: unknown): ContactError {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 400) return 'invalid';
    if (error.status === 429) return 'rate-limited';
  }
  return 'unavailable';
}
