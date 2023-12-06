const prisma = require('../models/prisma')

exports.addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const category = await prisma.country.create({
            data: {
                name: name
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