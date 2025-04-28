window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#selectBtn");
  btn.addEventListener("click", async () => {
    const files = await window.api.selectFile();
    const filesDiv = document.querySelector("#files");
    for (const file of files) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = file;
      input.readOnly = true;
      filesDiv.appendChild(input);
    }
  });

  const saveBtn = document.querySelector("#saveBtn");
  saveBtn.addEventListener("click", () => {
    const content = document.querySelector("#content").value;
    window.api.saveFile(content);
  });
});
