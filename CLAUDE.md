# CLAUDE.md – App-Emporium-Homepage (statischer Marketing-Onepager, eingefroren)

Projektgedächtnis: sagt jeder Session in einem Satz, was dieses Repo ist, wo was
liegt und welche Fehler hier schon gemacht wurden — damit niemand den Bestand neu
ergründen muss.

> Angelegt am 2026-07-29. Alle Angaben sind aus dem Repo-Inhalt (HEAD `7a2c3ad`)
> abgeleitet und **nicht am laufenden System verifiziert** — kein Live-Abruf, keine
> Firebase-Konsole eingesehen. Nicht Belegtes steht unter „Offen / nicht verifiziert".

## Globale Regeln zuerst lesen (gilt für JEDE Session, besonders Cloud/Handy)

Die projektübergreifenden Regeln (Token-Policy, Gedächtnis-Pflicht,
**Fehlerklassen mit Guards**) stehen NICHT hier, sondern im Master-Repo
`https://github.com/perschkramon-ui/claude-global` — alleinige Quelle.

- **Lokale Sessions** (PC/Laptop) bekommen sie automatisch über einen
  SessionStart-Hook nach `~/.claude/CLAUDE.md`. Nichts zu tun.
- **Cloud-Sessions** (auch vom Smartphone über claude.ai/code) sehen kein
  PC-Dateisystem und bekommen sie NUR über diesen Weg — beim Onboarding
  zusätzlich zu diesem Repo holen und als globale Regeln lesen:
  ```bash
  gh repo clone perschkramon-ui/claude-global
  ```
  Ohne diesen Schritt arbeitet die Session ohne die Fehlerklassen-Guards.

## Was das ist

Statischer Marketing-Onepager der Firma App-Emporium. `index.html` trägt den Title
„App-Emporium – Smarte Apps für jedes Business", der Footer „© 2025 App-Emporium".
Die Seite bewarb vier Web-Apps — **ZeitScan, RE-Generator, TableFlow, GymPro**
(belegt über die referenzierten Icons `icon_zeitscan/icon_regenerator/icon_tableflow/icon_gympro.png`)
— und nannte als Kontakt `kontakt@app-emporium.com` sowie die Domain `app-emporium.com`.

Kein Produkt-Code, kein Backend, keine Datenbank, keine API-Aufrufe: reine
Landingpage zum Deploy auf Firebase Hosting.

**Stack:** reines Static-Web ohne Framework und ohne Build-Schritt — HTML + CSS +
Vanilla-JavaScript (Sprachstatistik: CSS 29.037 B, HTML 25.583 B, JS 13.840 B).
`script.js` ist klassisches DOM-Scripting (`document.addEventListener('DOMContentLoaded', ...)`,
Navbar-Scroll-Effekt), kein Modulsystem, keine Imports. `package.json` deklariert
**keine** dependencies/devDependencies.

**Achtung — dieses Repo ist PUBLIC** (`gh repo view --json visibility` → `PUBLIC`),
nicht privat. Siehe Fallstrick-Register.

**Status: abgelöst.** Nachfolger ist `perschkramon-ui/Homepage` (privat, erstellt
2026-07-16). Änderungen gehören dorthin, nicht hierher.

## Landkarte — wo ist was

