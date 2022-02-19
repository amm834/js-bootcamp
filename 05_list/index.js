#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {
	if (err) throw new Error(err)

	filenames.forEach(path => {
		fs.lstat(path, (err, stats) => {
			if (err) throw new Error(err)

			console.log(path, stats.isFile())
		})
	})
})