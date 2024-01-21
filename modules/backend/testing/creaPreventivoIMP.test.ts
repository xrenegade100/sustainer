import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { describe, it } from 'mocha';
import PreventivoController from '../src/Controller/PreventivoController';
import ServiziPreventivoImpl from '../src/preventivo/service/ServiziPreventivoImpl';

describe('Test unitari per creaPreventivoIMP', () => {
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

  it('L’acquisto del piano Enterprise non va a buon fine se il numero di addestramenti è troppo grande', async () => {
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

    const addStub = sinon.stub(ServiziPreventivoImpl, 'creaPreventivo').returns(1);
    await PreventivoController.creaPreventivoIMP(request, response);
    addStub.restore();
    expect(status).to.equal(403);
  });

  it('L’acquisto del piano Enterprise non va a buon fine se il numero di salvataggi è troppo grande', async () => {
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

    const addStub = sinon.stub(ServiziPreventivoImpl, 'creaPreventivo').returns(1);
    await PreventivoController.creaPreventivoIMP(request, response);
    addStub.restore();
    expect(status).to.equal(403);
  });

  it('L’acquisto del piano Enterprise va a buon fine', async () => {
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
    const addStub = sinon.stub(ServiziPreventivoImpl, 'creaPreventivo').returns(1);
    await PreventivoController.creaPreventivoIMP(request, response);
    addStub.restore();
    expect(status).to.equal(200);
  });
});
