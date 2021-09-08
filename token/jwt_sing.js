const jwt = require('jsonwebtoken')

const getToken = (id) =>{

    return jwt.sign({id}, process.env.SCRIPT_TOKEN, {
        expiresIn : '3d'
    })
}


module.exports = getToken