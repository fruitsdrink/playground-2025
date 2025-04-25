console.log(window.api);
window.api.saveFile("hello world");

window.api.add((value) => {
  console.log("渲染进程收到add消息了", { value });
});

window.api.openFile();
window.api.onOpenFile((value) => {
  console.log("渲染进程收到onOpenFile消息了", { value });
});

window.api.upload("hello world").then((ret) => {
  console.log(`渲染进程收到主进程selectFile返回：${ret}`);
});
