import { Request, Response } from 'express';
import serviziPianoImpl from '../piano/service/serviziPianoImpl';

const stripe = require('stripe')(
  'sk_test_51OURU6DecXgXrLSFz9LkEnm04LN5rAerDrbdfBM1fgSYZTrDiIxGFgnrbKYJS8HF4OR1usty0boZCaAJh5O0OxoR00q7yvc8gZ',
);

class PianoController {
  // metodo che ritorna tutti i piani
  static getTipiPianoIMP = async (req: Request, res: Response) => {
    // richiamo il metodo getTipiPiani del serviziPianoImpl
    const piani = await serviziPianoImpl.getTipiPiani();
    if (piani) {
      return res.status(200).json(piani); // ritorno i piani
    }
    return res.status(403).json({ message: 'tipi piani non trovati' }); // altrimenti ritorno un messaggio di errore
  };

  // metodo che mi consentirà di acquistare il piano free
  static AcquistoPianoFreeIMP = async (idUtente: number) => {
    // richiamo il metodo AcquistoPianoFree del serviziPianoImpl
    await serviziPianoImpl.AcquistoPianoFree(idUtente);
  };

  static visulizzaPianoIMP = async (req: Request, res: Response) => {
    if (req.session!.authenticated) {
      const acquisto = await serviziPianoImpl.gelUltimoAcquistoUtente(
        req.session!.id_user,
      );
      const piano = await serviziPianoImpl.getPianoUtente(
        acquisto!.get_id_piano(),
      );
      if (piano) {
        const arr = { piano, acquisto };
        return res.status(200).json(arr);
      }
    }
    return res.status(403).json({ message: 'piano non trovato..' });
  };

  // metodo che mi consentirà di acquistare un piano diverso da quello che già ha l'utente
  static AcquistoPianoIMP = async (req: Request, res: Response) => {
    const { titoloPiano, prezzoPiano } = req.body;
    const session = await stripe.checkout.sessions.create({
      customer_email: req.session!.authenticated,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: titoloPiano,
            },
            unit_amount: Number(prezzoPiano) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:5000/registraPianoAcquistato?id_piano=${
        req.body.idPiano
      }&id_utente=${req.session!.id_user}`,
      cancel_url: 'http://localhost:5173/modifica-piano',
    });

    if (session) {
      return res.status(200).json({ checkoutUrl: session.url, success: true });
    }
    return res.status(403).json({ message: 'errore' });
  };

  static RegistraPianoAcquistatoIMP = async (req: Request, res: Response) => {
    serviziPianoImpl.AcquistoPiano(
      Number(req.query.id_utente),
      Number(req.query.id_piano),
    );

    res.status(200).redirect('http://localhost:5173/modifica-piano');
  };
}

export default PianoController;
