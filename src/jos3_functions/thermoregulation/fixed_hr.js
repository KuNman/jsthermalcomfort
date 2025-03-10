import { $average } from "../../supa.js";
import JOS3Defaults from "../JOS3Defaults.js";

/**
 * Fixes hr values to fit two-node-model's values.
 */
export function fixed_hr(hr) {
  let mean_hr = $average(hr, JOS3Defaults.local_bsa);
  return hr.map((hr) => (hr * 4.7) / mean_hr);
}
