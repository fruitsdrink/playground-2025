const { app, Menu, shell } = require("electron");

const isMac = process.platform === "darwin";

const createMenu = (win) => {
  // 苹果系统第一个菜单
  const macFirstMenu = [
    {
      label: "访问网站",
      click: () => {
        shell.openExternal("https://github.com");
      }
    },
    {
      label: "渲染进程事件",
      click: () => {
        win.webContents.send("toPreload");
      }
    }
  ];

  // 菜单
  const menus = [
    {
      label: "操作",
      submenu: [
        {
          label: "打开窗口",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            console.log("打开窗口");
          }
        },
        {
          type: "separator"
        },
        {
          role: isMac ? "close" : "quit"
        }
      ]
    }
  ];

  const config = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: macFirstMenu
          },
          ...menus
        ]
      : menus)
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(config));
};

module.exports = {
  createMenu
};
