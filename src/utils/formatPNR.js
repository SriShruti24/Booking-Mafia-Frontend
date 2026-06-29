/**
 * Generates a professional airline-style PNR (Passenger Name Record) reference
 * from a numeric booking ID. The result is deterministic — same ID always
 * produces the same PNR — and looks like real airline codes (e.g. "BM-K7X2A4").
 *
 * Real airlines (IndiGo, Air India, etc.) use 6-character alphanumeric PNRs.
 * We prefix with "BM-" (Booking Mafia) for branding, then generate 6 chars.
 */
export function formatPNR(bookingId) {
  // Alphabet used by airlines: uppercase letters + digits, no ambiguous chars (0,O,1,I)
  const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

  // Simple deterministic hash from the booking ID
  let hash = (bookingId * 2654435761) >>> 0; // Knuth multiplicative hash

  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += CHARS[hash % CHARS.length];
    hash = ((hash * 1664525) + 1013904223) >>> 0; // LCG step
  }

  return `BM-${pnr}`;
}
