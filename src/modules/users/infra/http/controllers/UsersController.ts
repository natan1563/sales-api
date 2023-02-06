import { Request, Response } from "express";
import ListUserService from "@modules/users/services/ListUserService";
import CreateUserService from "@modules/users/services/CreateUserService";
import { instanceToInstance } from "class-transformer";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = new ListUserService();
    const users = await listUserService.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = new CreateUserService();
    const createdUser = await createUserService.execute(request.body);

    return response
            .status(201)
            .json(instanceToInstance(createdUser));
  }
}
