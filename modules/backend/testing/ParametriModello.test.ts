import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Request, Response } from 'express';
import AddestramentoController from '../src/Controller/AddestramentoController';

describe('Verifica parametri di addestramento', () => {
  it('verifica correttezza', async () => {
    let status: number | undefined;
    let jsonResponse: any;

    const req = {
      body: {
        contenuto:
          '{"tipoModello": "decisiontree","decisionTreeCriterioDiSuddivisione":"entropia","decisionTreeProfondita":"2", "decisionTreeCampioniFoglia":"2", "target":"Survived" }',
      },
      session: {
        idUser: 14,
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

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(200);
    expect(jsonResponse).to.deep.equal({
      success: 'File salvato correttamente',
    });
  });
});
