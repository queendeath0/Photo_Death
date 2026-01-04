// أسماء الأقسام بالعربية
const categoryNames = {
    'nature': 'الطبيعة',
    'people': 'الأشخاص', 
    'animals': 'الحيوانات',
    'food': 'الطعام',
    'tech': 'التكنولوجيا'
};

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إذا كنا في صفحة القسم (category.html)
    if (window.location.pathname.includes('category.html')) {
        loadCategoryImages();
    }
});

// تحميل الصور الخاصة بالقسم
function loadCategoryImages() {
    // الحصول على اسم القسم من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (!category) {
        window.location.href = 'index.html';
        return;
    }
    
    // تحديث عنوان الصفحة
    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) {
        categoryTitle.innerHTML = `<i class="fas fa-images"></i> ${categoryNames[category] || category}`;
    }
    
    // قائمة بأسماء الصور في كل قسم (يمكنك إضافة المزيد)
    // في الحقيقة، يجب أن تكون الصور موجودة في مجلد images/{category}/
    const imageFiles = {
        'girl': ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg', 'g5.jpg', 'g6.jpg', 'g7.jpg', 'g8.jpg', 'g9.jpg', 'g10.jpg', 'g11.jpg', 'g12.jpg', 'g13.jpg', 'g14.jpg', 'g15.jpg', 'g16.jpg', 'g17.jpg'],
        'Lesbian': ['l1.jpg', 'l2.jpg', 'l3.jpg', 'l4.jpg', 'l5.jpg', 'l6.jpg', 'l7.jpg', 'l8.jpg', 'l9.jpg', 'l10.jpg', 'l11.jpg', 'l12.jpg', 'l13.jpg', 'l14.jpg', 'l15.jpg', 'l16.jpg'],
        'mother': ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg', 'm5.jpg', 'm6.jpg', 'm7.jpg', 'm8.jpg', 'm9.jpg', 'm10.jpg', 'm11.jpg', 'm12.jpg', 'm13.jpg', 'm14.jpg'],
        'clothe': ['c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg', 'c6.jpg', 'c7.jpg', 'c8.jpg', 'c9.jpg', 'c10.jpg', 'c11.jpg', 'c12.jpg', 'c13.jpg', 'c14.jpg', 'c15.jpg',],
    };
    
    const imagesContainer = document.getElementById('images-container');
    const images = imageFiles[category] || [];
    
    // إذا لم توجد صور
    if (images.length === 0) {
        imagesContainer.innerHTML = `
            <div class="no-images">
                <i class="fas fa-image"></i>
                <h3>لا توجد صور في هذا القسم</h3>
                <p>قم بإضافة صور إلى مجلد images/${category}/</p>
            </div>
        `;
        return;
    }
    
    // عرض الصور
    let html = '<div class="images-grid">';
    
    images.forEach((image, index) => {
        // المسار النسبي للصورة
        const imagePath = `images/${category}/${image}`;
        
        html += `
            <div class="image-item">
                <img src="${imagePath}" alt="صورة ${index + 1}" 
                     onerror="this.src='https://via.placeholder.com/200x200?text=صورة+غير+موجودة'">
            </div>
        `;
    });
    
    html += '</div>';
    imagesContainer.innerHTML = html;
    
    // تحديث عدد الصور
    const imageCount = document.getElementById('image-count');
    if (imageCount) {
        imageCount.textContent = images.length;
    }
}