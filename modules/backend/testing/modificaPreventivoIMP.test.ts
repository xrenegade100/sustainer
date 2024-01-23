import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { describe, it } from 'mocha';
import PreventivoController from '../src/Controller/PreventivoController';
import ServiziPreventivoImpl from '../src/piano/service/ServiziPreventivoImpl';

describe('Testing unità per PreventivoController.ModificaPreventivoIMP()', () => {
  let sandbox: SinonSandbox;
  let req: any;
  let res: any;
  let status: number | undefined;
  let jsonResponse: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Caso di errore, stato:errore - prezzo:ok - currentpreventivo:ok', async () => {
    req = {
      body: {
        stato: 'Preso in Lavorazione',
        prezzo: 0,
        currentPreventivo: { idPreventivo: 1 },
      },
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
    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'ModificaPreventivo')
      .returns(undefined);
    await PreventivoController.ModificaPreventivoIMP(req, res);
    addStub.restore();
    // Asserting expectations
    expect(status).to.equal(403);
  });

  it('Caso di errore, stato:ok - prezzo:errore - currentpreventivo:ok', async () => {
    req = {
      body: {
        stato: 'Accettato',
        prezzo: -10,
        currentPreventivo: { idPreventivo: 1 },
      },
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
    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'ModificaPreventivo')
      .returns(undefined);
    await PreventivoController.ModificaPreventivoIMP(req, res);
    addStub.restore();
    // Asserting expectations
    expect(status).to.equal(403);
  });

  it('Caso di errore, stato:ok - prezzo:ok - currentpreventivo:errore', async () => {
    req = {
      body: {
        stato: 'Accettato',
        prezzo: 100,
        currentPreventivo: { idPreventivo: 150 },
      },
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
    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'ModificaPreventivo')
      .returns(undefined);
    await PreventivoController.ModificaPreventivoIMP(req, res);
    addStub.restore();
    // Asserting expectations
    expect(status).to.equal(403);
  });

  it('Caso di successo, stato:ok - prezzo:ok - currentpreventivo:ok', async () => {
    req = {
      body: {
        stato: 'In lavorazione',
        prezzo: 50,
        currentPreventivo: { idPreventivo: 1 },
      },
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
    const addStub = sinon
      .stub(ServiziPreventivoImpl, 'ModificaPreventivo')
      .returns('preventivo corretto');
    await PreventivoController.ModificaPreventivoIMP(req, res);
    addStub.restore();
    // Asserting expectations
    expect(status).to.equal(200);
    expect(jsonResponse).to.deep.equal('preventivo corretto');
  });
});