| Bereich | Ort |
| --- | --- |
| Gesamte Seite (Onepager) | `index.html` (23.775 B — enthält Hero, Sektionen, Kontakt, Footer in einer Datei) |
| Styling | `style.css` (29.037 B, größte Textdatei des Repos) |
| Interaktion | `script.js` (13.840 B, Vanilla-JS, DOMContentLoaded-Block mit Navbar-Scroll-Effekt) |
| Fehlerseite | `404.html` (1.808 B) |
| Bilder/Assets | 9 PNG im Repo-Root, zusammen ca. 4,0 MB von 4,1 MB Gesamtgröße: `hero_bg.png` (725 KB), `icon_regenerator.png` (454 KB), `app_icon_2.png` (448 KB), `icon_tableflow.png` (433 KB), `app_icon_1.png` (431 KB), `icon_gympro.png` (410 KB), `icon_zeitscan.png` (404 KB), `app_icon_3.png` (386 KB), `icon_billforge.png` (368 KB) |
| Tatsächlich referenzierte Bilder | nur 4: `icon_gympro/icon_regenerator/icon_tableflow/icon_zeitscan.png` (Grep über `index.html` + `style.css`). `app_icon_1/2/3.png`, `icon_billforge.png` und `hero_bg.png` tauchen in HEAD nirgends auf |
| Deploy-Konfiguration | `firebase.json` (150 B): `hosting.public = "."`, `ignore = [firebase.json, .firebaserc, **/.*, **/node_modules/**]` |
| Firebase-Projektbindung | `.firebaserc` (53 B) — **leer**: `{"projects":{},"targets":{},"etags":{}}`, kein Projekt-/Site-Name im Repo |
| Eingecheckter Deploy-Artefakt | `.firebase/hosting..cache` (8.824 B, 76 Zeilen `Pfad,mtime,hash`) |
| Projektdatei | `package.json` (182 B), name `app-emporium`, version `1.0.0`, keine Abhängigkeiten |
| NICHT vorhanden | README, `.gitignore`, CI/Workflows (`.github/`), Dockerfile, `.env.example`, `*.yaml/yml`, `wrangler.toml`, Tests, Unterverzeichnisse außer `.firebase/` — Repo ist komplett flach |
| Lokale Arbeitskopie | **keine** — in `C:\Users\Ramon\Documents\Projekte` existiert kein Ordner `App-Emporium-Homepage` |
| Nachfolger-Repo | `perschkramon-ui/Homepage`, dort `site/` (neue Seite), `src/worker.js` + `wrangler.jsonc` (Cloudflare Worker), `email-worker/`, `docs/dns-snapshot-2026-07-16.md`, `CLAUDE.md`, `referenz-alte-seite/` (Kopie dieser alten Seite) |

## Deploy & Betrieb

**Deploy-Weg laut Repo: Firebase Hosting.** `firebase.json` enthält ausschließlich
einen hosting-Block mit `"public": "."` (Repo-Root als Web-Root) und
`"ignore": ["firebase.json", ".firebaserc", "**/.*", "**/node_modules/**"]`.
Kein `rewrites`, `headers`, `redirects` oder `cleanUrls`; `404.html` greift über
die Firebase-Standardkonvention.

`.firebaserc` ist **leer** — im Repo steht weder Projekt-ID noch Site-Alias. Das
eingecheckte Artefakt heißt `.firebase/hosting..cache`; der leere Abschnitt
zwischen den Punkten entspricht einem leeren Target-Namen und passt zur leeren
`.firebaserc`.

