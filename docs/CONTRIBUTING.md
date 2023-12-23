# Sustainer | CONTRIBUTING

## Commits



Abbiamo regole molto precise su come possono essere formattati i messaggi di commit di git. Questo porta a messaggi più leggibili e facili da seguire quando si consulta la cronologia del progetto.
Seguiamo le specifiche descritte da [Conventional Commits](https://www.conventionalcommits.org/).

Quanto segue è tratto da https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines

### Formato del messaggio di commit

Ogni messaggio di commit consiste in un `header`, un `body` e un `footer`. L'intestazione ha un formato speciale che include un `type`, uno `scope` e un `subject`:
Ogni riga del messaggio di commit non può essere più lunga di 100 caratteri! Questo permette al messaggio di essere più facile da leggere su GitHub e nei vari strumenti di git.

```
<type>(<scope>): <sommario>
<LINEA VUOTA>
<body>
<LINEA VUOTA>
<footer>
```

### Intestazione

L'**intestazione** è obbligatoria e il **campo** dell'intestazione deve essere omesso se la modifica è comune tra i pacchetti, altrimenti è obbligatorio. Usare il campo summary per fornire una descrizione sintetica della modifica:

```
<type>(<scope>): <breve riassunto>
  │ │ │
  │ │ └─⫸ Sintesi al presente. Non in maiuscolo. Senza punto alla fine.
  │ │
  │ └─⫸ Commit scope: server | app | desktop-app
  │
  └─⫸ Tipo di commit: build|ci|docs|feat|fix|perf|refactor|test
```

#### Riassunto

- usare l'imperativo, il tempo presente: "cambia", non "cambiato"
- non scrivere in maiuscolo la prima lettera
- non mettere il punto (.) alla fine

#### Type

Deve essere uno dei seguenti:

- build: Modifiche che riguardano il sistema di compilazione o le dipendenze esterne.
- ci: modifiche ai file di configurazione e agli script di CI
- docs: Modifiche alla sola documentazione
- feat: Una nuova funzionalità
- fix: Una correzione di bug
- perf: Una modifica al codice che migliora le prestazioni
- refactor: Una modifica del codice che non corregge un bug né aggiunge una funzionalità
- style: Modifiche che non influiscono sul significato del codice (spazi bianchi, formattazione, punti mancanti, ecc.).
- test: Aggiunta di test mancanti o correzione di test esistenti

### Scope

Lo scope (ambito) deve essere il `package` all'interno del quale avviene la modifica.

Ambiti supportati:

- `app`
- `server`
- `desktop-app`

### Body

Il **body** è obbligatorio per tutti i commit, tranne quelli di tipo "docs". Quando il corpo è presente, deve essere lungo almeno 20 caratteri e deve essere conforme al formato Commit Message Body.

**Come nel sommario, usare l'imperativo.

Spiegare la motivazione della modifica nel corpo del messaggio di commit. Questo messaggio di commit deve spiegare perché si sta apportando la modifica. È possibile includere un confronto tra il comportamento precedente e quello nuovo per illustrare l'impatto della modifica.

### Piè di pagina

Il piè di pagina è facoltativo. Il piè di pagina deve contenere un [riferimento conclusivo a un problema](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue), se presente. (es. Correzioni #<numero problema>)

[Campioni](https://github.com/angular/angular/commits/master)

## Branches

I nuovi branches devono seguire questo formato per i loro nomi: `<type>/<scope>/<descrizione>`.

- `type` e `scope` si riferiscono a quelli descritti nella sezione Commits.
- `descrizione` deve essere una parola che rappresenti i cambiamenti che avvengono nel ramo, con meno di 10 caratteri.