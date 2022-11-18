var express = require('express');
const CryptoJS = require('crypto-js')
const jsonwebtoken = require('jsonwebtoken')
const {body, validationResult} = require('express-validator')
var router = express.Router();

const User = require('../models/user')
const jwtHandler = require('../utils/jwtHandler')

//  create and save new user
router.post('/signup',
	body('email').isEmail(),
	body('mobile').isMobilePhone(),
    body('password').isLength({min: 6}),
	async function(req, res) {
	
	const errors = validationResult(req)

	try{
		// check validation errors
		if (!errors.isEmpty()){
      		if (errors.errors[0].param === 'password') {
        		return res
          		.status(400)
          		.send('Password must be longer than 6 characters.')
      		} else {
				// error response for both email and mobile
      			res
      			.status(400)
      			.send(`Invalid ${errors.errors[0].param}`)
      		}
        }
		
		const { password } = req.body;

		// replace plain to excrypted password 
		req.body.password = CryptoJS.AES.encrypt(
	    	password,
	    	process.env.PASSWORD_SECRET
	    )
		
		// store user info in database
		const user = await User.create(req.body)
		
		// generate token for further authorization
		const token = jsonwebtoken.sign(
			{ id: user._id },
			process.env.TOKEN_SECRET,
			{ expiresIn: '24h' }
	    )

		res.status(201).json({ user, token })
	
	} catch (err) {
		console.log(err)
		res.status(500).json(err)
	}
});

// verify registered user and generate token
router.post('/signin', 
	async function(req, res) {
	
	try{
		const { email, mobile, password } = req.body

		let user = null
		let param = ""

		// check user for one of email or mobile given
		if(email!=undefined){
			user = await User.findOne({ email }).select('password email mobile')
			param = 'email'
		} else {
			user = await User.findOne({ mobile }).select('password email mobile')
			param = 'mobile'
		}

		// error response 
		// no user found
	    if (!user) {
	    	return res.status(401).json({
				errors: [
					{
						param: `${param}`,
						msg: `Invalid ${param}`
					}
				]
	      	})
	    }

		// decrpyt stored password
    	const decryptedPass = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASSWORD_SECRET
	    ).toString(CryptoJS.enc.Utf8)

		// stored and given password do not match
		if (decryptedPass !== password) {
			return res.status(401).json({
				errors: [
					{
						param: 'password',
						msg: 'Invalid password'
					}
				]
			})
		}

		// NOTE: password should not be sent as response
		// password value is replaced
    	user.password = undefined

		// new signed token generated
		const token = jsonwebtoken.sign(
			{ id: user._id },
			process.env.TOKEN_SECRET,
			{ expiresIn: '24h' }
		)

	    res.status(200).json({ user, token })

  	} catch (err) {
    	res.status(500).json(err)
  	}

});

// check if token is valid
// send user details as response
router.post(
  '/check-token',
  jwtHandler.checkToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router;