**Lokaler Betrieb** laut `package.json` (name `app-emporium`, version `1.0.0`,
description „App-Emporium Homepage"): `scripts.dev` und `scripts.start` sind beide
`npx serve . -l 3000`. Keine dependencies, kein Build-Schritt, kein Lockfile.

**Nicht vorhanden:** CI/CD (kein `.github/`), Dockerfile, `wrangler.toml/jsonc`,
`*.yaml/*.yml`, `.env.example`, Umgebungsvariablen-Referenzen.

**Secrets: keine gefunden.** Grep über `index.html` und `script.js` nach `apiKey`,
`api_key`, `token`, `secret`, `AIza`, `Bearer`, `firebase.initializeApp` und
`process.env` liefert null Treffer — es gibt kein Firebase-SDK-Init und keine
Client-Konfiguration in der Seite. Entsprechend sind hier auch keine Secret-Namen
zu nennen.

**Kontext aus dem Nachfolge-Repo** (Quelle: `Homepage/CLAUDE.md`, *nicht* dieses
Repo): Hosting war die Firebase-Site `homepageappemporium`; am 2026-07-16 wurde
per Betreiber-Freigabe auf Cloudflare Workers umgestellt und der Firebase-A-Record
gelöscht (DNS-Snapshot in `Homepage/docs/dns-snapshot-2026-07-16.md`). Die
Firebase-Site ist dort als „noch vorhanden, nur nicht mehr verlinkt" vermerkt.

## Stand der Arbeit

**Eingefroren und abgelöst — abgeschlossene Altablage, kein Zwischenstand.**

Die gesamte Historie besteht aus 5 Commits an EINEM Tag (2026-04-13, 08:01 bis
16:50 UTC, Autor „Ramon"), alle mit der Commit-Message `.`:
`bf0147b`, `2d499f0`, `722c039`, `300c832`, `7a2c3ad` (HEAD). Letzter Push
2026-04-13T16:51:01Z — seither über drei Monate unverändert. Default-Branch `main`,
diskUsage 4013 KB, nicht archiviert.

**Die Ablösung ist hart belegt, nicht vermutet:** Das neuere Repo
`perschkramon-ui/Homepage` (privat, erstellt 2026-07-16, letzter Push 2026-07-29,
Beschreibung „Firmen-Homepage app-emporium.com (Firebase-Hosting, Cloudflare-DNS)")
enthält ein Verzeichnis `referenz-alte-seite/`, dessen Dateien **byte-identisch**
mit diesem Repo sind — verglichen über die Git-Blob-SHA1 beider Trees, 7 von 7
vergleichbaren Dateien stimmen überein: `index.html` b427641d, `script.js` f02cb0d0,
`style.css` 92775f95, `icon_gympro.png` 1e05e4c2, `icon_regenerator.png` 82630e65,
`icon_tableflow.png` 868853b0, `icon_zeitscan.png` be0f8fba. Zusätzlich sagt
`Homepage/CLAUDE.md` es wörtlich: „Neue Homepage bauen statt alte weiterzupflegen …
Live-Stand der alten Seite als Referenz gesichert unter `referenz-alte-seite/`" und
„Alte Seite/Firebase interessiert nicht mehr („die andere domain ist egal")".

Nur hier verblieben und **nicht** nach `referenz-alte-seite/` übernommen:
`.firebase/hosting..cache`, `.firebaserc`, `404.html`, `app_icon_1/2/3.png`,
`firebase.json`, `hero_bg.png`, `icon_billforge.png`, `package.json`.

**Gedächtnis-Korrektur für `Homepage/CLAUDE.md` (noch einzutragen):** Dort steht
aktuell „Quellcode: Verbleib UNGEKLÄRT — auf dem Ramon-PC nicht gefunden
(Projekte-Ordner geprüft). Vor Änderungen: Quelle klären (alter PC/acer?
Firebase-Konsole?) ODER Live-Stand herunterladen". Dieser Punkt ist **erledigt**:
Der gesuchte Quellcode liegt in `perschkramon-ui/App-Emporium-Homepage` auf GitHub
(nie lokal geklont, deshalb im Projekte-Ordner nicht auffindbar). Der damals
heruntergeladene Live-Stand ist byte-identisch mit dem Repo-HEAD, d. h. das Repo
war der aktuelle Produktionsstand. Das offene To-do „Quelle klären" gehört
geschlossen und durch den Fundort ersetzt.

## Fallstrick-Register

Jeder Punkt als Fehlerklasse mit Guard — nicht nur die Einzelstelle.

1. **Firebase-Deploy hat das komplette `.git`-Verzeichnis mit ausgeliefert.**
   Belegt durch die eingecheckte `.firebase/hosting..cache`: von 76 Einträgen
   liegen 62 unter `.git/` — u. a. `.git/config`, `.git/HEAD`, `.git/index`,
   `.git/logs/HEAD`, `.git/logs/refs/remotes/origin/main` und rund 35
   `.git/objects/<xx>/<hash>`-Blobs. Ursache ist die Kombination in `firebase.json`:
   `hosting.public = "."` (Repo-Root als Web-Root) zusammen mit dem Ignore-Muster
   `**/.*`, das zwar Dotfiles, aber nicht die Dateien INNERHALB des Dot-Ordners
   `.git/` ausschließt.
   **Guard:** `hosting.public` NIE auf `"."` setzen, sondern auf einen dedizierten
   Unterordner (`dist/` bzw. `public/`), in den nur Build-Ausgaben kopiert werden;
   zusätzlich immer explizit `".git/**"` in die ignore-Liste aufnehmen. Vor jedem
   Deploy prüfen: enthält die `hosting.*.cache` Pfade, die nicht zur Seite gehören,
   ging zu viel raus. (Ob die Dateien am Live-Endpunkt tatsächlich abrufbar waren —
   siehe „Offen".)

2. **Deploy-Artefakt ist eingecheckt.** `.firebase/hosting..cache` (8.824 B) liegt
   im Repo, obwohl es reiner lokaler Deploy-Zustand der Firebase-CLI ist. Genau
   dieses Artefakt ist hier zum Leak-Beleg geworden, weil es die Deploy-Dateiliste
   konserviert.
   **Guard:** `.firebase/` gehört in `.gitignore`; generell nie CLI-/Build-Caches
   versionieren.

3. **Es gibt überhaupt keine `.gitignore`.** Damit landet per Default alles im
   Commit. Im Nachfolgeprojekt `Homepage` ist eine `.gitignore` (19 B) vorhanden.
   **Guard:** In jedem neuen statischen Projekt als ERSTEN Commit eine `.gitignore`
   mit mindestens `.firebase/`, `node_modules/`, `.env*`, `dist/` anlegen; deckt
   sich mit der globalen Secrets-Regel, in solchen Repos nie `git add -A` zu
   benutzen.

4. **Repo-Sichtbarkeit weicht von der Annahme ab: das Repo ist PUBLIC**
   (`gh repo view` liefert `isPrivate=false`, `visibility=PUBLIC`), obwohl es als
   privat geführt wurde und Firmenmaterial enthält. In Kombination mit Punkt 1 ist
   die vollständige Historie damit öffentlich einsehbar.
   **Guard:** Sichtbarkeit vor jeder Aussage per
   `gh repo view <repo> --json visibility,isPrivate` nachsehen statt annehmen —
   deckt sich mit der Gedächtnis-Regel „Zustand im Zweifel NACHSEHEN, nie annehmen".

5. **Historie ist wertlos für Nachvollziehbarkeit:** alle 5 Commits (`bf0147b`,
   `2d499f0`, `722c039`, `300c832`, `7a2c3ad`) tragen als Message nur einen Punkt
   `.`. Aus der Historie lässt sich nicht rekonstruieren, was wann geändert wurde —
   die Ablaufrekonstruktion oben war nur über Blob-Hashes und Timestamps möglich.
   **Guard:** aussagekräftige Commit-Messages, auch bei Ein-Personen-Projekten.

6. **Unkomprimierte und teils tote Bild-Assets bestimmen die Repo-Größe:** 9 PNG
   belegen rund 4,0 MB von 4,1 MB Gesamt (`hero_bg.png` allein 725 KB). Davon sind
   vier Dateien — `app_icon_1.png` (431 KB), `app_icon_2.png` (448 KB),
   `app_icon_3.png` (386 KB), `icon_billforge.png` (368 KB), zusammen ca. 1,6 MB —
   in HEAD weder in `index.html` noch in `style.css` referenziert. Sie wurden
   folgerichtig auch nicht ins Nachfolge-Repo übernommen.
   **Guard:** Assets vor dem Commit komprimieren bzw. als WebP ablegen und vor dem
   Deploy per Referenz-Grep prüfen, ob sie überhaupt benutzt werden.

7. **Das Repo dokumentiert sein eigenes Deploy-Ziel nicht:** `.firebaserc` ist leer
   und es gibt keine README. Aus dem Repo allein ist nicht erkennbar, auf welches
   Firebase-Projekt bzw. welche Site deployt wurde — diese Information existiert nur
   außerhalb, in `Homepage/CLAUDE.md` (Site-Name `homepageappemporium`).
   **Guard:** Deploy-Ziel und Domain immer in README oder CLAUDE.md des jeweiligen
   Repos festhalten, nicht nur in der CLI-Konfiguration eines anderen Projekts.

## Arbeitsregeln

- **Am echten Objekt verifizieren** — Zustand (Sichtbarkeit, Branches, Deploy-Ziel)
  nachsehen statt annehmen; keine Aussage ohne Beleg.
- **Kleine, überprüfbare Schritte** statt großer Sprünge.
- **commit + push = Backup** — Arbeit nicht unversioniert liegen lassen.
- **Secrets nie** in Repo, Chat-Ausgaben oder Memory-Dateien (nur Ablageort +
  Scope dokumentieren).
- **Beim Committen Dateien explizit adden — KEIN `git add -A`** (hier besonders
  wichtig: keine `.gitignore` vorhanden, Repo ist PUBLIC).
- **Gedächtnis-Pflege ist Teil jeder Aufgabe**, kein Nachtrag: neue Erkenntnisse,
  Entscheidungen und Fehlerklassen sofort hier eintragen.

## Offen / nicht verifiziert

- **Ob das mitdeployte `.git`-Verzeichnis am Live-Endpunkt tatsächlich öffentlich
  ABRUFBAR war.** Belegt ist nur, dass `.git/**`-Pfade in der Deploy-Dateiliste
  stehen (62 von 76 Einträgen). Ein Live-Test war nicht möglich, weil die Domain
  laut `Homepage/CLAUDE.md` seit 2026-07-16 nicht mehr auf Firebase zeigt; ob die
  Firebase-Site `homepageappemporium` unter ihrer `.web.app`-Adresse noch antwortet,
  wurde nicht geprüft. Live-Abrufe wurden bewusst nicht durchgeführt.
- **Auf welches Firebase-Projekt bzw. welche Site dieses Repo konkret deployt hat.**
  `.firebaserc` ist leer; der Name `homepageappemporium` stammt aus
  `Homepage/CLAUDE.md` und ist NICHT aus diesem Repo belegbar. Dass es dieselbe
  Site ist, ist plausibel, aber nicht verifiziert.
- **Ob das Repo noch an eine aktive Deployment-Pipeline oder ein Firebase-Projekt
  gebunden ist.** Ohne CI und mit leerer `.firebaserc` aus dem Repo nicht
  feststellbar; die Firebase-Konsole wurde nicht eingesehen.
- **Ob es neben `main` weitere Branches, Tags, offene PRs oder Releases gibt.** Der
  Abruf von `repos/.../branches` lief in einen Netzwerk-Timeout
  (dial tcp 140.82.121.6:443), der Klon war `--depth 1`. Aus `gh repo view` ist nur
  der Default-Branch `main` belegt.
- **Ob `app_icon_1/2/3.png`, `icon_billforge.png` und `hero_bg.png` jemals benutzt
  wurden.** Der Referenz-Grep lief nur gegen HEAD von `index.html` und `style.css`;
  früherer Gebrauch in den vier älteren Commits wurde wegen des flachen Klons nicht
  geprüft. `hero_bg.png` ist trotz sprechendem Namen in HEAD nicht referenziert —
  möglich ist eine Einbindung, die das Suchmuster nicht trifft.
- **Ob die PUBLIC-Sichtbarkeit beabsichtigt ist oder ein Versehen.** Belegt ist nur
  der Zustand, nicht die Absicht. Gehört dem Betreiber vorgelegt, zumal alle anderen
  Homepage-nahen Repos (Homepage, Kassensystem, TimeBlocks) privat sind.
- **Ob das Repo gelöscht, archiviert oder als Archiv behalten werden soll.** Derzeit
  nicht archiviert (`isArchived=false`). Da die Inhalte im Nachfolge-Repo unter
  `referenz-alte-seite/` byte-identisch gesichert sind, wäre Archivieren technisch
  verlustfrei — das ist aber eine Betreiber-Entscheidung. Zu bedenken: Löschen würde
  die öffentlich einsehbare Historie samt `.git`-Thematik mit entfernen.
- **Ob der Punkt „Quellcode-Verbleib UNGEKLÄRT" in `Homepage/CLAUDE.md` inzwischen
  von anderer Seite geschlossen wurde.** Der Text wurde nur gelesen, nichts geändert
  — die oben vorgeschlagene Gedächtnis-Korrektur ist dort noch nicht eingetragen.
