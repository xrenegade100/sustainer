import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import AddestramentoController from '../src/Controller/AddestramentoController';

describe('Testing unità per AddestramentoController.attributiDataset()', () => {
  it('Caso di errore, sessione:errore', async () => {
    let status: number | undefined;

    const req = {
      session: {
        idUser: 12,
      },
    } as unknown as Request;

    const res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: () => {},
    } as Response;

    const addStub = sinon
      .stub(AddestramentoController, 'leggiNomiColonneCSV')
      .returns(['Survived', 'Sex', 'Age', 'Fare', 'Embarked', 'Pclass']);

    const findStub = sinon.stub(Array.prototype, 'find').returns(undefined);

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.attributiDataset(req, res);

    addStub.restore();
    findStub.restore();

    // Verifica delle asserzioni
    expect(status).to.equal(403);
  });
  it('Caso di successo, sessione:ok', async () => {
    let status: number | undefined;

    const req = {
      session: {
        idUser: 1,
      },
    } as unknown as Request;

    const res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: () => {},
    } as Response;

    const addStub = sinon
      .stub(AddestramentoController, 'leggiNomiColonneCSV')
      .returns(['Survived', 'Sex', 'Age', 'Fare', 'Embarked', 'Pclass']);

    const findStub = sinon.stub(Array.prototype, 'find').returns('1.csv');

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.attributiDataset(req, res);

    addStub.restore();
    findStub.restore();

    // Verifica delle asserzioni
    expect(status).to.equal(200);
  });
});
