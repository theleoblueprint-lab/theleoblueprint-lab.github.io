# Lichtblick als Android-App

Der Weg: Die App kommt kostenlos ins Netz (GitHub Pages), PWABuilder macht daraus eine APK, die du direkt auf dem Handy installierst. Du brauchst nichts zu installieren, nur einen Browser und ein GitHub-Konto. Dauer: etwa eine halbe Stunde.

---

## 0. Vorher: Sicherung in der alten App

Die neue App läuft unter einer neuen Adresse und sieht die alten Daten nicht. Darum zuerst auf dem Handy deiner Frau, in der bisherigen App:

**Sammlung → Sicherung → Sicherung erstellen.** Die Datei (`lichtblick-sicherung-….json`) liegt dann im Download-Ordner. Am besten zusätzlich in Google Drive ablegen.

## 1. App ins Netz stellen (GitHub Pages)

1. Auf github.com ein kostenloses Konto anlegen (falls noch keins da ist).
2. Oben rechts **+ → New repository**.
   - Name: genau `DEINNAME.github.io`, also dein GitHub-Benutzername plus `.github.io`. Das ist wichtig, damit die App an der „Wurzel“ der Adresse liegt.
   - **Public** auswählen → **Create repository**.
3. Auf der Seite des neuen Repositorys: **uploading an existing file** (oder **Add file → Upload files**).
   - Den *Inhalt* des entpackten Ordners `lichtblick` hineinziehen: `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll` und die Ordner `assets`, `fonts`, `icons`.
   - Falls `.nojekyll` nicht mitkommt (versteckte Datei): **Add file → Create new file**, Name `.nojekyll`, Inhalt leer lassen, speichern.
   - Unten **Commit changes**.
4. **Settings → Pages**: Bei „Source“ **Deploy from a branch**, Branch **main**, Ordner **/ (root)** → **Save**.
5. Ein bis zwei Minuten warten, dann `https://DEINNAME.github.io` öffnen. Die App sollte erscheinen.

## 2. APK bauen (PWABuilder)

1. Auf **pwabuilder.com** die Adresse `https://DEINNAME.github.io` eingeben → **Start**.
2. **Package for stores → Android** (bzw. „Generate Package“ bei Android).
3. In den Optionen prüfen:
   - **Package ID:** z. B. `io.github.deinname.lichtblick` (nur Kleinbuchstaben, keine Leerzeichen)
   - **App name / Launcher name:** `Lichtblick`
   - **Signing key:** „New“, PWABuilder erzeugt den Schlüssel.
4. **Download.** Im ZIP liegen u. a. die `.apk`, eine `assetlinks.json` und der Signierschlüssel (`signing.keystore` + Passwörter in einer Textdatei).
   - **Den Schlüssel und die Passwörter gut aufbewahren!** Ohne sie lässt sich die App später nicht mehr aktualisieren, ohne sie neu zu installieren.

## 3. App mit der Website verknüpfen

Damit oben in der App keine Browser-Adressleiste erscheint:

1. Im GitHub-Repository **Add file → Create new file**.
2. Als Namen genau `.well-known/assetlinks.json` eintippen (der Schrägstrich legt den Ordner an).
3. Den Inhalt der `assetlinks.json` aus dem PWABuilder-ZIP hineinkopieren → **Commit changes**.
4. Prüfen: `https://DEINNAME.github.io/.well-known/assetlinks.json` muss den Text zeigen.

## 4. Auf dem Handy installieren

1. Die `.apk` aufs Handy bringen (per Mail, Google Drive oder USB).
2. Antippen. Android fragt, ob die App (z. B. „Dateien“ oder „Chrome“) **unbekannte Apps installieren** darf → erlauben.
3. Falls Google Play Protect warnt: **Trotzdem installieren**. Die Warnung kommt, weil die App nicht aus dem Play Store stammt.
4. Lichtblick öffnen → **Sammlung → Sicherung → Sicherung einspielen** → die Datei aus Schritt 0 wählen. Alles ist wieder da.
5. Die alte Lichtblick-Verknüpfung kann danach weg.

---

## Später: Änderungen an der App

- Die APK ist nur der Rahmen, den Inhalt holt sie sich von der Website. Für Änderungen einfach die geänderten Dateien im GitHub-Repository ersetzen und in `sw.js` die Zeile `const VERSION = "lichtblick-v3";` hochzählen (v4, v5 …). Beim nächsten Öffnen mit Internet holt sich die App die neue Fassung.
- Eine neue APK ist nur nötig, wenn sich Name, Icon oder Farben im Manifest ändern. Dann in PWABuilder **denselben Schlüssel** verwenden („Use mine“).

## Gut zu wissen

- Die App startet und läuft auch ohne Internet. Nur die **Texterkennung aus Fotos** braucht beim Lesen Internet.
- Alle Sprüche, Momente und Fotos bleiben **nur auf dem Handy**. Auf GitHub liegt ausschließlich die leere App, keine persönlichen Daten.
- Ab und zu eine Sicherung machen. Die App erinnert daran.
