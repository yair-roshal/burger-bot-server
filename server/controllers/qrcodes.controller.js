const QRCodesService = require("../services/qrcodes.service");

class QRCodesController {
  async getQRCodes(req, res) {
    
    console.log('QRCodesController :>> ', QRCodesController);
    
    const result = await QRCodesService.getQRCodes(req.params.restaurant_id);

    if (result) return res.status(200).send(result);
    else return res.status(500).send({ message: "error-getQRCodes" });
  }

  async saveQRCode(req, res) {
    const { restaurant_id, codeName, codeValue } = req.body;

    try {
      const result = await QRCodesService.saveQRCode(restaurant_id, codeName, codeValue);
      return res.status(201).send(result);
    } catch (error) {
      console.error("Error saving QR code:", error);
      return res.status(500).send({ message: "error-saveQRCode" });
    }
  }

  async deleteQRCode(req, res) {
    try {
      await QRCodesService.deleteQRCode(req.params.code_id);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting QR code:", error);
      return res.status(500).send({ message: "error-deleteQRCode" });
    }
  }
}

module.exports = new QRCodesController();