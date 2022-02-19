#!/usr/bin/env node
const chokidar = require('chokidar')

chokidar.watch('.')
	.on('add', () => console.log('file added'))
	.on('change', () => console.log('file change'))
	.on('unlink', () => console.log('file unlinked'))