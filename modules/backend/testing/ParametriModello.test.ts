import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import AddestramentoController from '../src/Controller/AddestramentoController';

describe('Verifica parametri di addestramento', () => {
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

  it('errore tipoModello', async () => {
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

  it('errore decisionTreeCriterioDiSuddivisione', async () => {
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

  it('errore decisionTreeProfondita', async () => {
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

  it('errore decisionTreeCampioniFoglia', async () => {
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

  it('errore target - decisiontree', async () => {
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

  it('errore naiveBayesDistribuzione', async () => {
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

  it('errore naiveBayesSmoothing', async () => {
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

  it('errore target - naivebayes', async () => {
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

  it('verifica correttezza', async () => {
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
  });
});
