const { app, shell, Menu, dialog } = require("electron");

const template = [
  {
    label: app.name,
    submenu: [
      {
        label: "访问官网",
        click: () => {
          dialog
            .showMessageBox({
              type: "info",
              title: "提示",
              detail: "你确定要访问官网吗？",
              message: "访问官网",
              buttons: ["取消", "确定"],
              defaultId: 1,
              cancelId: 0,
              checkboxChecked: true,
              checkboxLabel: "同意访问协议"
            })
            .then(({ response, checkboxChecked }) => {
              if (response === 1 && checkboxChecked) {
                shell.openExternal("https://github.com");
              }
            });
        }
      },
      {
        label: "退出",
        click: () => {
          dialog
            .showMessageBox({
              type: "info",
              title: "提示",
              detail: "你确定要退出程序吗？",
              message: "退出程序",
              buttons: ["取消", "确定"],
              defaultId: 1,
              cancelId: 0
            })
            .then(({ response }) => {
              if (response === 1) {
                app.quit();
              }
            });
        }
      }
    ]
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
