import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Request, Response } from 'express';
import AddestramentoController from '../src/Controller/AddestramentoController';
import sinon from 'sinon';

describe('Selezione gruppo privilegiato', () => {
  it('Sbagliato', async () => {
    let status: number | undefined;
    let jsonResponse: any;
    let addStub: any;
    let findStub: any;

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
      json: (data: any) => {
        jsonResponse = data;
      },
    } as Response;

    addStub = sinon
      .stub(AddestramentoController, 'leggiNomiColonneCSV')
      .returns(['Survived', 'Sex', 'Age', 'Fare', 'Embarked', 'Pclass']);

    findStub = sinon.stub(Array.prototype, 'find').returns(undefined);

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.attributiDataset(req, res);

    addStub.restore();
    findStub.restore();

    //console.log('jsonResponse:', jsonResponse);

    // Verifica delle asserzioni
    expect(status).to.equal(403);
  });
  it('Corretto', async () => {
    let status: number | undefined;
    let jsonResponse: any;
    let addStub: any;
    let findStub: any;

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
      json: (data: any) => {
        jsonResponse = data;
      },
    } as Response;

    addStub = sinon
      .stub(AddestramentoController, 'leggiNomiColonneCSV')
      .returns(['Survived', 'Sex', 'Age', 'Fare', 'Embarked', 'Pclass']);

    findStub = sinon.stub(Array.prototype, 'find').returns('1.csv');

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.attributiDataset(req, res);

    addStub.restore();
    findStub.restore();

    //console.log('jsonResponse:', jsonResponse);

    // Verifica delle asserzioni
    expect(status).to.equal(200);
  });
});
