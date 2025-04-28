const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  selectFile: () => {
    const files = ipcRenderer.invoke("select-file");
    console.log(files);
    return files;
  },
  saveFile: (content) => {
    ipcRenderer.send("save-file", content);
  },
});

ipcRenderer.on("file-saved", () => {
  console.log("文件保存成功");
});
