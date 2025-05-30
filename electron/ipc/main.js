const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { createMenu } = require("./menu");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: 1500,
    y: 100,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js")
    }
  });
  win.webContents.openDevTools();
  win.loadFile(path.resolve(__dirname, "index.html"));

  createMenu(win);
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("saveFile", (event, ...args) => {
  console.log("收到saveFile消息了", { event, ...args });
});

ipcMain.on("openFile", (event, ...args) => {
  console.log("主进程收到openFile消息了", { event, ...args });
  BrowserWindow.fromWebContents(event.sender).webContents.send(
    "openFile",
    "主进程处理完了"
  );
});

ipcMain.handle("selectFile", async (event, ...args) => {
  console.log("主进程收到selectFile消息了", { event, ...args });
  const ret = await dialog.showOpenDialog({
    properties: ["openFile"]
  });
  return ret.filePaths[0];
});
