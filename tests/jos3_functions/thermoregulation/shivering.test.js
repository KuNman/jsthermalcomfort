import {
  shivering,
  PRE_SHIV,
  set_pre_shiv,
} from "../../../src/jos3_functions/thermoregulation/shivering";
import { describe, it, expect } from "@jest/globals";
import { $lerp } from "../../../src/supa";

describe("shivering", () => {
  beforeEach(() => {
    set_pre_shiv(0);
  });

  it.each([
    {
      age: 20,
      bsa_equation: "dubois",
      sex: "male",
      expectedShiv: 436.81635529411756,
      options: {},
      expected: [
        1.4815766291857488e1, 1.9055085850294589e1, 1.1972362884930503e2,
        1.0533616494582573e2, 1.6937174244089826e2, 1.0620151058765104,
        5.9874925722255923e-1, 8.7408650689424716e-2, 1.0620151058765104,
        5.9874925722255923e-1, 8.7408650689424716e-2, 1.7044686884437816,
        7.6482569353246621e-1, 1.5296513870649325e-1, 1.7044686884437816,
        7.6482569353246621e-1, 1.5296513870649325e-1,
      ],
    },
    {
      age: 20,
      bsa_equation: "takahira",
      sex: "male",
      expectedShiv: 436.81635529411756,
      options: {},
      expected: [
        1.4977126122758907e1, 1.9262616488268094e1, 1.2102754955954499e2,
        1.0648339050464165e2, 1.7121638518035363e2, 1.0735816070296207,
        6.0527028873686439e-1, 8.8360626092972919e-2, 1.0735816070296207,
        6.0527028873686439e-1, 8.8360626092972919e-2, 1.7230322088129719,
        7.7315547831351306e-1, 1.5463109566270258e-1, 1.7230322088129719,
        7.7315547831351306e-1, 1.5463109566270258e-1,
      ],
    },
    {
      age: 20,
      bsa_equation: "fujimoto",
      sex: "male",
      expectedShiv: 436.81635529411756,
      options: {},
      expected: [
        1.4486144633705385e1, 1.8631147670488343e1, 1.1706001359755909e2,
        1.02992642466539e2, 1.6560355431699659e2, 1.0383873586992356,
        5.8542826395800518e-1, 8.5463980139854789e-2, 1.0383873586992356,
        5.8542826395800518e-1, 8.5463980139854789e-2, 1.6665476127271681,
        7.4780982622372927e-1, 1.4956196524474585e-1, 1.6665476127271681,
        7.4780982622372927e-1, 1.4956196524474585e-1,
      ],
    },
    {
      age: 20,
      bsa_equation: "kurazumi",
      sex: "male",
      expectedShiv: 436.81635529411756,
      options: {},
      expected: [
        1.4676153602852603e1, 1.8875524987739631e1, 1.1859544300783017e2,
        1.0434355579231666e2, 1.6777570994836279e2, 1.0520074706469564,
        5.9310709250466265e-1, 8.6584977007979971e-2, 1.0520074706469564,
        5.9310709250466265e-1, 8.6584977007979971e-2, 1.6884070516556091,
        7.5761854881982471e-1, 1.5152370976396493e-1, 1.6884070516556091,
        7.5761854881982471e-1, 1.5152370976396493e-1,
      ],
    },
  ])(
    "works correctly with given age $age and options $options",
    ({ age, bsa_equation, sex, expectedShiv, expected }) => {
      const result = shivering(
        $lerp(17, -5, -1),
        $lerp(17, -5, -1),
        $lerp(17, 36, 38),
        $lerp(17, 30, 34),
        1.72,
        74.43,
        bsa_equation,
        age,
        sex,
        {},
      );

      expect(PRE_SHIV).toBeCloseTo(expectedShiv);

      expect(result).toHaveLength(expected.length);

      for (let i = 0; i < expected.length; i++) {
        expect(result[i]).toBeCloseTo(expected[i]);
      }
    },
  );
});
