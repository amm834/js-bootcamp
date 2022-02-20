const fs = require("fs");
const crypto = require('crypto')
const util = require('util')
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt)

class UserRepository extends Repository {
	async create(attrs) {
		attrs._id = this.randomId();
		const salt = crypto.randomUUID().toString().replace('-', '')
		const buffer = await scrypt(attrs.password, salt, 64)
		const hashed = buffer.toString('hex')

		const records = await this.getAll();
		const record = {
			...attrs, password: `${hashed}.${salt}`
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
}

module.exports = new UserRepository('users.json')