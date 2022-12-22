import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService();
    const createdUser = await createUserService.execute(request.body);

    return response
            .status(201)
            .json(createdUser);
  }
}
