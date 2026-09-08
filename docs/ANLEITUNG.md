# Kunden-Handbuch & Setup-Anleitung
## Praxis für Traditionelle Chinesische Medizin und Homöopathie, Heilpraktiker Michael Segler

Herzlich willkommen zu Ihrer neuen Praxis-Website! Dieses Dokument erklärt Ihnen kurz und verständlich alle Funktionen, wie Sie die Seite aktivieren und wie Sie in Zukunft Anpassungen vornehmen können.

---

## 1. Was wurde für Ihre Praxis geschaffen?
Ihre neue Website wurde auf Basis moderner Webtechnologie und höchster deutscher Rechts- und Datenschutzstandards entwickelt. 

Das Herzstück ist **„Der Interaktive TCM-Indikations- & Behandlungs-Kompass“**:  
Er holt Patientinnen und Patienten genau dort ab, wo sie Hilfe suchen – bei ihren Beschwerden (z.B. chronische Schmerzen, Schlafprobleme, Allergien, Verdauungsleiden). Mit einem Klick sehen Suchende, wie Akupunktur, Moxibustion oder Homöopathie ansetzen, wie die Erstanamnese abläuft und dass private Kassen oder Zusatzversicherungen die Kosten nach GebüH erstatten. Das schafft sofortiges Vertrauen und führt direkt zur Terminanfrage.

---

## 2. In 4 Schritten startklar: Die Online-Aktivierung

### Schritt 1: Kontaktformular aktivieren (Formspree, kostenlos)
Damit Terminanfragen direkt in Ihrem E-Mail-Postfach landen:
1. Gehen Sie auf [https://formspree.io](https://formspree.io) und registrieren Sie sich kostenlos mit Ihrer Praxis-E-Mail.
2. Klicken Sie auf **„+ New Form“**, vergeben Sie den Namen `Praxis Michael Segler` und tragen Sie Ihre Ziel-E-Mail ein.
3. Sie erhalten einen Formular-Code (z.B. `f/mdoqwvwe`).
4. Öffnen Sie `index.html`, suchen Sie nach `form action="https://formspree.io/f/xyzkqwer"` und ersetzen Sie `xyzkqwer` durch Ihren Code. Fertig!
*(Hinweis: Sollte Formspree jemals ausfallen, schaltet die Website automatisch den Notfall-Hinweis mit Direktwahl 089 89648680 und WhatsApp ein).*

### Schritt 2: Besucher-Statistiken aktivieren (Plausible.io oder Microsoft Clarity)
Möchten Sie wissen, wie viele Münchner Ihre Seite besuchen?
- **Option A (Plausible.io – 100% DSGVO-konform ohne Cookie-Banner):**
  1. Account auf [plausible.io](https://plausible.io) anlegen.
  2. In `index.html` (Zeile ca. 45) das Skript einkommentieren und Ihre Domain eintragen.
- **Option B (Microsoft Clarity – Kostenlose Klick- und Scroll-Heatmaps):**
  1. Account auf [clarity.microsoft.com](https://clarity.microsoft.com) erstellen.
  2. Ihre Clarity Project-ID in `index.html` eintragen.

### Schritt 3: Eigene Domain aufschalten (z.B. `tcm-praxis-segler.de`)
Wenn Sie die Website unter Ihrer eigenen Wunschdomain betreiben möchten:
1. Im Vercel-Dashboard (oder bei Ihrem Webhoster) das Projekt öffnen -> **Settings -> Domains**.
2. Ihre Domain eintragen (z.B. `www.michael-segler-tcm.de`).
3. Bei Ihrem Domain-Provider (z.B. Strato, 1&1 IONOS, Hetzner) einen DNS-Eintrag setzen:
   - **CNAME-Record** für `www` auf: `cname.vercel-dns.com`
   - **A-Record** für die Hauptdomain auf: `76.76.21.21`

---

## 3. Was Sie selbst jederzeit ändern können
Die gesamte Website ist wartungsfreundlich und ohne schwerfällige Datenbanksysteme (wie WordPress) aufgebaut. Sie können die Datei `index.html` mit jedem Texteditor öffnen:

- **Telefonnummer ändern:** Suchen Sie nach `089 89648680` und ersetzen Sie sie durch eine neue Nummer.
- **Praxisanschrift:** Finden Sie unter `Frundsbergstraße 33, 80634 München`.
- **Sprechzeiten:** Können direkt in der Kontaktsektion und im Schema.org-Block angepasst werden.

---

## 4. Noch offene Datenpunkte (Zur manuellen Ergänzung)
In der Datei `TODOS.md` sind folgende Datenpunkte zur finalen Abstimmung notiert:
- Offizielle E-Mail-Adresse für das Impressum
- Genaue telefonische Erreichbarkeitszeiten
- Ggf. Angabe eines Heilpraktikerverbands (z.B. AGTCM, BDH, VKHD)

---

## 5. Support & Änderungen
Haben Sie Fragen, wünschen Sie eine Erweiterung oder möchten Sie, dass wir das Domain-Setup für Sie übernehmen?

- **Ansprechpartner:** Raphael Neumeier
- **Telefon:** `+49 1523 7384702`
- **E-Mail:** `raphael.neumeier@gmail.com`
- **Service Level:** Reaktionszeit innerhalb von 24 Stunden
