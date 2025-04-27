const { app } = require("electron");
const { createWindow } = require("./window");
require("./menu");

app.on("ready", () => {
  const win = createWindow();
});
