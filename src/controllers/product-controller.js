const prisma = require('../models/prisma')
const { upload } = require('../utils/cloudinary-service')

exports.addProduct = async (req, res, next) => {
    try {
        const { name, price, stockQuantity, desc, categoryId } = req.body;

        const newProductData = {
            name: name,
            price: +price,
            stockQuantity: +stockQuantity,
            desc: desc || null,
            countryId: +categoryId || null
        }

        if (req.file) {
            let cloudinaryImageUrl = await upload(req.file.path)
            newProductData.imageUrl = cloudinaryImageUrl;
        }
        console.log(newProductData)

        const product = await prisma.product.create({
            data: newProductData
        });

        res.status(200).json({ product })
    } catch (err) {
        console.log(err); // Log the error for server-side inspection.
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const allProducts = await prisma.product.findMany()
        return res.status(200).json({ allProducts })
    } catch (err) {
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, stockQuantity, desc, categoryId } = req.body;

        const newProductData = {
            name: name,
            price: +price,
            stockQuantity: +stockQuantity,
            desc: desc || null,
            countryId: +categoryId || null
        }

        if (req.file) {
            let cloudinaryImageUrl = await upload(req.file.path)
            newProductData.imageUrl = cloudinaryImageUrl;
        }
        // console.log(newProductData)

        const updatedProduct = await prisma.product.update({
            where: {
                id: +id
            },
            data: newProductData
        })

        res.status(200).json({ updatedProduct })
    } catch (err) {
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedProduct = await prisma.product.delete({
            where: {
                id: +id
            }
        })
        res.status(200).json({ deletedProduct })

    } catch (err) {
        next(err)
    }
}