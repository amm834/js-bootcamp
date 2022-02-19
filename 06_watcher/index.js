#!/usr/bin/env node
const chokidar = require('chokidar')
const debounce = require('lodash.debounce')

const start = () => {
	console.log('Starting program')
}
chokidar.watch('.')
	.on('add', debounce(start, 100))
		.on('change', () => console.log('file change'))
		.on('unlink', () => console.log('file unlinked'))