const el = document.querySelector<HTMLCanvasElement>("#canvas")!;

const ctx = el.getContext("2d")!;

ctx.fillStyle = "#333"; // 填充颜色
ctx.arc(150, 150, 100, 0, Math.PI * 2); // 绘制圆形
ctx.fill(); // 填充圆形
