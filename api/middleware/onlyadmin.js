import jwt from 'jsonwebtoken'

export const onlyadmin = async (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            console.log('onlyadmin: no access_token cookie')
            return next(403, 'Unathorized')
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log('onlyadmin: role in token =', decodeToken.role)
        if (decodeToken.role === 'admin') {
            req.user = decodeToken
            next()
        } else {
            return next(403, 'Unathorized')
        }
    } catch (error) {
        console.log('onlyadmin error:', error.message)
        next(500, error.message)
    }
}