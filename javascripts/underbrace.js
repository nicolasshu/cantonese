document.addEventListener("DOMContentLoaded", () => {
  const blocks = Array.from(document.querySelectorAll("p"))
    .filter(p => p.textContent.trim().startsWith("::: underbrace"));

  blocks.forEach(block => {
    // remove ::: underbrace markers
    const content = block.textContent
      .replace(/^::: underbrace\s*/, "")
      .replace(/:::\s*$/, "")
      .trim();

    const container = document.createElement("div");
    container.className = "underbrace-container";

    content.split("\n").forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const parts = trimmed.split("|").map(p => p.trim());
      const char = parts[0];
      const meaning = parts[1] || "";

      const item = document.createElement("span");
      item.className = "underbrace-item";

      const charSpan = document.createElement("span");
      charSpan.className = "char";
      charSpan.textContent = char;
      item.appendChild(charSpan);

      const meaningSpan = document.createElement("span");
      meaningSpan.className = "meaning";
      meaningSpan.textContent = meaning;
      item.appendChild(meaningSpan);

      container.appendChild(item);
    });

    block.innerHTML = "";
    block.appendChild(container);
  });
});
