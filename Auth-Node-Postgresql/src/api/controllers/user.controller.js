import { getUserProfileService, loginUserService, registerUserService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await registerUserService({ email, password });
    res.status(201).json({
      id: user.id,
      email: user.email,
      message: "User registered successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUserService({ email, password });

    
    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserProfileService(req);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user profile  ",
      error: error.message,
    });
  }
};