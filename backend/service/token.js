const jwt = require('jsonwebtoken');
const tokenModel = require('../models/Token');

class TokenService {
	generateToken(payload) {
		const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '2h'
		});
	
		return token
	}

	validateToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}


	async saveToken(userId, token) {
		const tokenData = await tokenModel.findOne({ user: userId });

		if (tokenData) {
			tokenData.token = token;
			return await tokenData.save();
		}
		const tokenNew = await tokenModel.create({ user: userId, token });
		return tokenNew;
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken });
		return tokenData;
	}

	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({ refreshToken });
		return tokenData;
	}
}

module.exports = new TokenService();
