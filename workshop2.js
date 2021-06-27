const express = require("express");
const app = express();
const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function sleep(time, callback) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {}
  callback();
}

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/block", (req, res) => {
  const end = Date.now() + 10000;

  while (Date.now() < end) {
    const doSomeThingHeavyInJavaScript = 1 + 2 + 3;
  }
  res.end("I am done!");
});

app.get("/non-block", (req, res) => {
  //   res.end("authen2");

  setTimeout(() => res.send("non-block ==> I am done!"), 5000);
});
