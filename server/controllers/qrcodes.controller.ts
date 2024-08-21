import { Request, Response } from "express"
import QRCodesService from "../services/qrcodes.service"

class QRCodesController {
  async getQRCodes(req: Request, res: Response): Promise<Response> {
    // console.log('QRCodesController :>> ', QRCodesController);

    const result = await QRCodesService.getQRCodes(req.params.restaurant_id)

    if (result) return res.status(200).send(result)
    else return res.status(500).send({ message: "error-getQRCodes" })
  }

  async saveQRCode(req: Request, res: Response): Promise<Response> {
    const { restaurant_id, codeName, codeValue, qrColor } = req.body
    console.log(
      "QRCodesController : restaurant_id, codeName, codeValue, qrColor  :>> ",
      restaurant_id,
      codeName,
      codeValue,
      qrColor
    )
    try {
      const result = await QRCodesService.saveQRCode(
        restaurant_id,
        codeName,
        codeValue,
        qrColor
      )
      return res.status(201).send(result)
    } catch (error) {
      console.error("Error saving QR code:", error)
      return res.status(500).send({ message: "error-saveQRCode" })
    }
  }

  async deleteQRCode(req: Request, res: Response): Promise<Response> {
    try {
      const codeId = parseInt(req.params.code_id, 10) // Преобразуем строку в число
      if (isNaN(codeId)) {
        return res.status(400).send({ message: "Invalid code_id" })
      }

      await QRCodesService.deleteQRCode(codeId)
      return res.status(204).send()
    } catch (error) {
      console.error("Error deleting QR code:", error)
      return res.status(500).send({ message: "error-deleteQRCode" })
    }
  }
}

export default new QRCodesController()
