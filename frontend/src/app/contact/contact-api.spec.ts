import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactApi, ContactMessage } from './contact-api';

const MESSAGE: ContactMessage = {
  name: 'Jeanne',
  email: 'jeanne@acme.fr',
  company: '',
  message: 'Bonjour, parlons d’un poste.',
  website: '',
};

describe('ContactApi', () => {
  let api: ContactApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(ContactApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('envoie le message en POST', () => {
    let done = false;
    api.send(MESSAGE).subscribe(() => (done = true));

    const req = http.expectOne((r) => r.url.endsWith('/api/contact'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(MESSAGE);
    req.flush(null, { status: 202, statusText: 'Accepted' });
    expect(done).toBe(true);
  });

  it.each([
    [400, 'invalid'],
    [429, 'rate-limited'],
    [502, 'unavailable'],
  ])('traduit le statut %i en erreur « %s »', (status, expected) => {
    let error: unknown;
    api.send(MESSAGE).subscribe({ error: (e) => (error = e) });

    http.expectOne((r) => r.url.endsWith('/api/contact')).flush(null, { status, statusText: 'Erreur' });
    expect(error).toBe(expected);
  });
});
