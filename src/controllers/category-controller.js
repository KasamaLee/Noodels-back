const prisma = require('../models/prisma')

exports.addCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.body;

        const category = await prisma.country.create({
            data: {
                name: categoryName
            }
        });

        res.status(200).json({ category })

    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getCategory = async (req, res, next) => {
    try {
        const allCategory = await prisma.country.findMany()
        res.status(200).json({ allCategory })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;

        const updatedCategory = await prisma.country.update({
            where: {
                id: +id
            },
            data: {
                name: categoryName
            }
        })
        res.status(200).json({ updatedCategory })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCategory = await prisma.country.delete({
            where: {
                id: +id
            }
        })
        res.status(200).json({ deletedCategory })
    } catch (err) {
        console.log(err)
        next(err)
    }
}