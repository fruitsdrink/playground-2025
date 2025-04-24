const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    x: 1500,
    y: 100,
    frame: false,
    transparent: true
  });

  // 如果是开发模式， 打开调试工具
  // mainWindow.webContents.openDevTools();

  // 设置窗口的纵横比为1:1
  mainWindow.setAspectRatio(1);

  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
