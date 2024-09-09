import { Request, Response, NextFunction, response } from "express";
import { userSignupValidator } from "../Validator/SignUpValidator";
import { ObjectId } from "mongodb";
import { collections } from "../Services/database.service";
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { MongoError } from "mongodb";
import * as bcrypt from "bcrypt";
import { IUser, User, UserRole } from "../Models/Auth/userModel";
import * as jwt from "jsonwebtoken";
import { ResponseInfo } from "../Helpers/Response";
import { logger } from "../../logger";

//Method to register a user
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, confirmPassword, ...sanitizedData } = req.body;

    logger.info("RegisterUser function called with request data", {
      requestData: sanitizedData,
    });

    const newUser = req.body as IUser;
    const email = newUser.email as string;

    // Check whether email exists or not
    const user = await collections.users?.findOne({ email });
    logger.info("Checked for existing user", { email, userExists: !!user });

    if (user) {
      logger.warn("User registration failed, email already exists", { email });
      const jsonResponse = {
        responseCode: ResponseInfo.UserExists.code,
        responseMessage: ResponseInfo.UserExists.description,
        data: null,
      };
      return res.status(400).json(jsonResponse);
    }

    // Hash password
    logger.info("Hashing user password");
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    // Save user to db
    logger.info("Saving new user to the database", { email });
    newUser.password = hashedPassword;
    newUser.salt = salt;
    newUser.dateCreated = new Date();
    newUser.role = UserRole.User;
    const result = await collections.users?.insertOne(newUser);

    const response = result
      ? {
          responseCode: ResponseInfo.Success.code,
          responseMessage: ResponseInfo.Success.description,
          data: result,
        }
      : {
          responseCode: ResponseInfo.Failed.code,
          responseMessage: ResponseInfo.Failed.description,
          data: null,
        };

    logger.info("User registration process completed", {
      email,
      success: !!result,
    });
    res.status(response ? 200 : 400).json(response);
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error occurred during user registration", {
        error: error.message,
      });
    } else {
      logger.error("Unknown error occurred during user registration");
    }
    return res.status(500).json({
      responseCode: ResponseInfo.SystemMalfunction.code,
      responseMessage: ResponseInfo.SystemMalfunction.description,
    });
  }
};

// Method to log user in
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  let email: string | undefined;
  try {
    email = req.body.email;
    const { password } = req.body;
    logger.info("LoginUser function called with request data", { email });

    const secret_key = process.env.SECRET_KEY as string;

    const user = await collections.users?.findOne({ email });
    logger.info("Checked for existing user", { email, userExists: !!user });

    if (!user) {
      logger.warn("Login failed: Invalid user", { email });
      const jsonResponse = {
        responseCode: ResponseInfo.InvalidUser.code,
        responseMessage: ResponseInfo.InvalidUser.description,
        data: null,
      };
      return res.status(401).json(jsonResponse);
    }

    // Check if the provided password matches the stored password
    const passwordMatch = await bcrypt.compare(password, user.password);
    logger.info("Password comparison completed", { email, passwordMatch });

    if (!passwordMatch) {
      logger.warn("Login failed: Invalid password", { email });
      const jsonResponse = {
        responseCode: ResponseInfo.InvalidCredentials.code,
        responseMessage: ResponseInfo.InvalidCredentials.description,
        data: null,
      };
      return res.status(401).json(jsonResponse);
    }

    // Generate a JWT token if the password matches
    const token = jwt.sign({ userId: user._id, role: user.role }, secret_key, {
      expiresIn: "30m",
    });

    const response = token
      ? {
          responseCode: ResponseInfo.Success.code,
          responseMessage: ResponseInfo.Success.description,
          data: token,
        }
      : {
          responseCode: ResponseInfo.Failed.code,
          responseMessage: ResponseInfo.Failed.description,
          data: null,
        };

    logger.info("Login process completed", {
      email,
      success: !!token,
      responseCode: response.responseCode,
    });

    // Respond with the token or failure message
    res.status(token ? 200 : 400).json(response);
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error occurred during login process", {
        email,
        error: error.message,
      });
    } else {
      logger.error("Unknown error occurred during login process", { email });
    }
    return res.status(500).json({
      responseCode: ResponseInfo.SystemMalfunction.code,
      responseMessage: ResponseInfo.SystemMalfunction.description,
    });
  }
};

export { registerUser, loginUser };
