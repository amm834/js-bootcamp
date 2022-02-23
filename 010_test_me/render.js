const fs = require('fs')
const {JSDOM} = require('jsdom')
const path = require("path");

const render = async (filename) => {
	const filepath = path.join(process.cwd(), filename)
	return await JSDOM.fromFile(filepath, {
		runScripts: 'dangerously',
		resource: 'usable'
	});
}

module.exports = render;