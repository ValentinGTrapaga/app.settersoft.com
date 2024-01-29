const fs = require("fs");
const mammoth = require("mammoth");

/** @param {string} filePath
 * @returns {Promise<string>}
 */
async function extractTextFromDocx(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      mammoth
        .extractRawText({ path: filePath })
        .then((result) => resolve(result.value))
        .catch(reject);
    });
  });
}

module.exports = { extractTextFromDocx };
