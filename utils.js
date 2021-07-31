let { writeFile } = require('fs');
let { join } = require('path');
let blend = require('@mapbox/blend');

// merge images
function mergeImages(firstBody, secondBody, dimention) {
    
    return new Promise((resolve, reject) => {
        try {
            blend(
                [
                  {
                    buffer:  Buffer.from(firstBody, "binary"),
                    x: 0,
                    y: 0,
                  },
                  {
                    buffer: Buffer.from(secondBody, "binary"),
                    x: dimention.width,
                    y: 0,
                  },
                ],
                {
                  width: dimention.width * 2,
                  height: dimention.height,
                  format: "jpeg",
                },
                (err, data) => {
                  const image_name = Math.floor(Math.random() * 90000) + 10000;
                  const fileOut = join(
                    process.cwd(),
                    `${process.env.IMAGE_SAVE_LOCATION}/${image_name}.jpg`
                  );
                  writeFile(fileOut, data, "binary", (err) => {
                    if (err) {
                      console.log(err);
                      reject(err);
                    }
                    console.log("File Saved Successfully")
                    resolve("File Saved");
                  });
                }
              );
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { mergeImages };
