const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');
const User = require('../models/user.model');

exports.login = async (req, res) => {
    console.log("Login user", req.body);

    try {

        const username = req.body.username;
        const password = req.body.password;

        const result = await User.findOne({ username: username }, {username: 1, password:1, email: 1, roles: 1});
        const isMatch = await bcrypt.compare(password, result.password);

        if (result && result.username === username && isMatch) {
            const token = authService.generateAccessToken(result)
            res.status(200).json({ status: true, data: token });
            console.log('User logged in');
        } else {
          res.status(400).json({ status: false, data: "user not fount" });
        }
        
    } catch (err) {
        res.status(400).json({ status: false, data: err });
        console.log(`Problem in logging user: ${err}`)
    }
};

exports.googleLogin = async (req, res) => {
  const code = req.query.code;  // Get the authorization code from the query
  if (!code) {
    res.status(400).json({ status:false,  data: 'Authorization code missing' });
  } else {
    let user = await authService.googleAuth(code)
    if (user) {
      // console.log(">>>", user);
      // res.status(200).json({status: true, data: user});
    const frontendRedirectUrl = `http://localhost:4200/login?token=${user}`;
    return res.redirect(frontendRedirectUrl);
      res.redirect()
    } else {
      res.status(400).json({status: false, data: "Problem in logging with user"});
    }
  }
}
