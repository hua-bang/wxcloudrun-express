const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 更新计数
app.post("/api/count", async (req, res) => {
  res.send({
    code: 0,
    data: 20,
  });
});

// 获取计数
app.get("/api/count", async (req, res) => {
  res.send({
    code: 0,
    data: 21,
  });
});

app.get("/api/test", async(req, res) => {
  res.send({
    code: 0,
    data: '123'
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

const port = process.env.PORT || 80;

async function bootstrap() {
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
