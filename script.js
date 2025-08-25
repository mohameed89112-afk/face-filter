const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const filtersList = document.getElementById("filtersList");

// تحميل الصورة
upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
});

// فتح التبويبات
function openTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ضبط يدوي
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturation = document.getElementById("saturation");
const hue = document.getElementById("hue");
const blur = document.getElementById("blur");

function updateAdjustments() {
  preview.style.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturation.value}%)
    hue-rotate(${hue.value}deg)
    blur(${blur.value}px)
  `;
}

[brightness, contrast, saturation, hue, blur].forEach(input => {
  input.addEventListener("input", updateAdjustments);
});

// تنزيل الصورة
document.getElementById("downloadBtn").addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = preview.naturalWidth;
  canvas.height = preview.naturalHeight;

  ctx.filter = preview.style.filter;
  ctx.drawImage(preview, 0, 0);

  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});

// 150 فلتر جاهز
const filterStyles = [
  "grayscale(100%)",
  "sepia(100%)",
  "invert(100%)",
  "contrast(150%)",
  "brightness(120%)",
  "saturate(200%)",
  "hue-rotate(90deg)",
  "blur(2px)",
  "drop-shadow(5px 5px 10px black)",
  "opacity(80%)"
];

// نكررهم لحد 150+
for (let i = 0; i < 150; i++) {
  const btn = document.createElement("button");
  btn.textContent = "فلتر " + (i + 1);
  const filter = filterStyles[i % filterStyles.length];
  btn.addEventListener("click", () => {
    preview.style.filter = filter;
  });
  filtersList.appendChild(btn);
}
