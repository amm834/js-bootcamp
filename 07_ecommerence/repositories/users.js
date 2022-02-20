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
		// open the this.filename
		const contents = await fs.promises.readFile(this.filename, {
			encoding: 'utf-8'
		})
		console.log(contents)
	}
}

const test = async () => {
	const repo = new UserRepository('users.json')
	await repo.getAll()
}
test();