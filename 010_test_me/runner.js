import * as fs from "fs/promises";

class Runner {
	files = []

	async collectFiles(targetDir) {
		return await fs.readdir(targetDir);
	}
}

export default Runner;