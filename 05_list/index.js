#!/usr/bin/env node

const fs = require('fs');
const util = require('util')

// Method #2
// const lstat = util.promisify(fs.lstat)

const {lstat} = fs.promises

fs.readdir(process.cwd(), (err, filenames) => {
	if (err) throw new Error(err)

	filenames.forEach(async filename => {
		try {
			const stats = await lstat(filename)
			console.log(filename, stats.isFile())
		} catch (errors) {
			console.log(errors)
		}
	})
})

// Method #1
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) reject(err);
// 			resolve(stats)
// 		})
// 	})
// }