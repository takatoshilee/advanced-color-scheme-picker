const color = document.getElementById("color");
let selectedColor = "#000000";
let inputChangedFlag = false;
color.addEventListener("input", function () {
  selectedColor = color.value;
  document.querySelector(".color-1").style.backgroundColor = selectedColor;
  document.querySelector(".color-1-code").textContent = selectedColor;
  inputChangedFlag = true;
});

const mode = document.getElementById("mode");
const button = document.querySelector("button");
const colorCountInput = document.getElementById("color-count");

button.addEventListener("click", function () {
  const count = parseInt(colorCountInput.value, 10) || 5;
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${selectedColor.slice(1)}&mode=${
      mode.value
    }&count=${count}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Clear and render color blocks
      const colorsContainer = document.querySelector(".colors");
      const bottomContainer = document.querySelector(".bottom-container");
      colorsContainer.innerHTML = "";
      bottomContainer.innerHTML = "";
      data.colors.forEach((colorObj, i) => {
        // Create color block
        const colorDiv = document.createElement("div");
        colorDiv.className = `color-block color-${i + 1}`;
        colorDiv.style.backgroundColor = colorObj.hex.value;
        colorDiv.style.cursor = "pointer";
        colorsContainer.appendChild(colorDiv);
        // Create hex code element
        const codeDiv = document.createElement("div");
        codeDiv.className = `color-code color-${i + 1}-code`;
        codeDiv.textContent = colorObj.hex.value;
        bottomContainer.appendChild(codeDiv);
      });
      // Add copy-to-clipboard event to each color block
      document.querySelectorAll(".colors > div").forEach((block, i) => {
        block.addEventListener("click", function () {
          const hex = document
            .querySelectorAll(".bottom-container > div")
            [i].textContent.trim();
          navigator.clipboard.writeText(hex);
          // Show popup
          const popup = document.createElement("div");
          popup.textContent = "Copied!";
          popup.style.position = "absolute";
          popup.style.background = "#333";
          popup.style.color = "#fff";
          popup.style.padding = "4px 12px";
          popup.style.borderRadius = "6px";
          popup.style.fontSize = "14px";
          popup.style.zIndex = "100";
          const rect = block.getBoundingClientRect();
          popup.style.top = rect.top + window.scrollY + 10 + "px";
          popup.style.left = rect.left + window.scrollX + 10 + "px";
          document.body.appendChild(popup);
          setTimeout(() => popup.remove(), 1000);
        });
      });
    });
});

document.querySelectorAll(".colors > div").forEach((block, i) => {
  block.addEventListener("click", function () {
    // Get hex code from corresponding .color-x-code
    const hex = document
      .querySelectorAll(".bottom-container > div")
      [i].textContent.trim()
      .slice(1);
    navigator.clipboard.writeText(hex);

    // Create popup
    const popup = document.createElement("div");
    popup.textContent = "Copied!";
    popup.style.position = "absolute";
    popup.style.background = "#333";
    popup.style.color = "#fff";
    popup.style.padding = "4px 12px";
    popup.style.borderRadius = "6px";
    popup.style.fontSize = "14px";
    popup.style.zIndex = "100";
    popup.style.top = block.getBoundingClientRect().top + window.scrollY + "px";
    popup.style.left =
      block.getBoundingClientRect().left + window.scrollX + "px";
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 1000);
  });
});
