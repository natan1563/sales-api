import { Request, Response } from "express";
import ListUserService from "@modules/users/services/ListUserService";
import CreateUserService from "@modules/users/services/CreateUserService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";

export default class UsersController {
  public async index(_: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);
    const users = await listUserService.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createUserService = container.resolve(CreateUserService);
    const createdUser = await createUserService.execute(request.body);

    return response
            .status(201)
            .json(instanceToInstance(createdUser));
  }
}
