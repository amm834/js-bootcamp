import * as fs from "fs/promises";
import * as path from "path";

class Runner {
	testFiles = []

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

export default Runner;
