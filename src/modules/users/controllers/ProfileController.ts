import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import { instanceToInstance } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfileService = new ShowProfileService();
    const user_id = request.user.id;
    const user = await showProfileService.execute({user_id})

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;
    const updateProfileService = new UpdateProfileService();

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
