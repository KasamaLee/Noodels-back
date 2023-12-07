const prisma = require('../models/prisma')

exports.addToCart = async (req, res, next) => {
    try {
        const { userId, CartItem } = req.body;

        const cart = await prisma.cart.create({
            data: {
                userId: userId,
                CartItem: {
                    create: [
                        ...CartItem
                    ]
                }
            }
        })

        console.log(CartItem)
        res.status(200).json({ cart })

    } catch (err) {
        console.log(err)
        next(err)
    }
}