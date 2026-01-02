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
        'girl': ['girl1.jpg', 'girl2.jpg', 'girl3.jpg', 'girl4.jpg', 'girl5.jpg', 'girl6.jpg', 'girl7.jpg', 'girl8.jpg', 'girl9.jpg', 'girl10.jpg'],
        'Lesbian': ['les1.jpg', 'les2.jpg', 'les3.jpg', 'les4.jpg', 'les5.jpg', 'les6.jpg', 'les7.jpg', 'les8.jpg', 'les9.jpg', 'les10.jpg'],
        'mother': ['mother1.jpg', 'mother2.jpg', 'mother3.jpg', 'mother4.jpg', 'mother5.jpg', 'mother6.jpg', 'mother7.jpg', 'mother8.jpg', 'mother9.jpg', 'mother10.jpg'],
        'clothe': ['clothe1.jpg', 'clothe2.jpg', 'clothe3.jpg', 'clothe4.jpg', 'clothe5.jpg', 'clothe6.jpg', 'clothe7.jpg', 'clothe8.jpg', 'clothe9.jpg', 'clothe10.jpg']
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