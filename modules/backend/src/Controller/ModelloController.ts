import { Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import serviziModelloImpl from '../modello/service/ServiziModelloImpl';

class ModelloController {
  private static pathModello: string;

  static AddestramentoIMP = async (req: Request, res: Response) => {
    const { gruppoPrivilegiato } = req.body;
    let gruppoPrivilegiatoStringa: string = '';
    const urlWithParams = new URL('http://127.0.0.1:8000/');

    gruppoPrivilegiato.state.forEach((element: any) => {
      gruppoPrivilegiatoStringa += `${element.id}, `;
      urlWithParams.searchParams.append(`${element.id}`, 'true');
    });
    console.log('Il nuovo url è: ', urlWithParams.href);
    console.log('Il gruppo privilegiato è: ', gruppoPrivilegiatoStringa);

    const fileRelativePathJson = `src/Dataset/${'decisionTree.json'}`;
    const fileRelativePathDataset = `src/Dataset/${'Titanic-Dataset.csv'}`;

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
    if (responseAddestramento.ok) {
      // Estrai i dati dalla risposta
      const data = await responseAddestramento.json();
      console.log(data);
      serviziModelloImpl.salvaModelloImpl(
        req.session!.idUser,
        gruppoPrivilegiatoStringa,
        data.recall,
        data.precision,
        data.accuracy,
        Number(data.emissions),
        0,
        'Decision Tree',
      );
      this.pathModello = data.pathModello;
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
        console.error('Errore durante il download del file:', err);
        res.status(500).send('Errore durante il download del file');
      }
    });
  };

  static avanzamentoAddestramento3IMP = async (req: Request, res: Response) => {
    if (req.session!.faseAddestramento === 3) {
      return res.status(200).json({
        avanzamento: 3,
      });
    }
    return res.status(400).json({ avanzamento: false });
  };

  static avanzamentoAddestramento4IMP = async (req: Request, res: Response) => {
    if (req.session!.faseAddestramento === 4) {
      return res.status(200).json({
        avanzamento: 3,
      });
    }
    return res.status(400).json({ avanzamento: false });
  };

  static leggiCSV = async (req: Request, res: Response) => {
    try {
      // Specifica la directory in cui cercare i file CSV
      const directory = path.join('src', 'Dataset');

      // Leggi il contenuto della directory
      const files = fs.readdirSync(directory);

      // Trova il primo file CSV nella directory
      const nomeFileCSV = files.find((file) => file.endsWith('.csv'));

      if (!nomeFileCSV) {
        throw new Error('Nessun file CSV trovato nella directory.');
      }

      // Specifica il percorso completo del file CSV
      const percorsoCompletoCSV = path.join(directory, nomeFileCSV);

      // Chiama il metodo per leggere la prima riga del file CSV
      const primaRigaCSV = await ModelloController.leggiNomiColonneCSV(
        percorsoCompletoCSV,
      );

      res.status(200).json({
        success: 'File CSV letto correttamente',
        data: primaRigaCSV,
        faseAddestramento: req.session!.faseAddestramento,
      });
    } catch (err) {
      console.error('Errore:', err);
      res.status(500).json({ error: 'Errore nella lettura del file CSV' });
    }
  };

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
}

export default ModelloController;
