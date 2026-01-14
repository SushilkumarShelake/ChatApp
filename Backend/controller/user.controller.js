import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js"
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exist" });
        }
        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await new User({
            name,
            email,
            password: hashedPassword,

        });
        await newUser.save()
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(201).json({
                message: "User registered Suceessfully", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        // ✅ Check if user exists first before comparing password
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        createTokenAndSaveCookie(user._id, res);
        res.status(201).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "User Loged out successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
}

//geting the user from database
export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(201).json({filteredUsers  })
    } catch (error) {
        console.log("Error in allUsers Controller:" + error);
        res.status(500).json({ message: "Server error" })

    }
}