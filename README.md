## CI/CD: testet --> Code kompiliert und Dependencies installieren

- Trigger: Push/PR auf `main` und `ci-cd`.
- Schritte: Checkout → Node (18.x/20.x Matrix) → npm ci → npm run build (tsc).

- Rot wird’s, wenn:
- `npm run build` fehlt, `tsc` Fehler wirft oder npm ci fehlschlägt.
- dist wird nicht committed; wird im Build erzeugt.

Regeln / Merken

- Vor Push: `npm run build` lokal prüfen.
- Wenn CI rot: Logs im Schritt “Build” ansehen (tsc-Fehler oder fehlendes Script).

Schritt | Zweck
| Build | Code kompilieren (tsc) ----> Geht der Code?
| Lint | Codequalität ----> Ist der Code sauber?
| Test | Funktionen & APIs prüfen

-------------------------------Nächste--------------------------------------------

## Unit-Tests: Eine Funktion testen bevor im Backend laufen soll getrennt aber immer

- Framework: Jest + ts-jest
- Laufen: `npm test`
- Tests liegen in `tests/unit/`
- Was getestet wird:
  - `validateAuthor`: Vor- und Nachname, beide groß
  - `validateTitle`: Mind. 3 Zeichen (getrimmt)
- Nutzen: Funktionen getrennt(Validators) prüfen, bevor sie im Backend laufen

-------------------------------Nächste--------------------------------------------

## API-Tests: ganze Route testen im Backend Also Funktion + Express-Route + Response zusammen

- Framework: Jest + Supertest
- Laufen: `npm test`
- Tests liegen in `tests/api/`
- Was getestet wird:
  - POST `/posts` mit ungültigem Author → 400-Fehler
  - POST `/posts` mit zu kurzem Titel → 400-Fehler
  - GET `/posts` (Daten korrekt zurückgegeben)
- Nutzen: Prüft, dass Validierung **wirklich im Backend läuft** (nicht nur Funktion)
