import express from "express";
import { boardRouter } from "./infrastructure/router";

const app = express();

app.use(boardRouter);

app.get("/", (_request, response) => {
  return response.json({
    message: "Hello World",
    port: process.env.PORT,
  });
});

app.listen(Number(process.env.PORT), () => {
  console.log(`listen on ${process.env.PORT} PORT`);
});

export default app;
