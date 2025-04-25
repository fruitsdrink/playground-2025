const { Menu } = require("electron");

const createMenu = (win) => {
  const menu = [
    {
      label: "菜单",
      submenu: [
        {
          label: "增加",
          click: () => {
            // win为渲染进程的BrowserWindow实例
            win.webContents.send("add", 1);
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
};

module.exports = {
  createMenu,
};
