#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk')

const {lstat} = fs.promises

fs.readdir(process.cwd(), async (err, filenames) => {
	if (err) throw new Error(err)

	const statsPromises = filenames.map(filename => lstat(filename))
	const allStats = await Promise.all(statsPromises)
	allStats.forEach((stats, index) => {
		if (stats.isFile()) {
			console.log(chalk.magenta(filenames[index]))
		} else {
			console.log(chalk.bold.blue(filenames[index]))
		}
	})
})

