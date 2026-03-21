export function secondsToHours(seconds) {
  return seconds / 3600;
}

export function minutesToHours(minutes) {
  return minutes / 60;
}

export function percentToDecimal(percent) {
  return percent / 100;
}

export function roundNumber(value, digits = 2) {
  return Number(Number(value).toFixed(digits));
}

export function roundCurrency(value) {
  return roundNumber(value, 2);
}
