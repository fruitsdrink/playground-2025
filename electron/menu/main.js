const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const { createWindow } = require("./window");
const { createMenu } = require("./menu");

app.whenReady().then(() => {
  const win = createWindow();
  createMenu(win);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (
    BrowserWindow.getAllWindows().length === 0 &&
    process.platform === "darwin"
  ) {
    createWindow();
  }
});

ipcMain.on("contextmenu", (event) => {
  const template = [
    {
      label: "退出",
      click: () => {
        app.quit();
      }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup({ window: win });
});
