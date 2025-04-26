const { BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: 1500,
    y: 100,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      contextIsolation: false // 关闭上下文隔离
    }
  });

  win.webContents.openDevTools();
  win.loadFile(path.resolve(__dirname, "index.html"));
};

module.exports = { createWindow };
