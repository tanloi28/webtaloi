import UserModel from "../models/UserModel.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const useExists = await UserModel.findOne({ email });
		console.log(useExists);
		if (useExists) {
			return res.status(400).json({
				message: "Email da ton tai",
			});
		}

		// Sửa lại đoạn này
		const hashPass = hashPassword(password);
		if (!hashPass) {
			return res.status(400).json({
				message: "Ma hoa mat khau that bai!",
			});
		}

		const user = await UserModel.create({
			email,
			password: hashPass,
		});

		user.password = undefined;

		return res.status(201).json({
			success: true,
			user,
			message: "Dang ky thanh cong!",
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const useExists = await UserModel.findOne({ email });
		console.log(useExists);
		if (!useExists) {
			return res.status(404).json({
				message: "Email chua dang ky!",
			});
		}

		const isMatch = comparePassword(password, useExists.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "Mat khau khong dung!",
			});
		}

		const token = generateToken({ _id: useExists._id }, "100d");
		useExists.password = undefined;

		return res.status(200).json({
			success: true,
			user: useExists,
			accessToken: token,
			message: "Login successfully!",
		});
	} catch (error) {
		next(error);
	}
};
