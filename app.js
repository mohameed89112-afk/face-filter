// عناصر DOM
const themeToggle = document.getElementById('theme-toggle');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const canvas = document.getElementById('image-display');
const ctx = canvas.getContext('2d');
const filtersContainer = document.getElementById('filters-container');

// عناصر التعديل
const brightnessSlider = document.getElementById('brightness-slider');
const contrastSlider = document.getElementById('contrast-slider');
const saturationSlider = document.getElementById('saturation-slider');
const sharpnessSlider = document.getElementById('sharpness-slider');
const blurSlider = document.getElementById('blur-slider');
const hueSlider = document.getElementById('hue-slider');

// قيم التعديل
const brightnessValue = document.getElementById('brightness-value');
const contrastValue = document.getElementById('contrast-value');
const saturationValue = document.getElementById('saturation-value');
const sharpnessValue = document.getElementById('sharpness-value');
const blurValue = document.getElementById('blur-value');
const hueValue = document.getElementById('hue-value');

// حالة التطبيق
let originalImage = null;
let currentImage = null;
let activeFilter = null;

// تسجيل Service Worker لـ PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// تبديل الوضع الليلي
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// رفع الصورة
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                originalImage = img;
                currentImage = img;
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                uploadPlaceholder.style.display = 'none';
                canvas.style.display = 'block';
            }
            img.src = event.target.result;
        }
        
        reader.readAsDataURL(e.target.files[0]);
    }
});

// إنشاء الفلاتر
const filters = [
    { name: 'طبيعي', class: 'normal' },
    { name: 'أسود وأبيض', class: 'grayscale' },
    { name: 'سيبيا', class: 'sepia' },
    { name: 'إينفرت', class: 'invert' },
    { name: 'دفء', class: 'warm' },
    { name: 'برودة', class: 'cool' },
    { name: 'سوداوي', class: 'melancholy' },
    { name: 'مشرق', class: 'bright' },
    { name: 'فينوس', class: 'venus' },
    { name: 'أمبير', class: 'amber' },
    { name: 'ازرقاق', class: 'cyanotype' },
    { name: 'حزين', class: 'sad' },
    { name: 'فرح', class: 'happy' },
    { name: 'رومانسي', class: 'romantic' },
    { name: 'خريف', class: 'autumn' },
    { name: 'ربيع', class: 'spring' },
    { name: 'صيف', class: 'summer' },
    { name: 'شتاء', class: 'winter' },
    { name: 'ليلي', class: 'nocturnal' },
    { name: 'نهاري', class: 'daylight' },
    { name: 'كلاسيكي', class: 'vintage' },
    { name: 'حديث', class: 'modern' },
    { name: 'حلمي', class: 'dreamy' },
    { name: 'درامي', class: 'dramatic' },
    { name: 'هادئ', class: 'calm' }
];

// إضافة الفلاتر إلى الواجهة
filters.forEach(filter => {
    const filterElement = document.createElement('div');
    filterElement.classList.add('filter-item');
    filterElement.setAttribute('data-filter', filter.class);
    
    filterElement.innerHTML = `
        <div class="filter-preview" style="filter: ${getFilterStyle(filter.class)}"></div>
        <div>${filter.name}</div>
    `;
    
    filterElement.addEventListener('click', () => {
        document.querySelectorAll('.filter-item').forEach(item => {
            item.classList.remove('active');
        });
        
        filterElement.classList.add('active');
        activeFilter = filter.class;
        applyFilters();
    });
    
    filtersContainer.appendChild(filterElement);
});

// تطبيق الفلاتر والتعديلات
function applyFilters() {
    if (!currentImage) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
    
    // تطبيق التعديلات الأساسية
    const brightness = brightnessSlider.value;
    const contrast = contrastSlider.value;
    const saturation = saturationSlider.value;
    const blur = blurSlider.value;
    const hue = hueSlider.value;
    
    let filterString = '';
    
    if (brightness !== '0') filterString += `brightness(${1 + brightness / 100}) `;
    if (contrast !== '0') filterString += `contrast(${1 + contrast / 100}) `;
    if (saturation !== '0') filterString += `saturate(${1 + saturation / 100}) `;
    if (blur !== '0') filterString += `blur(${blur}px) `;
    if (hue !== '0') filterString += `hue-rotate(${hue}deg) `;
    
    // تطبيق الفلتر النشط
    if (activeFilter && activeFilter !== 'normal') {
        filterString += getFilterStyle(activeFilter);
    }
    
    canvas.style.filter = filterString;
}

