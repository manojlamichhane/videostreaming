const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "massive-tensor-368120",
  keyFilename: "./key.json",
});

exports.uploadFiles = (buc, media) => {
  const bucket = storage.bucket(buc);
  const file = bucket.file(`${media}.mp4`);
  file.exists((err, exists) => {
    if (!exists) {
      console.log(`Intiating ${media}.mp4 upload to ${buc}`);
      fs.createReadStream(`./Media/${media}.mp4`)
        .pipe(file.createWriteStream())
        .on("error", function (err) {
          res.send(`error in uploading ${media}.mp4 file to ${buc}`);
        })
        .on("finish", function () {
          console.log(`${media}.mp4 uploaded to ${buc}`);
        });
    } else {
      console.log(`${media}.mp4 already exists in ${buc}`);
    }
  });
};
