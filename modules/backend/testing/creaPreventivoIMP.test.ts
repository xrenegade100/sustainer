import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { describe, it } from 'mocha';
import PreventivoController from '../src/Controller/PreventivoController';
import ServiziPreventivoImpl from '../src/preventivo/service/ServiziPreventivoImpl';

describe('Testing unità per PreventivoController.creaPreventivoIMP()', () => {
  let sandbox: SinonSandbox;
  let request: any;
  let response: any;
  let status: number | undefined;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Caso di errore, numero di addestramenti:errore - numero di salvataggi:ok', async () => {
    request = {
      body: {
        limitiAddestramenti: 25,
        limitiSalvataggi: 20,
      },
      session: {
        idUser: 123,
      },
    };
    response = {
      status: (code: number) => {
        status = code;
        return response;
      },
      json: () => {},
    };

    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'creaPreventivo')
      .returns(1);
    await PreventivoController.creaPreventivoIMP(request, response);
    addStub.restore();
    expect(status).to.equal(403);
  });

  it('Caso di errore, numero di addestramenti:ok - numero di salvataggi:errore', async () => {
    request = {
      body: {
        limitiAddestramenti: 10,
        limitiSalvataggi: 55,
      },
      session: {
        idUser: 123,
      },
    };
    response = {
      status: (code: number) => {
        status = code;
        return response;
      },
      json: () => {},
    };

    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'creaPreventivo')
      .returns(1);
    await PreventivoController.creaPreventivoIMP(request, response);
    addStub.restore();
    expect(status).to.equal(403);
  });

  it('Caso di successo, numero di addestramenti:ok - numero di salvataggi:ok', async () => {
    request = {
      body: {
        limitiAddestramenti: 15,
        limitiSalvataggi: 30,
      },
      session: {
        idUser: 123,
      },
    };

    response = {
      status: (code: number) => {
        status = code;
        return response;
      },
      json: () => {},
    };
    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'creaPreventivo')
      .returns(1);
    await PreventivoController.creaPreventivoIMP(request, response);
    addStub.restore();
    expect(status).to.equal(200);
  });
});
