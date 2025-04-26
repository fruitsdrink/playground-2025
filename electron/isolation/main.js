const { app } = require("electron");
const { createWindow } = require("./window");

app.whenReady().then(createWindow);
