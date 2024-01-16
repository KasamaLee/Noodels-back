const prisma = require("../models/prisma");
const { registerSchema, loginSchema, googleLoginSchema, profileSchema, passwordSchema } = require('../validator/auth-validator')

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

exports.updateProfile = async (req, res, next) => {
    try {

        const body = req.body
        const { error, value } = profileSchema.validate(body);

        if (error) {
            return res.json({ error })
        }

        const user = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: value
        });

        // console.log(user)
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.updatePassword = async (req, res, next) => {
    try {

        const body = req.body
        const { error, value } = passwordSchema.validate(body);
        // console.log(body)

        if (error) {
            return res.json({ error })
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        })

        const isMatched = await bcrypt.compare(value.oldPassword, user.password)

        if (!isMatched) {
            // throw new Error('not matched')
            return res.status(500).json({ msg: 'the old password does not correct' })
        }

        const hashedPassword = await bcrypt.hash(value.newPassword, 10);
        const updatedUserPassword = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                password: hashedPassword
            }
        });
        res.status(200).json({ updatedUserPassword })

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

        // Register
        if (existGoogleUser) {
            const payload = {
                userId: existGoogleUser.id,
                role: existGoogleUser.role
            }
            const accessToken = generateToken(payload);
            const user = existGoogleUser;
            delete user.googleId
            delete user.password
            return res.status(200).json({ user, accessToken })
        }

        // Login
        value.role = 'USER';
        const googleUser = await prisma.user.create({
            data: value
        })
        delete googleUser.googleId
        delete googleUser.password

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