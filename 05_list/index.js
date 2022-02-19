#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {
	if (err) throw new Error(err)
	const allStats = Array(filenames.length).fill(null)

	filenames.forEach(filename => {
		fs.lstat(filename, (err, stats) => {
			if (err) throw new Error(err);

			const index = filenames.indexOf(filename)

			allStats[index] = stats;

			const ready = allStats.every(stats => stats)
			if (ready) {
				allStats.forEach((stats, index) => {
					console.log(filenames[index], stats.isFile())
				})
			}
		})
	})
})