#!/usr/bin/env node

const fs = require('fs');


const {lstat} = fs.promises

fs.readdir(process.cwd(), async (err, filenames) => {
	if (err) throw new Error(err)

	const statsPromises = filenames.map(filename => lstat(filename))
	const allStats = await Promise.all(statsPromises)
	allStats.forEach((stats, index) => {
		console.log(filenames[index], stats.isFile())
	})
})

