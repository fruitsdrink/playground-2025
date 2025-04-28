const { shell, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: 1500,
    y: 100,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  win.loadFile(path.resolve(__dirname, "index.html"));
  win.webContents.setWindowOpenHandler((details) => {
    console.log(details);
    shell.openExternal(details.url);

    // 禁用electron内置浏览器打开
    return { action: "deny" };
  });
  win.webContents.openDevTools();
  return win;
};

module.exports = { createWindow };
