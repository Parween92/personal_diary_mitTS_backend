import express from "express";
type Request = express.Request;
type Response = express.Response;
//TypeScript Typdeklaration / Type Alias: erstellen einen Type Alias namens Request---> statt express.Request einfach Request verwenden.

import cors from "cors";
import chalk from "chalk";

import { query } from "./db/index";
import { validateAuthor } from "./db/validators";
import { validateTitle } from "./db/validators";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json(), cors());

// GET alle Posts: Deklaration--->(req: Request, res: Response)
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const { rows } = await query(
      "SELECT id, author, title, content, cover, date, category, status from posts order by date DESC;"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET Post by ID: Deklaration--->(req: Request, res: Response)
app.get("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await query(
      "SELECT author, title, content, cover, date, category, status from posts WHERE id = $1;",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST neuer Post: Deklaration--->(req: Request, res: Response)
app.post("/posts", async (req: Request, res: Response) => {
  const { author, title, content, cover, date, category, status } = req.body;

  //  WICHTIG FÜR UNI_TESTS: hier soll Validierung in POST-Route einbauen:
  //  if (!author) return res.status(400).json({ msg: "Author required" });

  //kein Autor angegeben oder der Autor ungültig ist dann Fehler
  if (!author || !validateAuthor(author)) {
    return res
      .status(400)
      .json({ msg: "Author muss Vor- und Nachname mit Großbuchstaben sein" });
  }
  //kein Titel angegeben oder der Titel ungültig ist dann Fehler
  if (!title || !validateTitle(title)) {
    return res.status(400).json({ msg: "Title muss mind. 3 Zeichen haben" });
  }
  try {
    const { rows } = await query(
      "INSERT INTO posts (author, title, content, cover, date, category, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [author, title, content, cover, date, category, status]
    );
    res.status(201).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE Post
app.delete("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { rowCount } = await query("DELETE FROM posts WHERE id = $1;", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// app.listen(port, () => {
//   console.log(chalk.green(`Server läuft auf port ${port}`));
// });

// Für E2E-APi Test:  Nur Server starten, wenn direkt ausgeführt (nicht im Test)
if (module === require.main) {
  app.listen(port, () => {
    console.log(chalk.green(`Server läuft auf port ${port}`));
  });
}

export default app;
