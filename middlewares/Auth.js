import jwt from 'jsonwebtoken'

export const verify = async (req,res,next) => {
    const authHeader = req.headers.auth
    if(authHeader){
        const token = await authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY || 'RAHASIA', (err, user) => {
            if(err) return res.status(403).json("invalid token")
            req.user = user;
            next()
        })
    }else{
        res.status(401).json("no token provided")
    }
}