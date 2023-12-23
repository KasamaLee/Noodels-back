const prisma = require("../models/prisma");
const { registerSchema, loginSchema, googleLoginSchema } = require('../validator/auth-validator')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, 'lifeisshortthenoodleslong', { expiresIn: '7d' })
    return accessToken;
}

exports.register = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const { error, value } = registerSchema.validate(reqBody);

        if (error) {
            return res.json({ msg: "register failed" })
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);
        value.password = hashedPassword;
        value.role = 'USER';
        // console.log(value)

        const user = await prisma.user.create({
            data: value
        })
        delete user.password;


        const payload = {
            userId: user.id,
            role: user.role
        }
        const accessToken = generateToken(payload);

        res.status(200).json({ user, accessToken })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const { error, value } = loginSchema.validate(reqBody)

        if (error) {
            return res.json({ msg: "login failed" })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: value.email
            }
        })

        if (!user) {
            return res.status(500).json({ msg: "user not found" })
        }

        const isMatched = await bcrypt.compare(value.password, user.password)
        if (!isMatched) {
            // res.status(500).json({ msg: "password not matched" })
            throw new Error('not matched')
        }
        delete user.password

        const payload = {
            userId: user.id,
            role: user.role
        }
        const accessToken = generateToken(payload);

        res.status(200).json({ user, accessToken })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.googleLogin = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const { error, value } = googleLoginSchema.validate(reqBody);

        if (error) {
            return res.json({ msg: "google login failed" })
        }

        const existGoogleUser = await prisma.user.findFirst({
            where: {
                googleId: value.googleId
            }
        })

        if (existGoogleUser) {
            const payload = {
                userId: existGoogleUser.id,
                role: existGoogleUser.role
            }
            const accessToken = generateToken(payload);
            const user = existGoogleUser;
            return res.status(200).json({ user, accessToken })
        }

        value.role = 'USER';
        const googleUser = await prisma.user.create({
            data: value
        })

        const payload = {
            userId: googleUser.id,
            role: googleUser.role
        }
        const accessToken = generateToken(payload);
        res.status(200).json({ googleUser, accessToken })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getMe = async (req, res, next) => {
    res.status(200).json({ user: req.user })
}