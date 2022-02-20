const fs = require("fs");
const crypto = require('crypto')

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

	async create(attrs) {
		attrs['_id'] = this.randomId();

		const records = await this.getAll();
		records.push(attrs)

		await this.writeAll(records)
	}

	async writeAll(records) {
		await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 4))
	}

	randomId() {
		return crypto.pseudoRandomBytes(4).toString('hex')
	}

	async getOne(_id) {
		const records = await this.getAll();
		return records.find(record => record._id === _id);
	}

	async delete(_id) {
		const records = await this.getAll();
		const filteredRecords = records.filter(record => record._id !== _id);
		await this.writeAll(filteredRecords);
	}

	async update(_id, attrs) {
		const records = await this.getAll();
		const record = records.find(record => record._id === _id);
		if (!record) {
			throw new Error(`User with id ${_id} not found`)
		}
		Object.assign(record, attrs);
		await this.writeAll(records);
	}
}

const test = async () => {
	const repo = new UserRepository('users.json')
	await repo.update('2d5019c7',{
		password:'password'
	})
}
test();