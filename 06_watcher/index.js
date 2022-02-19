#!/usr/bin/env node
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')
const program = require('caporal')
const fs = require('fs').promises;
const {spawn} = require('child_process')

program.version('1.0.0')
	.argument("[filename]", "Filename to execute the program")
	.action(async ({filename}) => {
		const name = filename ?? 'index.js';

		try {
			const file = await fs.access(name)
		} catch (err) {
			throw new Error(`${name} file not found.`)
		}

		const start = debounce(() => {
			spawn('node', [name], {stdio: 'inherit'})
		}, 100);

		chokidar.watch('.')
			.on('add', start)
			.on('change', start)
			.on('unlink', start)
	})
program.parse(process.argv)

