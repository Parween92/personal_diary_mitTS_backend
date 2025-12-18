// Routes testen

jest.mock("chalk", () => ({
  default: { green: (msg: string) => msg },
}));

// Lädt die Express-App (ohne Server zu starten
jest.mock("../../db/index", () => ({
  query: jest.fn(),
}));

import request from "supertest";
import app from "../../server";

//Ersetzten die echte query-Funktion durch eine Fake-Funktion, damit keine echte DB angesprochen wird
import { query } from "../../db/index";
const mockQuery = query as jest.MockedFunction<typeof query>;

describe("GET /posts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Test ob alle Posts zurückgegeben werden
  it("gibt alle Posts zurück", async () => {
    const mockData = { rows: [{ id: 1 }, { id: 2 }], rowCount: 2 };
    mockQuery.mockResolvedValue(mockData as any);

    //Führen die Anfrage an die Express-App durch
    const res = await request(app).get("/posts");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

//❌ Author fehlt, Author klein und Titel zu kurz
describe("POST /posts", () => {
  it("lehnt Post ohne Author ab", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ title: "Test", content: "..." });

    expect(res.status).toBe(400);
    expect(res.body.msg).toContain("Author");
  });

  it("lehnt Author mit Kleinbuchstaben ab", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ author: "max müller", title: "Test", content: "..." });

    expect(res.status).toBe(400);
    expect(res.body.msg).toContain("Großbuchstaben");
  });

  it("lehnt zu kurzen Titel ab", async () => {
    const res = await request(app)
      .post("/posts")
      .send({ author: "Max Müller", title: "Hi", content: "..." });

    expect(res.status).toBe(400);
    expect(res.body.msg).toContain("3 Zeichen");
  });
});
