exports.getAll = Model =>
    async (req, res, next) => {
        try{
            const elemts = await Model.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] }})
            if (elemts) {
                // Ordeno alfabeticamente por nombre
                elemts.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
    
                return res.status(200).json(elemts)
            } else {
                return res.status(404).json({'msg':'No hay datos'})
            }
        } catch (error) {
            console.log("🚀 ~ file: generic.controller.js:18 ~ error", error)
            res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
        }
    }

exports.getOne = Model =>
    async (req, res, next) => {
        try {
            const id = req.params.id
            let elemnt = await Model.findOne({ where: { id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
            if (elemnt) {
                return res.status(200).json({'status':200, elemnt, 'msg':'Encontrado correctamente'})
            } else {
                return res.status(404).json({'msg':'No hay datos'})
            }
        } catch (error) {
            console.log("🚀 ~ file: generic.controller.js:34 ~ error", error)
            res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
        }
    }

exports.deleteOne = Model => 
    async (req, res, next) => {
        try {
            const id = req.params.id;
            let elemnt = await Model.findByPk(id);
            if (!elemnt) {
                return res.status(404).json({msg:"Elemento no encontrado"})
            } else {
                elemnt.destroy().then(elemnt => {
                return res.status(200).json({'status':200,elemnt, 'msg':'Eliminado correctamente'})
                })
            }
        } catch (error) {
            console.log("🚀 ~ file: generic.controller.js:52 ~ error", error)
            res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
        }
    }

exports.create = Model =>
    async (req, res, next) => {
        try {
            const elemnt = await Model.create(req.body);
            if (elemnt) {
                return res.status(201).json(elemnt)
            } else {
                return res.status(404).json({'msg':'No se recibieron los datos'})
            }
        } catch (error) {
            console.log("🚀 ~ file: generic.controller.js:67 ~ error", error)
            res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
        }
    }

exports.update = Model =>
    async (req, res, next) => {
        try {
            const id = req.params.id;
            const params = req.body;
            let elemnt = await Model.findByPk(id);
            if (id) {
                elemnt.update(params).then(elemnt => {
                  res.status(201).json(elemnt)
                })
            } else {
                return res.status(404).json({msg:"Elemento no encontrado"})
            }
        } catch (error) {
            console.log("🚀 ~ file: generic.controller.js:85 ~ error", error)
            res.status(500).json({ 'msg': 'Error en el servidor, contacte con <strong>Luciano Ragusa</strong> 🙂' });
        }
    }