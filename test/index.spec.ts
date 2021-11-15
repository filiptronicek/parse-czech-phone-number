import parsePhoneNumber from "../src";

test("a regular phone number is parsed correctly", () => {
    expect(parsePhoneNumber("+420696969420")).toEqual({ prefix: "+420", numberPart: "696969420" });
});

test("a phone number with 00 as a prefix is parsed correctly", () => {
    expect(parsePhoneNumber("00420696969420")).toEqual({ prefix: "+420", numberPart: "696969420" });
});

test("a phone number with a custom country code is parsed correctly", () => {
    expect(parsePhoneNumber("696969420", 421)).toEqual({ prefix: "+421", numberPart: "696969420" });
});
