const DocService = require("../../services/api/doc-service");

export default async function handler(req, res) {
  const { body } = req;

  const { template, params } = body;

  try {
    const documentBuffer = await DocService.generateDocumentByParams(
      template,
      params
    );

    res.send(documentBuffer);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
