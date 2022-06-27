const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const ObjectUtils = require("../../utils/object");

module.exports = {
  async generateDocumentByParams(template, params) {
    if (!template || ObjectUtils.isEmptyOrNull(params)) {
      throw new Error("Missing payload data!");
    }

    try {
      const content = fs.readFileSync(
        `public/static/${template}.docx`,
        "binary"
      );

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.render(params);

      const base64 = doc.getZip().generate({
        type: "base64",
      });

      return base64;
    } catch (error) {
      console.log(error.message);
      throw new Error("Something went wrong!");
    }
  },
};
