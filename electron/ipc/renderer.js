console.log(window.api);
window.api.saveFile("hello world");

window.api.add((value) => {
  console.log("渲染进程收到add消息了", { value });
});
