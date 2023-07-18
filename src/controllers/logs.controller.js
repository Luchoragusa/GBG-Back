const { Log, User, AutoPart, CarBrand, PartBrand, PartType } = require('../database/models/index')


const getLogs = async (req, res) => {
    try {
        await Log.findAll({
            include: [{
                model: User,
                attributes: ['name', 'surname']
            }, {
                model: AutoPart,
                attributes: ['partModel', 'serialNumber'],
            }, {
                model: CarBrand,
                attributes: ['name'],
            }, {
                model: PartBrand,
                attributes: ['name'],
            }, {
                model: PartType,
                attributes: ['name'],
            }], 
            order : [['id', 'DESC']]
        }).then((logs) => { 
            if (!logs) { return res.status(404).json({ message: 'No hay logs' }) }
            return res.status(200).json(logs)
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

module.exports = { getLogs }