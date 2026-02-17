import fs from "node:fs";

async function main() {
  const commitMsgFile = process.argv[2];
  if (!commitMsgFile) {
    console.error("Missing commit message file path.");
    process.exit(1);
  }

  const raw = fs.readFileSync(commitMsgFile, "utf8");
  const lines = raw.split(/\r?\n/);
  const firstLine = lines.find(line => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !trimmed.startsWith("#");
  });

  if (!firstLine) {
    process.exit(0);
  }

  const header = firstLine.trim();

  const ignoredPrefixes = ["Merge ", "Revert ", "fixup!", "squash!"];
  if (ignoredPrefixes.some(prefix => header.startsWith(prefix))) {
    process.exit(0);
  }

  const allowedTypes = new Set([
    "feat",
    "fix",
    "docs",
    "style",
    "refactor",
    "perf",
    "test",
    "build",
    "ci",
    "chore",
    "revert",
  ]);

  const match = header.match(/^(\w+)(\([^\)]+\))?(!)?:\s(.+)$/);
  if (!match) {
    fail(header);
    return;
  }

  const type = match[1];
  const subject = match[4].trim();

  if (!allowedTypes.has(type) || subject.length === 0) {
    fail(header);
    return;
  }

  function fail(line: string) {
    console.error("\nInvalid commit message.");
    console.error(`Received: "${line}"`);
    console.error("\nExpected: type(scope?)!: subject");
    console.error("Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert");
    console.error("\nExamples:");
    console.error("  feat(search): add filters");
    console.error("  fix!: drop node 16 support");
    process.exit(1);
  }
}

void main();
