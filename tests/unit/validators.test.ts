import { validateAuthor } from "../../db/validators";

//nur wenn beide Namen mit Großbuchstaben beginnen ist der Name gültig :) sonst :(
describe("validateAuthor", () => {
  it("akzeptiert korrekten Namen mit Großbuchstaben", () => {
    expect(validateAuthor("Max Müller")).toBe(true);
  });

  it("lehnt ab wenn nur Vorname", () => {
    expect(validateAuthor("Max")).toBe(false);
  });

  it("lehnt ab wenn Vorname mit Kleinbuchstabe", () => {
    expect(validateAuthor("max Müller")).toBe(false);
  });

  it("lehnt ab wenn Nachname mit Kleinbuchstabe", () => {
    expect(validateAuthor("Max müller")).toBe(false);
  });

  it("lehnt ab wenn leer", () => {
    expect(validateAuthor("")).toBe(false);
  });
});
