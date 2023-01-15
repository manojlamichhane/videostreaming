const cors = require("cors");
const spdy = require("spdy");
const express = require("express");
const fs = require("fs");
const app = express();
const controller = require("../controller");
const configurables = require("../conf");

app.use(cors());

app.get("/", (req, res) => {
  configurables.edgeBuckets.map((item) => {
    configurables.mediaFiles.map((media) => {
      controller.uploadFiles(item.bucket, media);
    });
  });
  res.send("Origin server running");
});

app.get("/media/:id", async (req, res) => {
  try {
    const range = "bytes = 0 -";
    if (!range) {
      res.status(400).send("Requires Range header");
    }
    console.log("Main Server called");
    edgeBuckets.map((item) => {
      uploadFiles(item.bucket, `Media_${req.params.id}`);
    });

    const videoPath = `./Media/Media_${req.params.id}.mp4`;
    const videoSize = fs.statSync(`./Media/Media_${req.params.id}.mp4`).size;
    const CHUNK_SIZE = 10 ** 7;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    console.log("Unable to fetch", err);
  }
});

spdy
  .createServer(
    {
      key: fs.readFileSync("./server.key"),
      cert: fs.readFileSync("./server.crt"),
    },
    app
  )
  .listen(3001, (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log("Main server listening on port 3001");
  });
