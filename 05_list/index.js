#!/usr/bin/env node

const fs = require('fs');
const util = require('util')

// Method #2
// const lstat = util.promisify(fs.lstat)

const {lstat} = fs.promises

fs.readdir(process.cwd(), (err, filenames) => {
	if (err) throw new Error(err)
})

// Method #1
// const lstat = (filename) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) reject(err);
// 			resolve(lstat)
// 		})
// 	})
// }