CI/CD

- Trigger: Push/PR auf `main` und `ci-cd`.
- Schritte: Checkout → Node (18.x/20.x Matrix) → npm ci → npm run build (tsc).

- Rot wird’s, wenn:
- `npm run build` fehlt, `tsc` Fehler wirft oder npm ci fehlschlägt.
- dist wird nicht committed; wird im Build erzeugt.

Regeln / Merken

- Vor Push: `npm run build` lokal prüfen.
- Wenn CI rot: Logs im Schritt “Build” ansehen (tsc-Fehler oder fehlendes Script).
