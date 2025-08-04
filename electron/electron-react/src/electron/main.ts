import { app, BrowserWindow } from "electron";
import { ipcMainHandle, ipcMainOn, isDev } from "./util.js";
import { getStaticData, pollResource } from "./resource-manager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
// import { getPreloadPath } from "./pathResolver";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: false,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResource(mainWindow);

  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });

  ipcMainOn("sendFrameAction", (action) => {
    console.log({ action });
    switch (action) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
    }
  });

  createTray(mainWindow);

  handleCloseEvents(mainWindow);

  createMenu(mainWindow);

  // ipcMain.handle("getStaticData", () => {
  //   return getStaticData();
  // });

  // handleGetStaticData(() => {
  //   return getStaticData();
  // });
});

// function handleGetStaticData(callback: () => StaticData) {
//   ipcMain.handle("getStaticData", () => {
//     return callback();
//   });
// }

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }

    e.preventDefault();
    mainWindow.hide();

    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
