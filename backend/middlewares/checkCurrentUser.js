import jwt from "jsonwebtoken";

export const checkCurrentUser = (req, res, next) => {
    const Authorities = req.header('authorization');

    if (!Authorities) {
        req.user = null;
        next(err);
    } else {
        const token = Authorities.replace('Bearer ', '');
    }

    // try verify token
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId };
        next();

    } catch (error) {
        req.user = null;
        next();
    }
};