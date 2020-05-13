const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const user_model = require("../resources/user/user.model")
const signIn = model => async (req, res) => {
  if (req.body.email || req.body.password) {
    model.findOne({ email: req.body.email })
      .then(user => {
        bcrypt.compare(req.body.password, user.password)
          .then(result => {// result == true
            console.log("result: ", result);
            if (result == true) {
              let token = jwt.sign(req.body, 'shhhhh');
              res.status(200).send({ "message": token })
            }
            else res.status(400).json({ "message": "user not authenticated" })
          })
      })

      .catch(err => res.status(200).json({ "message": "User not autenticated" }))

  }
}

const signUp = model => async (req, res) => {
  if (req.body.email || req.body.password) {
    let hashed_password = await bcrypt.hash(req.body.password, 10);
    // Store hash in your password DB.
    model.create({ email: req.body.email, password: hashed_password })
      .then(user => {
        // user.password = hash;
        console.log("Hashed password: ", hashed_password)
        console.log(user)
        return res.status(200).json({ "message": "user signed up" })
      }
      )
      .catch(err => {
        return res.status(404).send({ "message": "Couldn't create user" })
      })
  }
  else return res.status(400).send({ "message": "Either email or password is not entered" })
}

let verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, "shhhhh", (err, payload) => {
    if (err) return res.status(401).end()
    console.log("payload: ", payload);
    resolve(payload)

  })
})
const protect = model => async (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }
  let token = req.headers["authorization"].split(" ")[1];
  console.log("Token: ", token);
  let payload
  try {
    payload = await verifyToken(token);
    console.log("Payload: ", payload);

  }
  catch (e) {
    return res.status(401).end()
  }
  console.log("Payload: ", payload);
  const user = await model.findOne({ "email": payload.email })
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