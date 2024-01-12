import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = 'src/Dataset/DatasetCaricati';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedFileTypes = ['csv'];
  const fileExtension = file.originalname.split('.').pop().toLowerCase();

  if (allowedFileTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(
      new Error('Il tipo di file non è supportato. Carica solo file CSV.'),
      false,
    );
  }
};
export async function handleFileUpload(req: any, res: any): Promise<void> {
  try {
    const filePath = req.file.path;

    // Verifica delle colonne del file CSV
    const isValidCsv = await checkCsvColumns(filePath);

    if (!isValidCsv) {
      fs.unlinkSync(filePath);
      return res.status(400).json();
    }

    return res.status(200).json({
      message: 'File caricato con successo',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Errore interno del server',
    });
  }
}
export function checkCsvColumns(filePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const requiredColumns = 2; // Numero minimo di colonne richieste

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('headers', (headers) => {
        // Verifica il numero di colonne
        if (headers.length >= requiredColumns) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

const upload = multer({ storage, fileFilter });

export { upload };
