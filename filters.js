// يمكنك إضافة المزيد من الفلاتر هنا
const additionalFilters = [
    { name: 'فيلتر 1', class: 'filter1', style: 'contrast(150%) saturate(200%)' },
    { name: 'فيلتر 2', class: 'filter2', style: 'sepia(80%) hue-rotate(90deg)' },
    // أضف المزيد من الفلاتر هنا...
];

// دالة لإضافة الفلاتر الإضافية
function addAdditionalFilters() {
    const filtersContainer = document.getElementById('filters-container');
    
    additionalFilters.forEach(filter => {
        const filterElement = document.createElement('div');
        filterElement.classList.add('filter-item');
        filterElement.setAttribute('data-filter', filter.class);
        
        filterElement.innerHTML = `
            <div class="filter-preview" style="filter: ${filter.style}"></div>
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
}

// استدعاء الدالة عند تحميل الصفحة
window.addEventListener('load', addAdditionalFilters);
