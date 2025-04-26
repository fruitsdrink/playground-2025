const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  preload: (cb) => {
    ipcRenderer.on("toPreload", () => {
      console.log(`预加载脚本接收到消息toPreload`);
      cb();
    });
  }
});
