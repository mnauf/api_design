const createOne = model => async (req, res) => {
    console.log("request from: ",req.user);
    model.create({firstName: req.body.firstName,lastName: req.body.lastName})
    .then(res.status(200).json({"message":"user added"}))
    .catch(res.status(404).end())
}
const read = model => async (req, res) => {
    console.log("request from: ",req.user);
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