// الحصول على نمط CSS للفلتر
function getFilterStyle(filterName) {
    switch(filterName) {
        case 'grayscale': return 'grayscale(100%)';
        case 'sepia': return 'sepia(100%)';
        case 'invert': return 'invert(100%)';
        case 'warm': return 'sepia(30%) hue-rotate(-20deg) saturate(120%)';
        case 'cool': return 'sepia(10%) hue-rotate(20deg) saturate(130%)';
        case 'melancholy': return 'grayscale(50%) brightness(90%) contrast(110%)';
        case 'bright': return 'brightness(120%) saturate(120%)';
        case 'venus': return 'hue-rotate(300deg) saturate(150%)';
        case 'amber': return 'sepia(40%) hue-rotate(10deg) saturate(140%)';
        case 'cyanotype': return 'sepia(60%) hue-rotate(180deg) saturate(200%)';
        case 'sad': return 'grayscale(70%) brightness(85%)';
        case 'happy': return 'brightness(115%) saturate(130%) hue-rotate(10deg)';
        case 'romantic': return 'sepia(30%) hue-rotate(330deg) saturate(140%)';
        case 'autumn': return 'sepia(50%) hue-rotate(10deg) saturate(120%)';
        case 'spring': return 'hue-rotate(60deg) saturate(130%) brightness(110%)';
        case 'summer': return 'hue-rotate(120deg) saturate(140%)';
        case 'winter': return 'hue-rotate(200deg) saturate(80%) brightness(110%)';
        case 'nocturnal': return 'brightness(80%) contrast(120%) hue-rotate(240deg)';
        case 'daylight': return 'brightness(115%) contrast(110%) saturate(120%)';
        case 'vintage': return 'sepia(60%) hue-rotate(5deg) contrast(110%)';
        case 'modern': return 'contrast(130%) saturate(110%)';
        case 'dreamy': return 'brightness(110%) contrast(90%) saturate(130%) blur(0.5px)';
        case 'dramatic': return 'contrast(140%) brightness(90%)';
        case 'calm': return 'hue-rotate(270deg) saturate(90%) brightness(105%)';
        default: return '';
    }
}

// إضافة مستمعين لأحداث التعديلات
brightnessSlider.addEventListener('input', () => {
    brightnessValue.textContent = brightnessSlider.value;
    applyFilters();
});

contrastSlider.addEventListener('input', () => {
    contrastValue.textContent = contrastSlider.value;
    applyFilters();
});

saturationSlider.addEventListener('input', () => {
    saturationValue.textContent = saturationSlider.value;
    applyFilters();
});

blurSlider.addEventListener('input', () => {
    blurValue.textContent = blurSlider.value;
    applyFilters();
});

hueSlider.addEventListener('input', () => {
    hueValue.textContent = hueSlider.value;
    applyFilters();
});

// إعادة تعيين الصورة
resetBtn.addEventListener('click', () => {
    if (!originalImage) return;
    
    brightnessSlider.value = 0;
    contrastSlider.value = 0;
    saturationSlider.value = 0;
    sharpnessSlider.value = 0;
    blurSlider.value = 0;
    hueSlider.value = 0;
    
    brightnessValue.textContent = '0';
    contrastValue.textContent = '0';
    saturationValue.textContent = '0';
    sharpnessValue.textContent = '0';
    blurValue.textContent = '0';
    hueValue.textContent = '0';
    
    activeFilter = null;
    document.querySelectorAll('.filter-item').forEach(item => {
        item.classList.remove('active');
    });
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
    canvas.style.filter = 'none';
});

// تحميل الصورة المعدلة
downloadBtn.addEventListener('click', () => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
