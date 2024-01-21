import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { describe, it } from 'mocha';
import PreventivoController from '../src/Controller/PreventivoController';
import ServiziPreventivoImpl from '../src/preventivo/service/ServiziPreventivoImpl';

describe('ModificaPreventivoIMP', () => {
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

  it('should handle ModificaPreventivo successfully, stato:ok - prezzo:ok - currentpreventivo:ok', async () => {
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

  it('should handle ModificaPreventivo error, stato:error - prezzo:ok - currentpreventivo:ok', async () => {
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
});
