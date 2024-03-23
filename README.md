<p align="center">
<img src="https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=solid&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  <img src="https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb">
</p>

<h1 align="center">
  SUSTAINER<br>
</h1>

<img src="https://github.com/xrenegade100/sustainer/assets/11615441/452ab4ec-b4b3-4858-ace3-e4f0195d9b34">

# Indice

-   [Prerequisiti](#prerequisiti)
-   [Installazione](#installazione)
-   [Documentazione](#documentazione)
-   [Come contribuire](#come-contribuire)
-   [Licenza](#licenza)
-   [Team](#team)

# Prerequisiti

-   MySQL v8.0.35
-   Python 3.11.x (opzionale per eseguire le pipeline dei modelli)
-   NodeJS v20.10.0 (20.x)

# Installazione

1. Clona questa repository

```bash
$ git clone https://github.com/xrenegade100/sustainer.git
```

2. Installa le dipendenze per il backend

```bash
$  cd sustainer
(sustainer) $  cd modules/backend
(sustainer/modules/backend) $  npm install
```

3. Installa le dipendenze per il frontend

```bash
$  cd sustainer
(sustainer) $  cd modules/frontend
(sustainer/modules/frontend) $  npm install
```

4. Esegui il server MySQL ed importa il dump sql (/sql/sustainer.sql)

5. **(opzionale)** Per eseguire le pipeline di allenamento<br>
   <quote>
   Fare riferimento alla repository contenente il [modulo Python per le pipeline](https://github.com/MegaPepeMan/sustainer_moduloFIA)
   </quote>

6. Esegui i moduli backend e frontend

```bash
$  cd sustainer
(sustainer) $  cd modules/backend
(sustainer/modules/backend) $  npm run dev
```

```bash
$  cd sustainer
(sustainer) $  cd modules/frontend
(sustainer/modules/frontend) $  npm run dev
```

7. Apri il browser e vai su http://localhost:5173/Homepage

# Documentazione
- **Documenti di prodotto**: 
- **Documenti di management**:
- **Codice Sorgente backend**: https://xrenegade100.github.io/sustainer/

# Come contribuire

**Importante: leggi [CONTRUTING](docs/CONTRIBUTING.md)**

# Licenza
**[LICENSE](LICENSE)**

# Team

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

## Team Members
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/Fatted"><img src="https://avatars.githubusercontent.com/u/83971069?v=4" width="100px;"/><br /><sub><b>Antonio D'Amato</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/ldamato17"><img src="https://avatars.githubusercontent.com/u/83412928?v=4" width="100px;"/><br /><sub><b>Ludovica D'Amato</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/MegaPepeMan"><img src="https://avatars.githubusercontent.com/u/83645460?v=4" width="100px;"/><br /><sub><b>Giuseppe Raiola Paduano</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/raff002"><img src="https://avatars.githubusercontent.com/u/75092053?v=4" width="100px;"/><br /><sub><b>Raffaele Curcio</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/GabrielMatteo"><img src="https://avatars.githubusercontent.com/u/132912844?v=4" width="100px;"/><br /><sub><b>Gabriel Matteo Balasa</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/RaffyAS99"><img src="https://avatars.githubusercontent.com/u/114479230?v=4" width="100px;"/><br /><sub><b>Raffaele Vietri</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/domenicod25"><img src="https://avatars.githubusercontent.com/u/137888029?v=4" width="100px;"/><br /><sub><b>Domenico D'Urso</b></sub></a>
      </td>
      <td align="center" valign="top" width="11%">
        <a href="https://github.com/prosciutto"><img src="https://avatars.githubusercontent.com/u/9027274?v=4" width="100px;"/><br /><sub><b>Francesco Saporito</b></sub></a>
      </td>
    </tr>
  </tbody>
</table>

## Project Managers
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/alfcan"><img src="https://avatars.githubusercontent.com/u/64324979?v=4" width="100px;"/><br /><sub><b>Alfonso Cannavale</b></sub></a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/antgioia"><img src="https://avatars.githubusercontent.com/u/63403031?v=4" width="100px;"/><br /><sub><b>Domenico Antonio Gioia</b></sub></a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/xrenegade100"><img src="https://avatars.githubusercontent.com/u/11615441?v=4" width="100px;"/><br /><sub><b>Antonio Scognamiglio</b></sub></a>
      </td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
