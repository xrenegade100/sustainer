/* eslint-disable object-curly-newline */
import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub } from 'sinon';
import { describe, it, beforeEach, afterEach } from 'mocha';
import UtenteController from '../src/Controller/UtenteController';
import ServiziUtenteImpl from '../src/account/service/ServiziUtenteImpl';

describe('LoginIMP', () => {
  let sandbox: SinonSandbox;
  let req: any;
  let res: any;
  let status: number | undefined;
  let jsonResponse: any;
  let userStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    userStub = sandbox.stub(ServiziUtenteImpl, 'login');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Dovrebbe restituire true se l'autenticazione va a buon fine", async () => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'Password123!',
      },
      session: {},
    };
    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    };

    // cosa mi aspetto di ricevere
    userStub.withArgs('test@example.com', 'Password123!').resolves({
      getEmail: () => req.body.email,
      getIdUtente: () => 1,
    });

    await UtenteController.loginIMP(req, res);

    expect(status).to.equal(200);
    expect(jsonResponse).to.deep.equal({
      success: true,
      user: 'test@example.com',
    });
  });

  it("Dovrebbe restituire falso se l'email è errata", async () => {
    req = {
      body: {
        email: 'nonexist@mail.it',
        password: 'Password123!',
      },
      session: {},
    };
    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    };

    userStub.withArgs('test@example.com', 'Password123!').resolves({
      getEmail: () => req.body.email,
      getIdUtente: () => 1,
    });

    await UtenteController.loginIMP(req, res);

    expect(status).to.equal(403);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message: 'Utente non trovato',
    });
  });

  it('Dovrebbe restituire falso se la password è errata', async () => {
    req = {
      body: {
        email: 'test@example.com',
        password: '1234',
      },
      session: {},
    };
    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    };

    userStub.withArgs('test@example.com', 'Password123!').resolves({
      getEmail: () => req.body.email,
      getIdUtente: () => 1,
    });

    await UtenteController.loginIMP(req, res);

    expect(status).to.equal(403);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message: 'Utente non trovato',
    });
  });

  it('Dovrebbe restituire false se il login non va a buon fine', async () => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'Password123!',
      },
      session: {},
    };
    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    };

    userStub.rejects(new Error('Errore durante il login'));

    await UtenteController.loginIMP(req, res);

    expect(status).to.equal(500);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message: 'Errore durante il login',
    });
  });
});
