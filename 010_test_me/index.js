#!/usr/bin/env node
import Runner from "./runner.js";

const runner = new Runner();
await runner.collectFiles(process.cwd())
await runner.runTestFiles()