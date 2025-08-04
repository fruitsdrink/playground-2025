import { BrowserWindow, Menu } from "electron";
import { ipcWebContentsSend, isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      // { // macos隐藏默认菜单名称，将下面的菜单设置为默认菜单名称
      //   label: " ",
      //   visible: false,
      // },
      // {
      //   label: "App",
      //   type: "submenu",
      //   submenu: [
      //     {
      //       label: "Quit",
      //       role: "quit",
      //     },
      //   ],
      // },
      {
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            role: "quit",
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "CPU"),
          },
          {
            label: "RAM",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "RAM"),
          },
          {
            label: "STORAGE",
            click: () =>
              ipcWebContentsSend(
                "changeView",
                mainWindow.webContents,
                "STORAGE"
              ),
          },
        ],
      },
    ])
  );
}
