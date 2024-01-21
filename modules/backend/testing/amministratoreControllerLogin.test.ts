import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub } from 'sinon';
import { describe, it, beforeEach, afterEach } from 'mocha';
import AmministratoreController from '../src/Controller/AmministratoreController';
import ServiziAmministratoreImpl from '../src/account/service/ServiziAmministratoreImpl';

describe('login', () => {
  let sandbox: SinonSandbox;
  let req: any;
  let res: any;
  let status: number | undefined;
  let jsonResponse: any;
  let userStub: SinonStub;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    userStub = sandbox.stub(ServiziAmministratoreImpl, 'loginIMP');
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
      getIdAmministratore: () => 1,
    });

    await AmministratoreController.login(req, res);

    expect(status).to.equal(200);
    expect(jsonResponse).to.deep.equal({
      success: true,
      user: 'test@example.com',
      adminId: req.session!.idAdmin,
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
      getIdAmministratore: () => 1,
    });

    await AmministratoreController.login(req, res);

    expect(status).to.equal(403);
    expect(jsonResponse).to.deep.equal({
      message: 'amministratore non trovato',
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
      getIdAmministratore: () => 1,
    });

    await AmministratoreController.login(req, res);

    expect(status).to.equal(403);
    expect(jsonResponse).to.deep.equal({
      message: 'amministratore non trovato',
    });
  });
});
