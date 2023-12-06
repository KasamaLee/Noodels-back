const prisma = require('../models/prisma')
const { upload } = require('../utils/cloudinary-service')

exports.addProduct = async (req, res, next) => {
    try {
        const { name, price, stockQuantity } = req.body;

        // Upload Image File to Cloudinary
        let cloudinaryImageUrl = await upload(req.file.path)
        console.log(req.file.path)

        const product = await prisma.product.create({
            data: {
                name: name,
                price: +price,
                stockQuantity: +stockQuantity,
                imageUrl: cloudinaryImageUrl
            }
        });

        res.status(200).json({ product })
    } catch (err) {
        console.error(err); // Log the error for server-side inspection.
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
        const { name, price, stockQuantity } = req.body;

        const newProductData = {
            name: name,
            price: +price,
            stockQuantity: +stockQuantity
        }

        if (req.file) {
            let cloudinaryImageUrl = await upload(req.file.path)
            newProductData.imageUrl = cloudinaryImageUrl;
        }

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