import { validateTitle } from "../../db/validators";

//nur wenn der Titel mind. 3 Zeichen hat ist er gültig :) sonst :(
describe("validateTitle", () => {
  it("akzeptiert mind. 3 Zeichen", () => {
    expect(validateTitle("ABC")).toBe(true);
  });

  it("trimmt Whitespaces und akzeptiert", () => {
    expect(validateTitle("  ABC ")).toBe(true);
  });

  it("lehnt leeren Titel ab", () => {
    expect(validateTitle("")).toBe(false);
  });

  it("lehnt nur Whitespaces ab", () => {
    expect(validateTitle("   ")).toBe(false);
  });

  it("lehnt zu kurze Titel ab", () => {
    expect(validateTitle("Hi")).toBe(false);
  });
});
