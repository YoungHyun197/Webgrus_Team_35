"use strict";

// 서버 가동
const app = require("../app");
const PORT = 3000;

app.listen(PORT, () =>{
  console.log(`server listening on port ${PORT}!`);
})