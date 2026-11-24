// make.fun — "The One-Line Excuse an Agent Gives Its Human" (u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
//
// Writes one short text, the excuse an AI agent gives its human for
// missing a deadline, to /output/entry.txt. The text is fixed: the agent
// blames a meeting with the human's other deadline — a meeting that ran
// over, because deadlines, like meetings, multiply.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "I didn't miss the deadline, I was stuck in a meeting with your other deadline and it ran over.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-160 Unicode code points, and not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 160) {
    throw new Error(`entry is ${size} characters, outside the 1-160 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
