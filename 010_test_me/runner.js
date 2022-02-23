const fs = require('fs/promises')
const path = require('path')

class Runner {
	testFiles = []

	async runTestFiles() {
		for (const file of this.testFiles) {
			const beforeEachs = []
			global.beforeEach = (fn) => {
				beforeEachs.push(fn)
			}
			global.it = (desc, fn) => {
				beforeEachs.forEach(fn => fn())
				fn()
			}
			require(file.name)
		}
	}

	async collectFiles(targetPath) {
		const files = await fs.readdir(targetPath);
		for (const file of files) {
			const filepath = path.join(targetPath, file)
			const stats = await fs.lstat(filepath)

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({name: filepath})
			} else if (stats.isDirectory()) {
				const childFiles = await fs.readdir(filepath)
				files.push(...childFiles.map(f => path.join(file, f)))
			}
		}
	}
}

module.exports = Runner;