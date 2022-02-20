const fs = require("fs");
const crypto = require('crypto')
const util = require('util')

const scrypt = util.promisify(crypto.scrypt)

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
		attrs._id = this.randomId();
		const salt = crypto.randomBytes(8)
		const buffer = await scrypt(attrs.password, salt, 64)
		const hashed = buffer.toString('hex')

		const records = await this.getAll();
		const record = {
			...attrs,
			password: `${hashed}.${salt}`
		}
		records.push(record)

		await this.writeAll(records)

		return record;
	}

	async comparePassword(saved, supplied) {
		const [hashed, salt] = saved.split('.')
		const hashSupplied = await scrypt(supplied, salt, 64)
		return hashed === hashSupplied.toString('hex')
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

	async getOneBy(filters) {
		const records = await this.getAll();

		for (const record of records) {
			let found = true;

			for (const key in filters) {
				if (record[key] !== filters[key]) {
					found = false;
				}
			}

			if (found) {
				return record;
			}
		}
	}
}

module.exports = new UserRepository('users.json')