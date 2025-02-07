
const tokenService = require('../service/token');

module.exports = function (req, res, next) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({error: 'accec denide'})
		}
		const token = authHeader.split(' ')[1];

		if (!token) {
			return res.status(401).json({error: 'Unauthorized'})
		}

		const userData = tokenService.validateToken(token);

		if (!userData) {
			return res.status(401).json({error: 'Unauthorized'})
		}
		// res.status(200).json({user: userData})
		next();
	} catch (e) {
		return res.status(401).json({error: 'Unauthorized'})
	}
};
