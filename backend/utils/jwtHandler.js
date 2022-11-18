const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/user')

const tokenDecode = (req) => {
  
    // get token from header
    const bearerHeader = req.headers['authorization']
    
    if (bearerHeader) {
        // seperate token from complete header value
        // eg. 'Bearer xxxxx'
        const bearer = bearerHeader.split(' ')[1]
        
        try {
            const tokenDecoded = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET
            )
            return tokenDecoded
        } catch {
            return false
        }

    } else {
        return false
    }

}

exports.checkToken = async (req, res, next) => {
    
    const tokenDecoded = tokenDecode(req)
    
    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id)
        // if user not exist
        if (!user) return res.status(401).json('Unathorized')
        req.user = user
        next()
    } else {
        res.status(401).json('Unathorized')
    }

}