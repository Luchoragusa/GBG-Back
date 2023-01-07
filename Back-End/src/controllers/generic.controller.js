exports.getAll = Model =>
    async (req, res, next) => {
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
    }

exports.getOne = Model =>
    async (req, res, next) => {
        const id = req.params.id
        let elemnt = await Model.findOne({ where: { id: id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        if (elemnt) {
            return res.status(200).json({'status':200, elemnt, 'msg':'Encontrado correctamente'})
        } else {
            return res.status(404).json({'msg':'No hay datos'})
        }
    }

exports.deleteOne = Model => 
    async (req, res, next) => {
        const id = req.params.id;
        let elemnt = await Model.findByPk(id);
        if (!elemnt) {
            return res.status(404).json({msg:"Elemento no encontrado"})
        } else {
            elemnt.destroy().then(elemnt => {
            return res.status(200).json({'status':200,elemnt, 'msg':'Eliminado correctamente'})
            })
        }
    }

exports.create = Model =>
    async (req, res, next) => {
        const elemnt = await Model.create(req.body);
        if (elemnt) {
            return res.status(201).json({elemnt})
        } else {
            return res.status(404).json({'msg':'No se recibieron los datos'})
        }
    }

exports.update = Model =>
    async (req, res, next) => {
        const params = req.body;
        let elemnt = await Model.findByPk(id);
        if (id) {
            elemnt.update(params).then(elemnt => {
              res.status(201).json({status:201,elemnt, 'msg':'Editado correctamente'})
            })
        } else {
            return res.status(404).json({msg:"Elemento no encontrado"})
        }
    }