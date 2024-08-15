import { Request, Response } from 'express';
import GroupsService from '../services/groups.service';

class GroupsController {
  async getGroups(req: Request, res: Response): Promise<Response> {
    const result = await GroupsService.getGroups(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getGroups" });
  }

  async createGroup(req: Request, res: Response): Promise<Response> {
    const result = await GroupsService.createGroup(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-createGroup" });
  }

  async updateGroup(req: Request, res: Response): Promise<Response> {
    const result = await GroupsService.updateGroup(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-updateGroup" });
  }

  async deleteGroup(req: Request, res: Response): Promise<Response> {
    const result = await GroupsService.deleteGroup(req, res);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-deleteGroup" });
  }
}

export default new GroupsController();