import { Request, Response } from "express";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";
import { instanceToInstance } from 'class-transformer';
import { container } from "tsyringe";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfileService = container.resolve(ShowProfileService);
    const user_id = request.user.id;
    const user = await showProfileService.execute({user_id})

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateProfileService = container.resolve(UpdateProfileService);

    const updatedUser = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });

    return response.json(instanceToInstance(updatedUser));
  }
}
