const User = require('../models/UserModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const profile = async (req, res) => {
    try {
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Please login first",
                });
            }
            const user = await User.findOne({ where: { username: decoded.username } });
            res.status(200).json({
                success: true,
                message: "User fetched successfully",
                profile: {
                    id: user.id,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    createdAt: user.createdAt.toDateString(),
                }
            });
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const register = async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !username || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password.toString(), salt);

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            username,
            password: hashPassword
        })
        return res.status(200).json({
            success: true,
            message: "Register success",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }
    const isPasswordCorrect = await bcrypt.compare(password.toString(), user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "Incorrect password"
        });
    }
    try {
        jwt.sign({ username, password, userId: user.userId }, secret, {}, async (err, token) => {
            await res.cookie('token', token, {})
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to login",
                })
            }
            return res.status(200).json({
                success: true,
                message: "Login success",
            });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const resetPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Please login first",
                })
            }
            if (!oldPassword || !newPassword || !confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required"
                });
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Passwords do not match"
                });
            }
            if (oldPassword === newPassword) {
                return res.status(400).json({
                    success: false,
                    message: "New password cannot be the same as old password"
                });
            }
            if (decoded.password !== oldPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect old password"
                });
            }
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(newPassword.toString(), salt);
            await User.update({ password: hashPassword }, { where: { username: decoded.username } });
            res.status(200).json({
                success: true,
                message: "Password updated successfully"
            })
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const logout = async (req, res) => {
    try {
        jwt.verify(req.cookies.token, secret, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Please login first",
                });
            }
            await res.clearCookie('token');
            res.status(200).json({
                success: true,
                message: "Logout successful"
            });
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to logout",
            error
        })
    }
}


module.exports = {
    register,
    login,
    logout,
    resetPassword,
    profile
}
