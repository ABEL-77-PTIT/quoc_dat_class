const form = document.getElementById("feedback-form");
const copyBtn = document.getElementById("copy-btn");

const buildMessage = (data) => {
  const topic = data.get("topic") || "";
  const message = data.get("message") || "";
  const contact = data.get("contact") || "Không cung cấp";

  return [
    `Chủ đề: ${topic}`,
    `Nội dung: ${message}`,
    `Liên hệ (tuỳ chọn): ${contact}`,
  ].join("\n");
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const body = encodeURIComponent(buildMessage(data));
  const subject = encodeURIComponent("Góp ý ẩn danh - Lớp chủ nhiệm");
  const mailto = `mailto:lopchunhiem@example.com?subject=${subject}&body=${body}`;

  window.location.href = mailto;
});

copyBtn.addEventListener("click", async () => {
  const data = new FormData(form);
  const content = buildMessage(data);
  try {
    await navigator.clipboard.writeText(content);
    copyBtn.textContent = "Đã sao chép";
    setTimeout(() => {
      copyBtn.textContent = "Sao chép nội dung";
    }, 1500);
  } catch (err) {
    copyBtn.textContent = "Không thể sao chép";
  }
});
