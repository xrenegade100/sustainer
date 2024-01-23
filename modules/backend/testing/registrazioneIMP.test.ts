/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub } from 'sinon';
// eslint-disable-next-line object-curly-newline
import { describe, it, beforeEach, afterEach } from 'mocha';
import { Request, Response } from 'express'; // Assicurati di importare i tipi di Express corretti
import ServiziUtenteImpl from '../src/account/service/ServiziUtenteImpl';
import PianoController from '../src/Controller/PianoController';
import UtenteController from '../src/Controller/UtenteController';

describe('Testing unità per UtenteController.registrazioneIMP()', () => {
  let sandbox: SinonSandbox;
  let req: any;
  let res: any;
  let status: number | undefined;
  let jsonResponse: any;
  let userStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    userStub = sandbox.stub(ServiziUtenteImpl, 'register');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Caso di errore, nome:ok - cognome:ok - email:già utilizzata - password:ok', async () => {
    req = {
      body: {
        nome: 'Mario',
        cognome: 'Rossi',
        emailr: 'mario@rossi.it',
        passwordr: 'Password123!',
      },
    } as Request;

    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    } as Response;

    userStub
      .withArgs('Luca', 'Leo', 'mario@rossi.it', 'Password123!')
      .resolves({
        getNome: () => req.body.nome,
        getCognome: () => req.body.cognome,
        getEmail: () => req.body.email,
        getPassword: () => req.body.password,
      });

    await UtenteController.registrazioneIMP(req, res);

    // Asserting expectations
    expect(status).to.equal(400);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message: 'Errore ritrovamento utente',
    });
  });

  it('Caso di errore, nome:errore - cognome:ok - email:ok - password:ok', async () => {
    req = {
      body: {
        nome: '123', // Nome non valido
        cognome: 'Rossi',
        emailr: 'mario@rossi.it',
        passwordr: 'Password123!',
      },
    } as Request;

    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    } as Response;

    await UtenteController.registrazioneIMP(req, res);

    // Asserting expectations
    expect(status).to.equal(400);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message:
        'Il nome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
    });
  });

  it('Caso di errore, nome:ok - cognome:errore - email:ok - password:ok', async () => {
    req = {
      body: {
        nome: 'Mario', // Nome non valido
        cognome: '123',
        emailr: 'mario@rossi.it',
        passwordr: 'Password123!',
      },
    } as Request;

    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    } as Response;

    await UtenteController.registrazioneIMP(req, res);

    // Asserting expectations
    expect(status).to.equal(400);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message:
        'Il cognome deve contenere solo lettere, non deve essere vuoto e non deve superare i 100 caratteri',
    });
  });

  it('Caso di errore, nome:ok - cognome:ok - email:errore - password:ok', async () => {
    req = {
      body: {
        nome: 'Mario', // Nome non valido
        cognome: 'Rossi',
        emailr: 'mario@rossi',
        passwordr: 'Password123!',
      },
    } as Request;

    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    } as Response;

    await UtenteController.registrazioneIMP(req, res);

    // Asserting expectations
    expect(status).to.equal(400);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message: 'Email non rispetta il formato corretto (es. mario@rossi.it)',
    });
  });

  it('Caso di errore, nome:ok - cognome:ok - email:ok - password:errore', async () => {
    req = {
      body: {
        nome: 'Mario', // Nome non valido
        cognome: 'Rossi',
        emailr: 'mario@rossi.it',
        passwordr: 'Password',
      },
    } as Request;

    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    } as Response;

    await UtenteController.registrazioneIMP(req, res);

    // Asserting expectations
    expect(status).to.equal(400);
    expect(jsonResponse).to.deep.equal({
      success: false,
      message: 'Errore ritrovamento utente',
    });
  });

  it('Caso di successo, nome:ok - cognome:ok - email:ok - password:ok', async () => {
    req = {
      body: {
        nome: 'Mario',
        cognome: 'Rossi',
        emailr: 'mario@rossi.it',
        passwordr: 'Password123!',
      },
    } as Request;

    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
        return jsonResponse;
      },
    } as Response;

    const getIdUtenteStub = sandbox.stub(ServiziUtenteImpl, 'getIdUtente');
    const acquistoPianoFreeStub = sandbox.stub(
      PianoController,
      'AcquistoPianoFreeIMP',
    );

    await UtenteController.registrazioneIMP(req, res);

    // Asserting expectations
    expect(status).to.equal(200);
    expect(jsonResponse).to.deep.equal({
      success: true,
      message: 'Registrazione effettuata con successo',
    });

    // Verifica che i metodi siano stati chiamati con i parametri corretti
    // eslint-disable-next-line no-unused-expressions
    expect(
      userStub.calledWithExactly(
        'Mario',
        'Rossi',
        'mario@rossi.it',
        sinon.match.string,
      ),
    ).to.be.true;

    // eslint-disable-next-line no-unused-expressions
    expect(getIdUtenteStub.calledWithExactly('mario@rossi.it')).to.be.true;
    expect(acquistoPianoFreeStub.calledWithExactly(sinon.match.any)).to.be.true;

    // Ripristina gli stub
    userStub.restore();
    getIdUtenteStub.restore();
    acquistoPianoFreeStub.restore();
  });
});
