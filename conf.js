const mediaFiles = ["Media_1", "Media_2"];
const edgeBuckets = [
  {
    id: 1,
    bucket: "higherlayer",
    port: 3002,
  },
  {
    id: 2,
    bucket: "higherlayer1",
    port: 3003,
  },
];

module.exports = {
  mediaFiles: mediaFiles,
  edgeBuckets: edgeBuckets,
};
