const jwt = require("jsonwebtoken");
const user_model = require("../resources/user/user.model")
const signIn = model => (req,res)=>{
    if (req.body.email || req.body.password){
        model.find({email:req.body.email})
        .then(user=>{
            let token = jwt.sign(req.body, 'shhhhh');
            res.status(400).send({"message": token})
        })
        .catch(err => res.status(200).json({"message": "User not autenticated"}) )
    
}
}

const signUp = model => async (req, res) => {
    model.create({email: req.body.email,password: req.body.password})
    .then(res.status(200).json({"message":"user signed up"}))
    .catch(res.status(404).end())
}

// const verifyToken = async (req, res) => {
//     let token = req.headers["authorization"].split(" ")[1];
//     req.token = token;
// }
let verifyToken = token => new Promise((resolve, reject) => {
    jwt.verify(token, "shhhhh", (err, payload) => {
      if (err) return res.status(401).end()
      console.log("payload: ",payload);
      resolve(payload)
      
    })
  })
const protect = model => async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
      return res.status(401).end()
    }
    let token = req.headers["authorization"].split(" ")[1];
    console.log("Token: ",token);
    let payload
    try {
        payload = await verifyToken(token);
        console.log("Payload: ",payload);

    }
      catch (e) {
        return res.status(401).end()
      }
    console.log("Payload: ",payload);
    const user = model.findOne({"email":payload.email})
      .select('-password')
      .lean()
      .exec()
  
    if (!user) {
      return res.status(401).end()
    }
  
    req.user = user
    next()
    // console.log("hello world");
    // return next()
}


const authControllers = model => {
    return ({
        "signIn": signIn(model),
        "signUp": signUp(model),
    });
}
exports.protect = protect(user_model);
exports.authControllers = authControllers;