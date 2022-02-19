#!/usr/bin/env node
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')
const program = require('caporal')
const fs = require('fs').promises;

const start = () => {
	console.log('Starting program')
}

program.version('1.0.0')
	.argument("[filename]", "Filename to execute the program")
	.action(async ({filename}) => {
		const name = filename ?? 'index.js';
		try {
			const file = await fs.access(name)
		} catch (err) {
			throw new Error(`${name} file not found.`)
		}

		chokidar.watch('.')
			.on('add', debounce(start, 100))
			.on('change', () => console.log('file change'))
			.on('unlink', () => console.log('file unlinked'))
	})
program.parse(process.argv)

