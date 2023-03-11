import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { UserInterface } from "../db/models/user";

dotenv.config();

interface AuthInterface extends UserInterface {
  token: String;
  expiresIn: string;
}

export class Auth {
  user: AuthInterface;
  jwtSecret: Secret;

  constructor(user: AuthInterface) {
    this.user = user;
    this.user.password = "";

    this.jwtSecret = process.env.JWT_SECRET!;
  }

  authenticate() {
    const jwtSecret: Secret = process.env.JWT_SECRET!;
    const JWT_EXPIRES_IN: number = parseInt(process.env.JWT_EXPIRES_IN_HOURS!);
    const id: string = this.user.id;

    const token = jwt.sign({ id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN_HOURS,
    });
  }
}
