// app.js

// تحميل الصورة
function loadImage(event) {
    const img = document.getElementById("preview");
    img.src = URL.createObjectURL(event.target.files[0]);
    img.style.display = "block";
}

// حفظ الصورة بعد التعديل
function downloadImage() {
    const img = document.getElementById("preview");
    html2canvas(img).then(canvas => {
        let link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
