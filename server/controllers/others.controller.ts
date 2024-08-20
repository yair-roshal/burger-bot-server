// controllers/others.controller.ts
import { Request, Response } from "express"
import OthersService from "../services/others.service"

class OthersController {
  async sendSMSTele(req: Request, res: Response, bot: any): Promise<Response> {
    const result = await OthersService.sendSMSTele(req, res, bot)

    // убрал result , но наверно весь сервис не нужен
    // console.log("OthersService.sendSMSTele_result :>> ", result)
    if (result) return res.status(200)
    // if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getTypes" })
  }
}

export default new OthersController()
