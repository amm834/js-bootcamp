#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk')
const path = require('path')

const {lstat} = fs.promises;

const targetDir = process.argv[2] ?? process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
	if (err) throw new Error(err);

	const statsPromises = filenames.map(filename => lstat(path.join(targetDir, filename)))
	const allStats = await Promise.all(statsPromises)

	allStats.forEach((stats, index) => {
		if (stats.isFile()) {
			console.log(chalk.magenta(filenames[index]))
		} else {
			console.log(chalk.bold.blue(filenames[index]))
		}
	})
})

