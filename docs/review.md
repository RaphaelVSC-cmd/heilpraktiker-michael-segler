# Selbst-Audit - Praxis für TCM & Homöopathie Michael Segler | 2026-09-08
**Tier: TIER 1 - GOLD** | Version: 6.1 (Resilient Execution Engine)

## Punkt 1: Blueprint-Check
- **Frage:** Sieht das aus wie ein Standard-Template (Bento + Cyan-Glow + Emoji-Kacheln)?
- **Antwort:** Nein, keinesfalls. Die Seite setzt die Grammatik „The Holistic Editorial“ konsequent um: Ein beruhigendes, erdig-meditatives Farbklima (Warmes Seidenpergament `#fbf9f5`, Heilkräuter-Jade `#2a4b3d`, Zinnoberrot-Akzent `#ba442a`), klassische Antiqua-Typografie (Cinzel) kombiniert mit Plus Jakarta Sans, keine bunten Emojis als Kacheln, keine Krypto-Glows, sondern redaktionelle Essay-Struktur mit Raum zum Durchatmen.
- **Versuche:** 1/3
- **Status:** PASS

## Punkt 2: Innovations-Check
- **Frage:** Einzigartiges Feature vorhanden, das lokaler Konkurrenz fehlt?
- **Feature:** „Der Interaktive TCM-Indikations- & Behandlungs-Kompass (5-Säulen-Check)“
- **Beschreibung:** Ein maßgeschneiderter Patienten-Wegweiser. Patienten können ihre Leitsymptome (Schmerz, Schlaf/Erschöpfung, Immunsystem/Allergien, Verdauung) per Daumenklick auswählen und erhalten eine präzise, beruhigende Aufklärung über die eingesetzten Säulen (Akupunktur, Moxa, Kräuter, Homöopathie), die Diagnosemethodik (Zunge & Puls) sowie den Behandlungsrahmen und die Abrechnung nach GebüH mit 1-Klick-Übernahme in das Terminformular oder WhatsApp.
- **Versuche:** 1/3
- **Status:** PASS

## Punkt 3: Container 375px (iPhone SE)
- **Frage:** Kein horizontaler Overflow, keine leeren Flächen, kein horizontaler Scrollbalken?
- **Test:** Überprüft. `html` und `body` mit Box-Sizing und `overflow-x: hidden`, `main` mit `overflow-x: clip`. Alle Buttons mit `max-width: 100%; word-break: break-word; white-space: normal;`. Fluid Type Scale mit clamp() und 4px-Spacing-System.
- **Versuche:** 1/3
- **Status:** PASS

## Punkt 4: Motion-Budget eingehalten
- **Frage:** Exakt die 3 gewählten Primitiven aktiv (nicht mehr, nicht weniger)?
- **Aktive Primitiven:**
  1. Hero Kinetic Typography (`initKineticTypography`)
  2. Scroll Reveal (`initScrollAnimations`)
  3. Stat-Counter (`initCounters`)
- **Deaktivierte Primitiven:** Card-Stacking & Magnetic Buttons (bewusst deaktiviert für barrierefreie Ruhe und Schonung mobiler Ressourcen).
- **Status:** PASS (3 von 3 Primitiven aktiv)

## Punkt 5: Daumen-Test 375px
- Navigation öffnet/schließt: PASS (Modal-Dialog mit ESC- und Backdrop-Handling)
- Signature Feature per Daumen bedienbar: PASS (Große Tab-Kacheln mit 48px+ Touch-Targets und Tastatur-Support)
- WhatsApp-Widget sichtbar und klickbar: PASS (Fixed Bottom-Right mit wa.me internationalem Format `498989648680`)
- Lenis-Scroll nicht ruckelnd: PASS (`smoothTouch: false` für natives Touch-Scrollen auf Smartphones)

## Punkt 6: Legal & SEO (Zero-Hallucination-Check)
- `favicon.svg` (physische Datei, kein Data-URL, geometrisches Vektor-Signet): PASS
- Impressum § 5 DDG vollständig oder `[MANUELL PRUEFEN]`: PASS
- Datenschutz Art. 13 vollständig (Vercel DPF, jsDelivr, Formspree, Google Maps Two-Click): PASS
- Cookie-Banner mit gleichwertigen Buttons: PASS
- Google Maps geblockt (`data-src`): PASS
- Schema.org JSON-LD (`MedicalBusiness` + `FAQPage`): PASS
- Title (54 Zeichen, 30–60 Zeichen Korridor): PASS
- Meta-Description (151 Zeichen, 120–158 Zeichen Korridor): PASS
- Plausible/Clarity Platzhalter im Head gesetzt: PASS
- `vercel.json` Security Headers vorhanden: PASS
- `manifest.webmanifest` vorhanden: PASS

## Punkt 7: Authentizität & Heilmittelwerbegesetz (HWG)
- **Frage:** Keine unzulässigen Heilversprechen nach HWG, keine werblichen Übertreibungen?
- **Ergebnis:** Geprüft. Alle Therapieverfahren werden seriös als Erfahrungsheilkunde und komplementärmedizinische Verfahren beschrieben. Gesetzlicher HWG-Hinweis im Footer integriert. Keine reißerischen Formulierungen.
- **Status:** PASS

## Gesamt-TODOS aus diesem Audit:
- [x] Blueprint-Check PASS
- [x] Innovations-Check PASS
- [x] Container 375px PASS
- [x] Motion-Budget PASS
- [x] Daumen-Test PASS
- [x] Legal & SEO PASS
- [x] HWG-Konformität PASS
- [ ] [MANUELL PRUEFEN: E-Mail-Adresse der Praxis Michael Segler]
- [ ] [MANUELL PRUEFEN: Exakte telefonische Sprechzeiten]
- [ ] [MANUELL PRUEFEN: Mitgliedschaft in Berufsverband (AGTCM / BDH)]
