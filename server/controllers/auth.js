const bcrypt = require("bcryptjs");
const users = [];

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        const authenticId = bcrypt.compareSync(password, users[i].passwordHash);
        if (authenticId) {
          let userToReturn = { ...users[i] };
          delete userToReturn.passwordHash;
          res.status(200).send(userToReturn);
          return;
          // If no return statement the code will move on to execute the next line (res.status(400).)
          //because it is a for loop we are using (and they are within the same block), after it finishes
          // it usually executes the next line,but since we use 'return' statement it stops
          // itexcecuting codes, because 'return' statment stops the following codes from beong
          // run/exceuted within the same block.
        }
      }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);
    let userObj = {
      username,
      email,
      firstName,
      lastName,
      passwordHash,
    };
    users.push(userObj);
    let userToReturn = { ...userObj };
    //delete userToReturn.passwordHash;
    res.status(200).send(userToReturn);
    console.log("Registering User");
    //console.log(users);
    console.log(userObj);
  },
};
