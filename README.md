# Lukas Hofer Portfolio-Webseite

## Beschreibung
Eine persönliche Portfolio-Webseite gehostet auf GitHub Pages unter [lukas-hofer.de](https://lukas-hofer.de).

## Funktionen
- Vollständig responsive Design
- Multi-Page Layout
- Kontaktformular mit EmailJs
- React-Bootstrap Framework
- Zentrale Inhaltsverwaltung in einer Datei

## Installation und Setup

### Voraussetzungen
- Node.js und npm installiert
- Git installiert

### Projekt klonen
```bash
git clone https://github.com/HoferLu/lukas-hofer.github.io.git
cd lukas-hofer.github.io
```

### Abhängigkeiten installieren
```bash
npm install
```

### Entwicklungsserver starten
Um die Webseite lokal zu entwickeln und zu testen:
```bash
npm start
```
Die Seite wird unter [http://localhost:3000](http://localhost:3000) geöffnet.

## Anpassungen vornehmen

### Inhalte bearbeiten
Alle Inhalte können in der Datei `src/content_option.js` bearbeitet werden:
- Persönliche Informationen
- Projektbeschreibungen
- Kompetenzen und Erfahrungen
- Kontaktdaten

### Bilder ersetzen
Ersetze die Bilder im Verzeichnis `src/assets/images/` oder `public/images/` entsprechend.

## Deployment auf GitHub Pages

### Einmalige Vorbereitung
1. Installiere das gh-pages Paket (falls noch nicht geschehen):
   ```bash
   npm install --save-dev gh-pages
   ```

2. Stelle sicher, dass diese Einträge in der `package.json` vorhanden sind:
   ```json
   "homepage": "https://lukas-hofer.de",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Erstelle/überprüfe die Datei `public/CNAME` mit dem Inhalt:
   ```
   lukas-hofer.de
   ```

### Website deployen
Führe den folgenden Befehl aus, um die Website zu bauen und zu deployen:
```bash
npm run deploy
```

### GitHub-Einstellungen überprüfen
Nach dem Deployment:
1. Gehe zu deinem Repository auf GitHub
2. Navigiere zu "Settings" > "Pages"
3. Unter "Source" sollte der `gh-pages`-Branch ausgewählt sein

## Danksagung
Basierend auf dem Template von [ubaimutl/react-portfolio](https://github.com/ubaimutl/react-portfolio).

## Lizenz
Dieses Projekt steht unter der Apache-2.0 Lizenz.