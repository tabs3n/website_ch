/**
 * Wandelt eine Telefonnummer in ein wählbares tel:-Ziel um.
 *
 * Die deutsche Schreibweise "+49 (0) 221 2790-20" enthält eine eingeklammerte
 * Null. Sie steht für die Vorwahl im Inlandsformat und darf in der
 * internationalen Wählnummer nicht auftauchen — sonst landet der Anruf im
 * Nichts. Deshalb wird sie vor dem Entfernen der übrigen Zeichen gestrichen.
 */
export function telHref(phone: string): string {
  const dialable = phone.replace(/\(0\)/g, "").replace(/[^+\d]/g, "");
  return `tel:${dialable}`;
}
