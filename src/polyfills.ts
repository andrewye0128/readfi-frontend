/**
 * Polyfills for WalletConnect v1 browser compatibility
 */

import { Buffer } from "buffer";
import * as util from "util";

// Set global variables
(window as any).global = window;
(window as any).Buffer = Buffer;
(window as any).process = {
  env: {},
  version: "",
  nextTick: (fn: Function) => setTimeout(fn, 0),
};
(window as any).util = util;

export {};
