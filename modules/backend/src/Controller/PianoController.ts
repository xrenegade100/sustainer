import { Request, Response } from 'express';
import serviziPianoImpl from '../piano/service/ServiziPianoImpl';

const stripe = require('stripe')(
  'sk_test_51OURU6DecXgXrLSFz9LkEnm04LN5rAerDrbdfBM1fgSYZTrDiIxGFgnrbKYJS8HF4OR1usty0boZCaAJh5O0OxoR00q7yvc8gZ',
);

class PianoController {
  // metodo che mi consente di visualizzare tutti i piani
  static visualizzaPianiIMP = async (req: Request, res: Response) => {
    // richiamo il metodo getPiani del serviziPianoImpl
    const piani = await serviziPianoImpl.getAllPiani();
    if (piani) {
      return res.status(200).json(piani); // ritorno i piani
    }
    return res.status(403).json({ message: 'piani non trovati' }); // altrimenti ritorno un messaggio di errore
  };

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
        req.session!.idUser,
      );
      const piano = await serviziPianoImpl.getPianoUtente(
        acquisto!.getIdPiano(),
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
      success_url: `http://localhost:5000/registraPianoAcquistato?idPiano=${
        req.body.idPiano
      }&idUtente=${req.session!.idUser}`,
      cancel_url: 'http://localhost:5173/modifica-piano',
    });

    if (session) {
      return res.status(200).json({ checkoutUrl: session.url, success: true });
    }
    return res.status(403).json({ message: 'errore' });
  };

  static RegistraPianoAcquistatoIMP = async (req: Request, res: Response) => {
    serviziPianoImpl.AcquistoPiano(
      Number(req.query.idUtente),
      Number(req.query.idPiano),
    );

    res.status(200).redirect('http://localhost:5173/modifica-piano');
  };

  // --------- metodo che mi consente di annullare il piano ----------
  static AnnullaPianoIMP = async (req: Request, res: Response) => {
    const acquisto = await serviziPianoImpl.gelUltimoAcquistoUtente(
      req.session!.idUser,
    );
    if (acquisto) {
      await serviziPianoImpl.annullaPiano(
        acquisto.getIdUtente(),
        acquisto.getIdPiano(),
      );
      return res
        .status(200)
        .json({ message: 'piano annullato', status: 'success' });
    }
    return res.status(403).json({ message: 'errore' });
  };

  // metodo che mi consente di calcolare la differenza tra due date
  // se il piano è scaduto setto il piano free
  static differenzaGiorniIMP = async (req: Request, res: Response) => {
    const acquisto = await serviziPianoImpl.gelUltimoAcquistoUtente(
      req.session!.idUser,
    );
    if (acquisto) {
      let dataAcquisto = new Date(acquisto.getDataAcquisto());
      dataAcquisto.setDate(dataAcquisto.getDate() + 30);

      let diffInMillisec = dataAcquisto.getTime();
      let milli = 1000 * 3600 * 24;

      let differenzaInGiorni = (diffInMillisec - new Date().getTime()) / milli;

      if (differenzaInGiorni < -1) {
        serviziPianoImpl.AcquistoPianoFree(acquisto.getIdUtente());

        dataAcquisto = new Date(acquisto.getDataAcquisto());
        dataAcquisto.setDate(dataAcquisto.getDate() + 30);

        diffInMillisec = dataAcquisto.getTime();
        milli = 1000 * 3600 * 24;

        differenzaInGiorni = (diffInMillisec - new Date().getTime()) / milli;
      }

      return res.status(200).json(differenzaInGiorni);
    }
    return res.status(403).json({ message: 'errore' });
  };

  static InserimentoPianoEnterpriseIMP = async (
    req: Request,
    res: Response,
  ) => {
    const piano = await serviziPianoImpl.InserimentoPianoEnterprise(
      Number(req.query.prezzo),
      Number(req.query.limiteSalvataggiModelli),
      Number(req.query.limiteAddestramentiModelli),
    );
    // prendo l'id del piano appena inserito
    if (piano && piano.getIdPiano) {
      const acquisto = await serviziPianoImpl.AcquistoPiano(
        Number(req.session!.idUser),
        piano.getIdPiano(),
      );
      if (acquisto) {
        return res
          .status(200)
          .redirect('http://localhost:5173/newPianoEnterprise');
      }
    }
    return res.status(403).json({ message: 'errore' });
  };

  static AcquistoPianoEIMP = async (req: Request, res: Response) => {
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
      success_url: `http://localhost:5000/inserimentoEnterprise?prezzo=${
        req.body.prezzoPiano
      }&limiteSalvataggiModelli=${
        req.body.limSPiano
      }&limiteAddestramentiModelli=${req.body.limAPiano}&idUtente=${
        req.session!.idUser
      }`,
      cancel_url: 'http://localhost:5173/modifica-piano',
    });

    if (session) {
      return res.status(200).json({ checkoutUrl: session.url, success: true });
    }
    return res.status(403).json({ message: 'errore' });
  };
}

export default PianoController;
