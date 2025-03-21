"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.humidex = void 0;
const utilities_js_1 = require("../utilities/utilities.js");
/**
 * @typedef {object} HumidexResult - a result set containing the humidex and
 * discomfort level.
 * @property {number} humidex - the humdidex given the provided dry bulb
 * air temperature and relative humidity.
 * @property {string} discomfort - a human description of how the weather
 * would be felt by the average person.
 * @public
 */
/**
 * Calculates the humidex (short for "humidity index"). It has been
 * developed by the Canadian Meteorological service. It was introduced in 1965
 * and then it was revised by Masterson and Richardson (1979) {@link #ref_14|[14]}. It aims
 * to describe how hot, humid weather is felt by the average person. The
 * Humidex differs from the heat index in being related to the dew point
 * rather than relative humidity {@link #ref_15|[15]}.
 *
 * @public
 * @memberof models
 * @docname Humidex
 *
 * @param {number} tdb - dry bulb air temperature, [°C]
 * @param {number} rh - relative humidity, [%]
 * @param {object} [options] - configuration options for the function.
 * @param {boolean} [options.round = true] - If true, rounds output value. If
 * false, it does not.
 *
 * @returns {HumidexResult} the result given the provided temperature and
 * relative humidity.
 *
 * @example
 * const result = humidex(25, 50);
 * console.log(result); // -> { humidex: 28.2, discomfort: "Little or no discomfort" }
 */
function humidex(tdb, rh, options = { round: true }) {
    let hi = tdb +
        (5 / 9) * ((6.112 * 10 ** ((7.5 * tdb) / (237.7 + tdb)) * rh) / 100 - 10);
    if (options.round) {
        hi = (0, utilities_js_1.round)(hi, 1);
    }
    let stress_category = "Heat stroke probable";
    if (hi <= 30) {
        stress_category = "Little or no discomfort";
    }
    else if (hi <= 35) {
        stress_category = "Noticeable discomfort";
    }
    else if (hi <= 40) {
        stress_category = "Evident discomfort";
    }
    else if (hi <= 45) {
        stress_category = "Intense discomfort; avoid exertion";
    }
    else if (hi <= 54) {
        stress_category = "Dangerous discomfort";
    }
    return { humidex: hi, discomfort: stress_category };
}
exports.humidex = humidex;
