import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Homepage.css';
import Footer from '../components/Footer';

const homepage = () => (
  <div className="all">
    <div className="header">
      <Navbar />
    </div>
    <div className="body">
      <img className="img-logoblue" src="/logoblue.png" alt="" />

      <img className="img-scritta" src="/Scrittahome.png" alt="" />

      <button className="tasto-au">
        <a href="#about-us-section" className="testo-white">
          About us
        </a>
      </button>

      <div className="sez-testo">
        <img className="img-loghihome" src="/loghihome.png" alt="" />
        <div className="paragrafi">
          <p>Approccio personalizzato</p>
          <p>Sostenibilità ambientale ed energetica</p>
          <p>Personalizzazione delle soluzioni</p>
          <p>Programmazione facilitata</p>
        </div>
      </div>
      <div className="about-sup" id="about-us-section">
        <div className="sin">
          <img className="img-razzo" src="/razzo.png" alt="" />
          <p>
            Siamo consapevoli delle sfide cruciali legate all'utilizzo dell'IA,
            come l'etica nella selezione del personale e l'impatto ambientale.
            Sustainer si impegna a affrontare queste sfide, supportando coloro
            che lavorano per realizzare sistemi che promuovono l'equità e il
            risparmio energetico. Vogliamo essere il partner ideale per chi
            condivide la nostra visione di un futuro tecnologico responsabile.
          </p>
        </div>
        <div className="sin">
          <img className="img-bot" src="/Bot.png" alt="" />
          <p>
            Benvenuti in Sustainer, un team appassionato di professionisti
            dell'Intelligenza Artificiale impegnato a plasmare un futuro etico e
            sostenibile attraverso soluzioni innovative e personalizzate.
          </p>
        </div>
        <div className="sin">
          <img className="img-360" src="/trecentosessanta.png" alt="" />
          <p>
            Promuoviamo un approccio all'innovazione improntato alla
            responsabilità, dove sosteniamo lo sviluppo tecnologico consapevole
            degli impatti etici e ambientali. La nostra filosofia abbraccia la
            personalizzazione delle soluzioni AI, mirando a adattarle alle
            specifiche esigenze di ciascun cliente. Inoltre, ci impegniamo
            attivamente nella sostenibilità, cercando costantemente di ridurre
            l'impatto ambientale dell'IA attraverso l'advocacy di modelli
            energeticamente efficienti.
          </p>
        </div>
        <img className="img-quadr" src="/quadr.png" alt="" />
        <div className="colonna">
          <div className="bho">
            <img className="img-ingranaggi" src="/ingranaggi.png" alt="" />
            <p>
              Sustainer fornisce una soluzione aperta e flessibile, consentendo
              a imprese e individui di sviluppare modelli AI su misura. Ci
              concentriamo sulla creazione di modelli di alto rendimento,
              garantendo al contempo analisi di fairness e valutazioni
              sull'efficienza energetica per contribuire a un utilizzo
              responsabile dell'Intelligenza Artificiale.
            </p>
          </div>
          <div className="cen">
            <img className="img-testa" src="/testa.png" alt="" />
            <p>
              Sustainer è più di una piattaforma tecnologica; siamo un alleato
              nella costruzione di un futuro in cui l'Intelligenza Artificiale è
              sinonimo di progresso sostenibile ed equo. Unisciti a noi nel
              plasmare il futuro dell'IA responsabile.
            </p>
          </div>
        </div>
        <div className="des">
          <img className="img-lampada" src="/lampada.png" alt="" />
          <p>
            In un mondo in continua evoluzione guidato dall'Intelligenza
            Artificiale, riconosciamo la necessità di un approccio
            personalizzato. Da qui nasce la nostra missione: offrire una
            piattaforma aperta per ingegneri di machine learning e sviluppatori,
            consentendo la creazione di modelli ad alte prestazioni che tengano
            conto di questioni etiche e di sostenibilità energetica.
          </p>
        </div>
      </div>
      <div className="tab-abus">
        <table>
          <tr className="row">
            <td className="cimg">
              <img className="img" src="/razzo.png" alt="" />
            </td>
            <td className="ctxt">
              <p>
                Siamo consapevoli delle sfide cruciali legate all'utilizzo
                dell'IA, come l'etica nella selezione del personale e l'impatto
                ambientale. Sustainer si impegna a affrontare queste sfide,
                supportando coloro che lavorano per realizzare sistemi che
                promuovono l'equità e il risparmio energetico. Vogliamo essere
                il partner ideale per chi condivide la nostra visione di un
                futuro tecnologico responsabile.
              </p>
            </td>
          </tr>
          <tr className="row">
            <td className="cimg">
              <img className="img" src="/Bot.png" alt="" />
            </td>
            <td className="ctxt">
              <p>
                Benvenuti in Sustainer, un team appassionato di professionisti
                dell'Intelligenza Artificiale impegnato a plasmare un futuro
                etico e sostenibile attraverso soluzioni innovative e
                personalizzate.
              </p>
            </td>
          </tr>
          <tr className="row">
            <td className="cimg">
              <img className="img" src="/trecentosessanta.png" alt="" />
            </td>
            <td className="ctxt">
              <p>
                Promuoviamo un approccio all'innovazione improntato alla
                responsabilità, dove sosteniamo lo sviluppo tecnologico
                consapevole degli impatti etici e ambientali. La nostra
                filosofia abbraccia la personalizzazione delle soluzioni AI,
                mirando a adattarle alle specifiche esigenze di ciascun cliente.
                Inoltre, ci impegniamo attivamente nella sostenibilità, cercando
                costantemente di ridurre l'impatto ambientale dell'IA attraverso
                l'advocacy di modelli energeticamente efficienti.
              </p>
            </td>
          </tr>
          <tr className="row">
            <td className="cimg">
              <img className="img" src="/ingranaggi.png" alt="" />
            </td>
            <td className="ctxt">
              <p>
                Sustainer fornisce una soluzione aperta e flessibile,
                consentendo a imprese e individui di sviluppare modelli AI su
                misura. Ci concentriamo sulla creazione di modelli di alto
                rendimento, garantendo al contempo analisi di fairness e
                valutazioni sull'efficienza energetica per contribuire a un
                utilizzo responsabile dell'Intelligenza Artificiale.
              </p>
            </td>
          </tr>
          <tr className="row">
            <td className="cimg">
              <img className="img" src="/testa.png" alt="" />
            </td>
            <td className="ctxt">
              <p>
                Sustainer è più di una piattaforma tecnologica; siamo un alleato
                nella costruzione di un futuro in cui l'Intelligenza Artificiale
                è sinonimo di progresso sostenibile ed equo. Unisciti a noi nel
                plasmare il futuro dell'IA responsabile.
              </p>
            </td>
          </tr>
          <tr className="row">
            <td className="cimg">
              <img className="img" src="/lampada.png" alt="" />
            </td>
            <td className="ctxt">
              <p>
                In un mondo in continua evoluzione guidato dall'Intelligenza
                Artificiale, riconosciamo la necessità di un approccio
                personalizzato. Da qui nasce la nostra missione: offrire una
                piattaforma aperta per ingegneri di machine learning e
                sviluppatori, consentendo la creazione di modelli ad alte
                prestazioni che tengano conto di questioni etiche e di
                sostenibilità energetica.
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
);

export default homepage;
