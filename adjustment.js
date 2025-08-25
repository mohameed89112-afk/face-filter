// adjustments.js

function updateAdjustments() {
    const img = document.getElementById("preview");

    let brightness = document.getElementById("brightness").value;
    let contrast = document.getElementById("contrast").value;
    let saturate = document.getElementById("saturate").value;
    let blur = document.getElementById("blur").value;

    img.style.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturate}%)
        blur(${blur}px)
    `;
}
