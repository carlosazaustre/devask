import { describe, it, expect } from "vitest";
import { getRelativeString } from "./dateUtils";

describe("getRelativeString", () => {
  it('should return "ahora for the current date', () => {
    const now = new Date().toISOString();
    expect(getRelativeString(now)).toBe("ahora");
  });

  it('should return "hace 1 minuto" for a date 1 minute ago', () => {
    const date = new Date(Date.now() - 60 * 1000).toISOString();
    expect(getRelativeString(date)).toBe("hace 1 minuto");
  });

  it('should return "hace 1 hora" for a date 1 hour ago', () => {
    const date = new Date(Date.now() - 3600 * 1000).toISOString();
    expect(getRelativeString(date)).toBe("hace 1 hora");
  });

  it('should return "hace 1 día" for a date 1 day ago', () => {
    const date = new Date(Date.now() - 86400 * 1000).toISOString();
    expect(getRelativeString(date)).toBe("ayer");
  });

  it('should return "hace 1 semana" for a date 1 week ago', () => {
    const date = new Date(Date.now() - 604800 * 1000).toISOString();
    expect(getRelativeString(date)).toBe("la semana pasada");
  });

  it('should return "hace 1 mes" for a date 1 month ago', () => {
    const date = new Date(Date.now() - 2592000 * 1000).toISOString();
    expect(getRelativeString(date)).toBe("el mes pasado");
  });

  it('should return "hace 1 año" for a date 1 year ago', () => {
    const date = new Date(Date.now() - 31536000 * 1000).toISOString();
    expect(getRelativeString(date)).toBe("el año pasado");
  });
});
