const {AutoPart, PartType, PartBrand, CarBrand} = require('../database/models/index');
const sequelize = require('../database/models/index').sequelize;

exports.getTotal = async (req, res, next) => {
  try{
    const models = [AutoPart, PartType, PartBrand, CarBrand];
    let totalObj = [];

    await Promise.all(models.map(async (model) => {
      const tot = await model.count();
      const obj = {
        model: model.name,
        total: tot
      };
      totalObj.push(obj);
    }));
    
    res.status(200).json(totalObj);
  } catch (error) {
      console.log("🚀 ~ file: autoPart.controller.js:21 ~ exports.getTotal= ~ error", error)
      res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
  }
}