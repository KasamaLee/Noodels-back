const prisma = require('../models/prisma')
const fs = require('fs')
const { upload } = require('../utils/cloudinary-service')


exports.createOrder = async (req, res, next) => {
    try {
        let { paymentType, totalPrice, orderItems } = req.body;

        const newOrderItems = JSON.parse(orderItems)
        orderItems = newOrderItems

        // ### Upload Slip image to Cloud
        let cloudImageUrl = await upload(req.file.path)


        const newPayment = await prisma.payment.create({
            data: {
                userId: req.user.id,
                type: paymentType,
                status: 'PENDING',
                slipUrl: cloudImageUrl
            }
        })

        orderItems.map((item) => {
            delete item.product
            delete item.cartId

        })
        // console.log(orderItems)

        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                paymentId: newPayment.id,
                totalPrice: +totalPrice,
                OrderItem: {
                    create: orderItems
                }
            }
        })

        // Then Delete Cart
        for (let item of orderItems) {
            const deletedCartItem = await prisma.cartItem.delete({
                where: {
                    id: item.id
                }
            })
            console.log(deletedCartItem)
        }

        res.status(200).json({ order })

    } catch (err) {
        console.error(err)
        next(err)
        // runInNewContext(err)
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const order = await prisma.order.findFirst({
            where: {
                userId: req.user.id
            },
            include: {
                OrderItem: true
            }
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
}