const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const render = require('./render')

const forbiddenDirs = ['node_modules', 'src']

class Runner {
	testFiles = []

	async runTestFiles() {
		for (const file of this.testFiles) {
			console.log(chalk.gray(`-------- ${file.shortName}`))
			const beforeEachs = [];
			global.render = render;
			global.beforeEach = (fn) => {
				beforeEachs.push(fn)
			}
			global.it = async (desc, fn) => {
				beforeEachs.forEach(fn => fn())
				try {
					await fn();
					console.log(chalk.green(`✓ OK - ${desc}`))
				} catch (error) {
					const message = error.message.replace(/\n/g, '\n\t\t')
					console.log(chalk.bgRed('Failed'))
					console.log(chalk.red(`✕ - ${desc}\n`))
					console.log(chalk.red(message))
				}
			}
			try {
				require(file.name)
			} catch (error) {
				console.log(chalk.bgRed(`Error: ${file.shortName}`))
				console.log(error)
			}
		}
	}

	async collectFiles(targetPath) {

		const files = await fs.readdir(targetPath);
		for (const file of files) {
			const filepath = path.join(targetPath, file)
			const stats = await fs.lstat(filepath)

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({name: filepath, shortName: file})
			} else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
				const childFiles = await fs.readdir(filepath)
				files.push(...childFiles.map(f => path.join(file, f)))
			}
		}
	}
}

module.exports = Runner;