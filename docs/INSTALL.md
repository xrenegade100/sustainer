# [SUSTAINER] Setup dell'ambiente di sviluppo

## Riepilogo

Premesso che, otterremmo un ambiente di sviluppo più robusto ed uniforme per l'intero team se utilizzassimo Docker (https://www.docker.com/),
bisogna considerare che la configurazione potrebbe toglierci troppo tempo, per cui l'approccio che utilizzeremo per il setup dell'ambiente di sviluppo consiste nel decidere delle convenzioni rispetto ai tool che useremo (versioni, varianti, ecc...) e ognuno si preoccuperà di installare gli strumenti necessari sui propri PC.

Gli argomenti che verranno trattati in questo file sono:

1. Node.js
2. MySQL
3. Estensioni VSCode (opzionale)
4. Verifica dell'ambiente installato

## Installazione

### Node.js

Il sito ufficiale [https://nodejs.org/en](https://nodejs.org/en) permette il download dell'eseguibile appropriato in base al proprio sistema operativo.

![image](https://github.com/xrenegade100/TeraWare/assets/11615441/9b9959b4-4cd3-4913-853c-946b54774c83)

_Scegliamo di utilizzare la versione indicata come LTS (Latest Stable Release) in quanto è l'ultima versione stabile disponibile rilasciata ovvero 20.10.0 LTS_
Inclusa con questa versione di Node c'è `npm` versione 10.2.3.

Il link della API reference per questa versione di Node é: https://nodejs.org/en/blog/release/v20.10.0

### MySQL

-   Windows

    -   Link alla guida di W3Schhols: [qui](https://www.w3schools.com/mysql/mysql_install_windows.asp#:~:text=The%20simplest%20and%20recommended%20method,%2D8.0.23.msi%20.)

-   Linux

    -   Per le distro Linux l'installazione di MySQL risulta essere leggermente più articolata, ma possono essere trovati vari modi di installazione attraverso il link sul sito ufficiale: https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html

    ![image](https://github.com/xrenegade100/TeraWare/assets/11615441/65d710de-c4af-4de2-84dd-c04ac3cacd24)
    _L'ultima versione disponibile al momento della stesura di questo file risulta essere la vesione 8.0.35_ quindi adottiamo come convenzione l'utlizzo di questa versione.

### Estensioni VSCode

Le estensioni raccomandate in questo capitolo sono da considerarsi opzionali, nel senso che non installarle non influisce sullo sviluppo direttamente (es: non installando Node non potete sviluppare).
Tuttavia sono raccomandate sulla base degli strumenti che abbiamo scelto di utilizzare e semplificano/permettono di ridurre il tempo per tantissime operazioni ripetitive che vi troverete ad eseguire.

1. **Better Comments**

-   Come si può vedere nella descrizione sul marketplace questa estensione enfatizza alcuni tipi di commenti (TODO, FIXME...) per essere visualizzati meglio nel codice.
-   https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

2. **ES7+ React/Redux/React-Native snippets**

-   Questa estensione aggiunge a VSCode una serie di snippet di codice boilerplate che ci si trova a scrivere parecchie volte quando si utilizzando framework Javascript.
    Esempio pratico di utilizzo:
    ![image](https://github.com/xrenegade100/TeraWare/assets/11615441/6c44e416-0545-4395-8cd6-cf99efe2c54b)
-   https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

3. **ESLint**

-   Questa estensione integra ESLint in VSCode mostrando direttamente gli errori rilevati da eslint nell'ide permettendo di velocizzare il processo di sviluppo (es: non devo esgeguire a mano eslint su tutti i file del progetto per verificare che è tutto corretto ma installo l'estensione che mi segnala gli errori in tempo reale)
-   https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

4. **Prettier**

-   Questa estensione integra Prettier in VSCode tramite l'autoformattazione al salvataggio dei file (come per eslint, altrimenti, dovrebbe essere eseguito manualmente sui file del progetto). **Attenzione**: seguire i passaggi per l'installazione che si trovano nella pagina di marketplace in quanto bisogna sostituire il formatter di default di vscode.
-   https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

5. **GitHub Copilot**

-   AI Chatbot che suggerisce codice. Normalmente è a pagamento, ma è incluso con GitHub PRO (che voi potete avere gratuitamente verificando il vostro status di studente [qui](https://education.github.com/pack)
-   https://marketplace.visualstudio.com/items?itemName=GitHub.copilot

6. **npm Intellisense**

-   Questa estensione aggiunge l'autocompletamento dei moduli negli statement di import.
    ![image](https://raw.githubusercontent.com/ChristianKohler/NpmIntellisense/bc5521b659b700c8a91cf04897007c611ed9532a/images/auto_complete.gif)
-   https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense

7. **Sonarlint**

-   Esegue il controllo di alcune regole di SonarCloud in locale nell'editor.
-   https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
