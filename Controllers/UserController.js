const users = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');

exports.userRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            res.status(406).json('User Alredy Existing... ')
        } else {
            const newUser = new users({
                username, email, password, userProfile: "",
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        console.log("Error in controller/userController/userRegistration::::::::");
        res.status(401).json(err)
    }
}

// UserLogin

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email, password });
        if (existingUser) {
            const token = jwt.sign({ UserId: existingUser._id }, process.env.JWT_SECRETKEY)
            res.status(200).json({ token, existingUser });
        } else {
            res.status(406).json('Invalid email/password')
        }
    } catch (err) {
        console.log('Error at controller/userController/userLogin::::::');
        res.status(401).json(err)
    }
}

exports.getuserProfile = async (req, res) => {
    const UserId = req.payload;
    try {
        const userProfileDetails = await users.findById(UserId);
        res.status(200).json(userProfileDetails)
    } catch (err) {
        console.log('Error at controller/userController/getuserProfile::::::');
        res.status(401).json(err);
    }
}

exports.editUserProfile = async (req, res) => {
    const { username, email } = req.body;
    const UserId = req.payload;

    try {
        const currentUser = await users.findById(UserId);
        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            const newprofilePic = req.file ? req.file.filename : currentUser.userProfile;
            const updatedProfile = await users.findByIdAndUpdate(UserId, {
                username, email, userProfile: newprofilePic
            }, { new: true });
            res.status(200).json(updatedProfile);
        }

    } catch (err) {
        console.log('Error at controller/userController/getuserProfile::::::');
        res.status(401).json(err);
    }
}
