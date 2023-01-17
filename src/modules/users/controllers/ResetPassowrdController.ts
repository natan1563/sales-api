import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";


export default class ResetPassowrdController {
  public async create(request: Request, response: Response): Promise<Response | undefined> {
    const { token, password } = request.body;
    const sendForgotPasswordEmail = new ResetPasswordService();
    await sendForgotPasswordEmail.execute({
      token,
      password
    })

    return response.status(204).json();
  }
}
