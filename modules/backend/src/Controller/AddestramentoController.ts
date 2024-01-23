/* eslint-disable dot-notation */
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import serviziModelloImpl from '../modello/service/ServiziModelloImpl';
import multer from 'multer';
import stream from 'stream';

class AddestramentoController {
  upload = multer();
  private static pathModello: string;

  static AddestramentoIMP = async (req: Request, res: Response) => {
    const { gruppoPrivilegiato } = req.body;
    let gruppoPrivilegiatoStringa: string = '';
    const urlWithParams = new URL('http://127.0.0.1:8000/');

    gruppoPrivilegiato.state.forEach((element: any) => {
      gruppoPrivilegiatoStringa += `${element.id}, `;
      urlWithParams.searchParams.append(`${element.id}`, 'true');
    });

    const fileRelativePathJson = `src/Dataset/${req.session!.idUser}.json`;
    const fileRelativePathDataset = `src/Dataset/${req.session!.idUser}.csv`;

    // Ottieni il percorso assoluto del file utilizzando il modulo path
    const absolutePathJson = path.resolve(fileRelativePathJson);
    const absolutePathDataset = path.resolve(fileRelativePathDataset);

    const responseAddestramento = await fetch(urlWithParams, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        pathJson: absolutePathJson,
        pathDataset: absolutePathDataset,
      }),
    });

    let contenuto: any;
    try {
      const fileContent = fs.readFileSync(fileRelativePathJson, 'utf-8');
      contenuto = JSON.parse(fileContent);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error reading JSON file: ${error}`);
    }

    if (responseAddestramento.ok) {
      // Estrai i dati dalla risposta
      const data = await responseAddestramento.json();
      serviziModelloImpl.salvaModelloImpl(
        req.session!.idUser,
        gruppoPrivilegiatoStringa,
        data.recall,
        data.precision,
        data.accuracy,
        Number(data.emissions),
        0,
        // eslint-disable-next-line dot-notation
        contenuto['tipoModello'] === 'decisiontree'
          ? 'Decision Tree'
          : 'Naive Bayes',
      );
      this.pathModello = data.pathModello;

      fs.unlink(fileRelativePathJson, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('Errore durante la cancellazione del file:', err);
        }
      });

      fs.unlink(fileRelativePathDataset, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error('Errore durante la cancellazione del file:', err);
        }
      });

      return res.status(200).json({
        addestramento: true,
      });
    }
    return res.status(400).json({
      addestramento: false,
    });
  };

  static downloadIMP = async (req: Request, res: Response) => {
    res.download(this.pathModello, 'modelloAddestrato.pkl', (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('Errore durante il download del file:', err);
        res.status(500).send('Errore durante il download del file');
      }
    });
  };

  static salvaJson = async (req: Request, res: Response) => {
    try {
      console.log('ciao');
      const { contenuto } = req.body;
      let parametriCorretti = false;
      const jsonSenzaEscape = JSON.parse(contenuto);

      // Specifica la directory in cui cercare i file CSV
      const directory = path.join('src', 'Dataset');

      // Leggi il contenuto della directory
      const files = fs.readdirSync(directory);
      const nome = `${String(req.session!.idUser)}.csv`;
      // Trova il primo file CSV nella directory
      const nomeFileCSV = files.find((file) => file.endsWith(nome));

      if (!nomeFileCSV) {
        throw new Error('Nessun file CSV trovato nella directory.');
      }

      // Specifica il percorso completo del file CSV
      const percorsoCompletoCSV = path.join(directory, nomeFileCSV);

      // Leggo attributi del file CSV
      const primaRigaCSV = await AddestramentoController.leggiNomiColonneCSV(
        percorsoCompletoCSV,
      );

      console.log(
        jsonSenzaEscape['tipoModello'],
        jsonSenzaEscape['decisionTreeCriterioDiSuddivisione'],
      );

      if (jsonSenzaEscape['tipoModello'] === 'decisiontree') {
        // eslint-disable-next-line operator-linebreak
        const tipoAddestramento =
          jsonSenzaEscape['decisionTreeCriterioDiSuddivisione'];
        if (tipoAddestramento === 'entropia' || tipoAddestramento === 'gini') {
          const profondita = jsonSenzaEscape['decisionTreeProfondita'];
          if (profondita > 1 && profondita <= 99) {
            const campFoglia = jsonSenzaEscape['decisionTreeCampioniFoglia'];
            if (campFoglia > 0 && campFoglia <= 999) {
              if (primaRigaCSV?.includes(jsonSenzaEscape['target'])) {
                parametriCorretti = true;
              }
            }
          }
        }
      } else if (jsonSenzaEscape['tipoModello'] === 'naivebayes') {
        const distribuzione = jsonSenzaEscape['naiveBayesDistribuzione'];
        if (distribuzione === 'gaussian' || distribuzione === 'multinomial') {
          const smoothing = jsonSenzaEscape['naiveBayesSmoothing'];
          if (smoothing >= 0 && smoothing <= 1) {
            if (primaRigaCSV?.includes(jsonSenzaEscape['target'])) {
              parametriCorretti = true;
            }
          }
        }
      }

      if (parametriCorretti) {
        // Costruisci il nome del file in base ai parametri ricevuti
        const nomeFile = `${String(req.session!.idUser)}.json`;
        // Specifica il percorso completo del file
        const percorsoCompleto = path.join('src/Dataset', nomeFile);

        fs.writeFileSync(percorsoCompleto, JSON.stringify(jsonSenzaEscape));
        return res.status(200).json({ success: 'File salvato correttamente' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Errore nel salvataggio del file' });
    }
    return res.status(422).json({ error: 'Parametri errati' });
  };

  static attributiDataset = async (req: Request, res: Response) => {
    try {
      // Specifica la directory in cui cercare i file CSV
      const directory = path.join('src', 'Dataset');

      // Leggi il contenuto della directory
      const files = fs.readdirSync(directory);
      const nome = `${String(req.session!.idUser)}.csv`;
      // Trova il primo file CSV nella directory
      const nomeFileCSV = files.find((file) => file.endsWith(nome));

      if (!nomeFileCSV) {
        return res
          .status(403)
          .json({ error: 'Nessun file CSV trovato nella directory.' });
      }

      // Specifica il percorso completo del file CSV
      const percorsoCompletoCSV = path.join(directory, nomeFileCSV);

      // Chiama il metodo per leggere la prima riga del file CSV
      const primaRigaCSV = await AddestramentoController.leggiNomiColonneCSV(
        percorsoCompletoCSV,
      );
      return res
        .status(200)
        .json({ success: 'File CSV letto correttamente', data: primaRigaCSV });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Errore:', err);
      return res
        .status(500)
        .json({ error: 'Errore nella lettura del file CSV' });
    }
  };

  // Metodo per leggere la prima riga di un file CSV
  private static leggiNomiColonneCSV = async (
    percorsoFileCSV: string,
  ): Promise<string[] | null> =>
    // eslint-disable-next-line implicit-arrow-linebreak
    new Promise((resolve, reject) => {
      const nomiColonne: string[] = [];

      fs.createReadStream(percorsoFileCSV)
        .pipe(csv())
        .on('headers', (headers) => {
          // I nomi delle colonne sono disponibili in questo evento
          nomiColonne.push(...headers);
          // Interrompi la lettura dopo aver ottenuto i nomi delle colonne
          resolve(nomiColonne);
        })
        .on('end', () => {
          // Se il file è vuoto, risolvi con null
          if (nomiColonne.length === 0) {
            resolve(null);
          }
        })
        .on('error', (errore) => {
          reject(errore);
        });
    });

  private static estraiRighe = async (filePath: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      let results: any[] = [];

      fs.createReadStream(filePath)
        .on('data', (data) => {
          const righe = data.toString().split('\n');
          let flag = false;
          if (righe[0].split(',').length <= 1) {
            reject(new Error('Il file non è valido'));
          }
        })
        .pipe(csv({ separator: ',' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results);
        });
    });
  };

  private static salvataggioFile = async (
    filePath: string,
    file: Buffer,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file, (err: any) => {
        if (err) {
          console.error('Errore durante il salvataggio del file:', err);
          reject(err);
        }
        resolve();
      });
    });
  };

  private static async verificaCSV(
    filePath: string,
    separatoreDesiderato: string,
  ) {
    try {
      const results: any[] = await AddestramentoController.estraiRighe(
        filePath,
      );
      const colonne = Object.keys(results[0]);
      return colonne.length >= 2;
    } catch (err) {
      return 500;
    }
  }

  static caricaFileIMP = async (req: Request, res: Response) => {
    const file: Express.Multer.File | undefined = req.file;

    // Controlla che sia stato caricato un file
    if (!file) {
      console.log('Nessun file caricato.');
      return res.status(408).send('Nessun file caricato.');
    }

    // Controlla che il file abbia estensione .csv
    const esensioneFilePermesse = ['csv'];
    const estensioneFile = file.originalname.slice(
      ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2,
    );

    if (!esensioneFilePermesse.includes(estensioneFile.toLowerCase())) {
      return res.status(501).send('Il file deve avere estensione .csv.');
    }

    // Salva il file nella directory 'src/Dataset'
    await AddestramentoController.salvataggioFile(
      `src/Dataset/${req.session!.idUser}.csv`,
      file.buffer,
    );

    const separator = ',';

    const result = await AddestramentoController.verificaCSV(
      `src/Dataset/${req.session!.idUser}.csv`,
      separator,
    );

    if (result === 500) {
      return res.status(408).json({
        success: 'Il file CSV non utilizza la virgola come separatore.',
      });
    } else if (!result) {
      return res.status(408).json({
        success: 'Il file CSV non ci sono almeno 2 colonne.',
      });
    } else {
      return res.status(200).json({
        success: 'File caricato con successo',
      });
    }
  };
}

export default AddestramentoController;
