import apartments from "./apartments.json";
import { type IApartment } from "./types";

export function getAllApartments(): IApartment[] {
  return apartments as IApartment[];
}
