import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import CreateSessionsService from "@modules/users/services/CreateSessionsService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSessionService = new CreateSessionsService();

    const user = await createSessionService.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user))
  }
}
