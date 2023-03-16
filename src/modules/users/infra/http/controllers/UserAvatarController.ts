import { Request, Response } from "express";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { instanceToInstance } from "class-transformer";
import { container } from "tsyringe";

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file?.filename
    });

    return response.json(instanceToInstance(user));
  }
}
