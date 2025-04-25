const { ipcRenderer, contextBridge } = require("electron");

// api 是一个对象，里面的方法可以在渲染进程中调用
// 渲染进程可以通过 window.api 来调用主进程的方法
contextBridge.exposeInMainWorld("api", {
  saveFile: (content) => {
    ipcRenderer.send("saveFile", content);
  },
  add: (cb) => {
    ipcRenderer.on("add", (event, value) => {
      console.log("预加载脚本收到add消息了", { event, value });
      cb(value);
    });
  },
});
