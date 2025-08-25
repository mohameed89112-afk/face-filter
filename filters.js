// filters.js

function applyFilter(filter) {
    const img = document.getElementById("preview");
    img.style.filter = filter;
}

// قائمة الفلاتر
const filters = {
    none: "none",
    grayscale: "grayscale(100%)",
    sepia: "sepia(100%)",
    invert: "invert(100%)",
    blur: "blur(5px)",
    brightness: "brightness(150%)",
    contrast: "contrast(200%)",
    saturate: "saturate(200%)",
    hueRotate: "hue-rotate(90deg)",
    opacity: "opacity(50%)",
};

// إنشاء الأزرار تلقائياً
window.onload = () => {
    const container = document.getElementById("filters");
    for (let key in filters) {
        const btn = document.createElement("button");
        btn.innerText = key;
        btn.classList.add("filter-btn");
        btn.onclick = () => applyFilter(filters[key]);
        container.appendChild(btn);
    }
};
