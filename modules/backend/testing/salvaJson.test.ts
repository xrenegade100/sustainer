import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as fs from 'fs';
import sinon from 'sinon';
import AddestramentoController from '../src/Controller/AddestramentoController';

describe('Testing unità per AddestramentoController.salvaJson()', () => {
  let req: any;
  let res: any;
  let status: number | undefined;
  let jsonResponse: any;
  let addStub: any;
  let findStub: any;

  beforeEach(() => {
    res = {
      status: (s: number) => {
        status = s;
        return res;
      },
      json: (data: any) => {
        jsonResponse = data;
      },
    };

    addStub = sinon
      .stub(AddestramentoController, 'leggiNomiColonneCSV')
      .returns(['Survived', 'Sex', 'Age', 'Fare', 'Embarked', 'Pclass']);

    findStub = sinon.stub(Array.prototype, 'find').returns('test.csv');
  });

  afterEach(() => {
    addStub.restore();
    findStub.restore();
  });

  it('Caso di errore, tipoModello:errore - decisionTreeCriterioDiSuddivisione:ok - decisionTreeProfondita:ok - decisionTreeCampioniFoglia:ok - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello": "provaCocco","decisionTreeCriterioDiSuddivisione":"entropia","decisionTreeProfondita":"2", "decisionTreeCampioniFoglia":"2", "target":"Survived" }',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - decisionTreeCriterioDiSuddivisione:errore - decisionTreeProfondita:ok - decisionTreeCampioniFoglia:ok - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello": "decisiontree","decisionTreeCriterioDiSuddivisione":"1","decisionTreeProfondita":"2", "decisionTreeCampioniFoglia":"2", "target":"Survived" }',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - decisionTreeCriterioDiSuddivisione:ok - decisionTreeProfondita:errore - decisionTreeCampioniFoglia:ok - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello": "decisiontree","decisionTreeCriterioDiSuddivisione":"entropia","decisionTreeProfondita":"base", "decisionTreeCampioniFoglia":"2", "target":"Survived" }',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - decisionTreeCriterioDiSuddivisione:ok - decisionTreeProfondita:ok - decisionTreeCampioniFoglia:errore - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello": "decisiontree","decisionTreeCriterioDiSuddivisione":"entropia","decisionTreeProfondita":"2", "decisionTreeCampioniFoglia":"", "target":"Survived" }',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - decisionTreeCriterioDiSuddivisione:ok - decisionTreeProfondita:ok - decisionTreeCampioniFoglia:ok - target:errore', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello": "decisiontree","decisionTreeCriterioDiSuddivisione":"entropia","decisionTreeProfondita":"2", "decisionTreeCampioniFoglia":"2", "target":"Cabin" }',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - naiveBayesDistribuzione:errore - naiveBayesSmoothing:ok - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello":"naivebayes","naiveBayesDistribuzione":"gaussian&multinomial","naiveBayesSmoothing":"0.7","target":"SibSp"}',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - naiveBayesDistribuzione:ok - naiveBayesSmoothing:errore - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello":"naivebayes","naiveBayesDistribuzione":"gaussian","naiveBayesSmoothing":"0,7","target":"SibSp"}',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di errore, tipoModello:ok - naiveBayesDistribuzione:ok - naiveBayesSmoothing:ok - target:errore', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello":"naivebayes","naiveBayesDistribuzione":"gaussian","naiveBayesSmoothing":"0.74","target":"None"}',
      },
      session: {
        idUser: 14,
      },
    };

    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(422);
  });

  it('Caso di successo, tipoModello:ok - decisionTreeCriterioDiSuddivisione:ok - decisionTreeProfondita:ok - decisionTreeCampioniFoglia:ok - target:ok', async () => {
    req = {
      body: {
        contenuto:
          '{"tipoModello": "decisiontree","decisionTreeCriterioDiSuddivisione":"entropia","decisionTreeProfondita":"2", "decisionTreeCampioniFoglia":"2", "target":"Survived" }',
      },
      session: {
        idUser: 14,
      },
    };
    // Chiamata al metodo e attesa dell'esecuzione asincrona
    await AddestramentoController.salvaJson(req, res);

    // Verifica delle asserzioni
    expect(status).to.equal(200);
    expect(jsonResponse).to.deep.equal({
      success: 'File salvato correttamente',
    });

    fs.unlink('src/Dataset/14.json', (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Errore durante la cancellazione del file:', err);
      }
    });
  });
});
