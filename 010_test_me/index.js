#!/usr/bin/env node

const Runner = require("./runner");
const test = async () => {
	const Runner = require('./runner')

	const runner = new Runner();
	await runner.collectFiles(process.cwd())
	await runner.runTestFiles()
}

test()