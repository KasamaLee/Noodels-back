const prisma = require("../models/prisma");
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {

        // ตรวจ Header
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('unauthenticated')
        }

        const token = authorization.split(' ')[1];
        // ตรวจสอบ Token ด้วย JWT: ใช้ jwt.verify() 
        // ตรวจสอบว่า token นั้นถูกต้องหรือไม่โดยใช้ secret key
        const payload = jwt.verify(token, 'lifeisshortthenoodleslong')

        // ตรวจสอบผู้ใช้ในฐานข้อมูล: ด้วย payload ที่ได้รับจาก token
        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })
        // console.log(user)
        delete user.password;

        if (!user) {
            throw new Error('unauthenticated')
        }

        // ถ้าพบข้อมูล user ในฐานข้อมูล , แนบ user(ที่ลบ password ออกแล้ว) ไปกับ request
        // middleware นี้จะแนบข้อมูล user ไปกับ request 
        req.user = user;
        console.log(req.user)

        // {
        //     id: 1,
        //     userName: 'John',
        //     email: 'John@gmail.com',
        //     mobile: '0901234567',
        //     address: null,
        //     role: 'USER'
        // }

    } catch (err) {
        console.log(first)
        next(err)
    }
}