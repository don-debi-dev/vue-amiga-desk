export function upCount(div = 1): number { 
  return Math.round(parseInt(`${Date.now()}`.substring(6)) / div);
}

export function uniqueNumber(): string {
  const typedArray = new Uint8Array(4);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return randomValues.join('');
}
