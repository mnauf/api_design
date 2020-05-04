const createOne = model => async (req, res) => {
    model.create({firstName: req.body.firstName,lastName: req.body.lastName})
    .then(res.status(200).json({"message":"user added"}))
    .catch(res.status(404).end())
}
const read = model => async (req, res) => {
    model.find({"lastName":req.body.lastName}, function(err,user){
        res.status(200).json({"data":user})
    })
}

exports.createOne = createOne;
exports.read = read;

const crudControllers = model => {
    return ({
        "createOne": createOne(model),
        "read": read(model)
    });
}

exports.crudControllers = crudControllers;