import bcrypt from "bcrypt";

const salt = parseInt(process.env.SALT);

async function Encrypt(password) {
	return await bcrypt.hash(password, salt)
}

async function Compare(password, hash){
	return await bcrypt.compare(password, hash)
}

export { Encrypt, Compare }