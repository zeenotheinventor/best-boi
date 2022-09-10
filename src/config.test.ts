import { calculateScore } from "./config";
import { Stats } from "./types";

describe("Config", () => {
  const subject = (stats: Stats) => {
    return calculateScore(stats);
  };

  it("calculates weighted score", () => {
    const stats1: Stats = {
      client_calls: 1,
      cvs: 1,
      deals: 1,
      interviews: 1,
    };

    const stats2: Stats = {
      client_calls: 1,
      cvs: 1,
      deals: 2,
      interviews: 1,
    };

    const stats3: Stats = {
      client_calls: 3,
      cvs: 1,
      deals: 0,
      interviews: 0,
    };

    expect(subject(stats1)).toEqual(1365);
    expect(subject(stats2)).toEqual(2365);
    expect(subject(stats3)).toEqual(145);
  });

  it("weighs client_calls appropriately", () => {
    const statsOne: Stats = {
      client_calls: 1,
      cvs: 0,
      deals: 0,
      interviews: 0,
    };
    expect(subject(statsOne)).toEqual(15);
  });

  it("weighs cvs appropriately", () => {
    const statsOne: Stats = {
      client_calls: 0,
      cvs: 1,
      deals: 0,
      interviews: 0,
    };
    expect(subject(statsOne)).toEqual(100);
  });

  it("weighs deals appropriately", () => {
    const statsOne: Stats = {
      client_calls: 0,
      cvs: 0,
      deals: 1,
      interviews: 0,
    };
    expect(subject(statsOne)).toEqual(1000);
  });

  it("weighs interviews appropriately", () => {
    const statsOne: Stats = {
      client_calls: 0,
      cvs: 0,
      deals: 0,
      interviews: 1,
    };
    expect(subject(statsOne)).toEqual(250);
  });
});
