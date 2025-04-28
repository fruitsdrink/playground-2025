const { app, ipcMain, dialog, BrowserWindow } = require("electron");
const { createWindow } = require("./window");
require("./menu");
const fs = require("fs");

app.on("ready", () => {
  const win = createWindow();
});

ipcMain.handle("select-file", async () => {
  const res = await dialog.showOpenDialog({
    title: "选择图片文件",
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "图片", extensions: ["jpg", "png", "gif"] }],
  });
  return res.filePaths;
});

ipcMain.on("save-file", (event, content) => {
  dialog
    .showSaveDialog({
      title: "保存文件",
      defaultPath: "untitled.txt",
      filters: [{ name: "文本文件", extensions: ["txt"] }],
    })
    .then((res) => {
      if (res.filePath && !res.canceled) {
        fs.writeFileSync(res.filePath, content);
        const win = BrowserWindow.fromWebContents(event.sender);
        win.webContents.send("file-saved");
      }
    });
});
