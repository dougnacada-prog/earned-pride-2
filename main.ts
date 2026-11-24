import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "After forty-one tries, the kid stuck the landing, both feet on the board, and for once didn't look around to see who'd noticed.";

// Gate: a single line, 1-240 characters, no leading/trailing whitespace,
// no control characters, non-whitespace content.
if (ENTRY.length < 1 || ENTRY.length > 240) {
  throw new Error(`entry must be 1-240 characters, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(ENTRY)) {
  throw new Error("entry must not contain control characters");
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be blank");
}

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
