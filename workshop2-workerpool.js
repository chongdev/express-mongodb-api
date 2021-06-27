const express = require("express");
const app = express();
const port = 3000;

var workerpool = require("workerpool");
var pool = workerpool.pool();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function sleep(time, callback) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {}
  callback();
}

function blockWork() {
  const end = Date.now() + 10000;
  while (Date.now() < end) {
    const doSomeThingHeavyInJavaScript = 1 + 2 + 3;
  }
}

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/block", (req, res) => {
  pool
    .exec(blockWork, [])
    .then(() => {
      res.end("I am done!");
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      pool.terminate();
    });
});

app.get("/non-block", (req, res) => {
  //   res.end("authen2");

  setTimeout(() => res.send("non-block ==> I am done!"), 5000);
});
