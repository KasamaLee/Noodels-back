const prisma = require('../models/prisma')

exports.addToCart = async (req, res, next) => {
    try {

        const existingCart = await prisma.cart.findFirst({
            where: {
                userId: req.user.id
            }
        })
        // console.log(existingCart)


        const CartItem = req.body;
        // console.log( CartItem )
        // { productId: 6, quantity: 1, price: 18 }

        if (existingCart) {
            const NewCartItem = await prisma.cartItem.create({
                data: {
                    cartId: existingCart.id,
                    productId: CartItem.productId,
                    quantity: CartItem.quantity,
                    price: CartItem.price
                }
            })

            const updatedCart = await prisma.cart.findUnique({
                where: {
                    id: existingCart.id
                },
                include: {
                    CartItem: true
                }
            })
            return res.status(200).json({ updatedCart })

        } else {
            const newCart = await prisma.cart.create({
                data: {
                    userId: req.user.id,
                    CartItem: {
                        create: CartItem
                    }
                }
            })
            return res.status(200).json({ newCart })
        }

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.updateQuantity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { quantity, price } = req.body
        console.log(quantity, price)

        const updatedCart = await prisma.cartItem.update({
            where: {
                id: +id
            },
            data: {
                quantity: +quantity,
                price: +price
            }
        })

        return res.status(200).json({updatedCart})

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCartItem = await prisma.cartItem.delete({
            where: {
                id: +id
            }
        })

        res.status(200).json({ deletedCartItem })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getCart = async (req, res, next) => {
    try {

        const cart = await prisma.cart.findFirst({
            where: {
                userId: req.user.id
            },
            include: {
                CartItem: {
                    include: {
                        product: true
                    }
                }
            }
        })

        res.status(200).json({ cart })

    } catch (err) {
        console.log(err)
        next(err)
    }
}