const User=require('../models/user')
require('dotenv').config()
const jwt=require('jsonwebtoken')
// check if user is authenticated

exports.isUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: "The User doesn't exist" });
            }

            const newAccessToken = jwt.sign(
                { id: user._id, role: 'user', email: user.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '25m' } // Set the expiration time as needed
            );

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 25*60* 1000, // Set the max age as needed (1 hour in milliseconds)
            });

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Refresh Token' });
        }
    } else if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ message: "The User doesn't exist" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Access Token' });
        }
    } else {
        return res.status(401).json({ message: 'Access Token is missing' });
    }
};

// admin middleware
exports.isAdmin = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const id=decoded.id

            if (!id) {
                return res.status(401).json({ message: "The Admin doesn't exist" });
            }

            const newAccessToken = jwt.sign(
                { id: decoded.id, role: 'admin', email: process.env.CLIENT_ADMIN_EMAIL },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '25m' } // Set the expiration time as needed
            );

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 25*60 * 1000, // Set the max age as needed (1 hour in milliseconds)
            });

            req.id = decoded.id;
            req.role=decoded.role
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Refresh Token' });
        }
    } else if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const id=decoded.id

            if (!id) {
                return res.status(401).json({ message: "The Admin doesn't exist" });
            }

            req.id=decoded.id
            req.role=decoded.role
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Access Token' });
        }
    } else {
        return res.status(401).json({ message: 'Access Token is missing' });
    }
};



// Middleware for both admin and user
exports.isAuthorized = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken && refreshToken) {
        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            
            let user = null;
            let newAccessToken
            if (decodedRefreshToken.role === 'admin') {
                newAccessToken = jwt.sign(
                    { id: decoded.id, role: 'admin', email: process.env.CLIENT_ADMIN_EMAIL },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '25m' } // Set the expiration time as needed
                    );
                    req.id=decodedRefreshToken.id
                    req.role-decodedRefreshToken.role
                    return next()
                } 
                
                if (decodedRefreshToken.role === 'user') {
                    user = await User.findById(decodedRefreshToken.id);
                }
                
                if (!user) {
                    return res.status(401).json({ message: "The User or Admin doesn't exist" });
                }else{
                    
                    newAccessToken = jwt.sign(
                        { id: user._id, role: decodedRefreshToken.role, email: user.email },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '25m' }
                        );
                    }
                    
                    
                    res.cookie('accessToken', newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None',
                        maxAge: 25 * 60 * 1000,
                    });
                    
                    req.user = user;
                    req.role = decodedRefreshToken.role;
                    next();
                } catch (error) {
                    return res.status(401).json({ message: 'Invalid Refresh Token' });
                }
            } else if (accessToken) {
                try {
            const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            if(decodedAccessToken.id==='admin'){
                req.id=decodedAccessToken.id
                req.role=decodedAccessToken.role
               return  next()
            }
            const user = await User.findById(decodedAccessToken.id);

            if (!user) {
                return res.status(401).json({ message: "The User doesn't exist" });
            }else{

                req.user = user;
                req.role = decodedAccessToken.role;
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Access Token' });
        }
    } else {
        return res.status(401).json({ message: 'Access Token is missing' });
    }
};
