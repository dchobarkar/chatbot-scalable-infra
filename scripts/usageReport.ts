import fs from "fs";

const logs = fs
  .readFileSync("./token-logs.json", "utf-8")
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line));

const dailyTotal = logs.reduce((acc, log) => {
  const date = new Date(log.timestamp).toISOString().split("T")[0];
  acc[date] = (acc[date] || 0) + log.tokens;
  return acc;
}, {} as Record<string, number>);

console.table(dailyTotal);
