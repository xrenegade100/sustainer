import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

class ModelloController {
  static salvaJson = async (req: Request, res: Response) => {
    try {
      const { contenuto } = req.body;
      console.log(contenuto);
      // Costruisci il nome del file in base ai parametri ricevuti
      const nomeFile = 'parametri.json';
      // Specifica il percorso completo del file
      const percorsoCompleto = path.join(
        'src',
        'InserimentoParametri',
        nomeFile,
      );
      const jsonSenzaEscape = JSON.parse(contenuto);

      console.log(percorsoCompleto); // Replace 'consol' with 'console'
      fs.writeFileSync(percorsoCompleto, JSON.stringify(jsonSenzaEscape));
      res.status(200).json({ success: 'File salvato correttamente' });
    } catch (err) {
      res.status(500).json({ error: 'Errore nel salvataggio del file' });
    }
  }; // Add a semicolon here

  static leggiCSV = async (req: Request, res: Response) => {
    try {
      // Specifica la directory in cui cercare i file CSV
      const directory = path.join('src', 'InserimentoParametri');

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

      console.log(primaRigaCSV);

      res
        .status(200)
        .json({ success: 'File CSV letto correttamente', data: primaRigaCSV });
    } catch (err) {
      console.error('Errore:', err);
      res.status(500).json({ error: 'Errore nella lettura del file CSV' });
    }
  };

  // Metodo per leggere la prima riga di un file CSV
  private static leggiNomiColonneCSV = async (
    percorsoFileCSV: string,
  ): Promise<string[] | null> =>
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
