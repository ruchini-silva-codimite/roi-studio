import { assumptions } from "./data/assumptions.js";

export function initState() {
  window.appState = JSON.parse(JSON.stringify(assumptions));
}
