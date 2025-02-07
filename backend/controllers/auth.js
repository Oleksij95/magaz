const User = require("../models/User")
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcryptjs')
const tokenService = require('../service/token')
const cookie = require('cookie');

class Auth {
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({'email': email})

            if (!user) {
                return res.status(404).json({error: 'user not found'})
            }

            const isPassEquals = await bcrypt.compare(password.toString(), user.password)
            
            if (!isPassEquals) {
                return res.status(401).json({error: 'error pass'})
            }

            const userDto = new UserDto(user)
            const token = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id, token)

            res.setHeader(
			    'Set-Cookie',
				cookie.serialize('token', String(token), {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 1,
					
				})
			);
          
            return res.status(200).json({userDto, token})
        } catch( e ) {
            return res.status(500).json({error: e})
        }
    }

    async checkAuth(req, res) {
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
            return res.status(200).json({user: userData})
        
        } catch (e) {
            return res.status(401).json({error: 'Unauthorized'})
        }
    }
}

module.exports = new Auth