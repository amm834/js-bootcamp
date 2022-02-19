#!/usr/bin/env node
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')
const program = require('caporal')

const start = () => {
	console.log('Starting program')
}

program.version('1.0.0')
	.argument("[filename]", "Filename to execute the program")
	.action(args => {
		console.log(args)
	})
program.parse(process.argv)

// chokidar.watch('.')
// 	.on('add', debounce(start, 100))
// 	.on('change', () => console.log('file change'))
// 	.on('unlink', () => console.log('file unlinked'))