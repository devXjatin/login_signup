const User = require("../model/user");
const { options } = require("../routes");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });

    //user exists
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    user = await User.create({ username, email, password });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Register Successfull",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//login user
exports.login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    // user not exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invaild Credentials",
      });
    }

    let token = user.generateToken();
    const options = {
      httpOnly: true,
    };
    token = "Bearer " + token;
    res.status(200).cookie("token",token, options).json({
      success: true,
      user,
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
