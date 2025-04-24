const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    x: 1500,
    y: 100,
  });

  // 如果是开发模式， 打开调试工具
  mainWindow.webContents.openDevTools();

  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
});
