const fs = require("fs");

class UserRepository {
	constructor(filename) {
		if (!filename) {
			throw new Error("Filename must be provided")
		}
		this.filename = filename;
		try {
			fs.accessSync(this.filename)
		} catch (error) {
			fs.writeFileSync(this.filename, '[]')
		}
	}

	async getAll() {
		return JSON.parse(await fs.promises.readFile(this.filename, {
			encoding: 'utf-8'
		}))
	}
}

const test = async () => {
	const repo = new UserRepository('users.json')
	const contents = await repo.getAll()
	console.log(contents, contents.length)
}
test();