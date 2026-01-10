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
        'girl': ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg', 'g5.jpg', 'g6.jpg', 'g7.jpg', 'g8.jpg', 'g9.jpg', 'g10.jpg', 'g11.jpg', 'g12.jpg', 'g13.jpg', 'g14.jpg', 'g15.jpg', 'g16.jpg', 'g17.jpg', 'g18.jpg', 'g19.jpg', 'g20.jpg', 'g21.jpg', 'g22.jpg', 'g23.jpg', 'g24.jpg', 'g25.jpg', 'g26.jpg', 'g27.jpg', 'g28.jpg', 'g29.jpg', 'g30.jpg', 'g31.jpg', 'g32.jpg', 'g33.jpg', 'g34.jpg', 'g35.jpg', 'g36.jpg', 'g37.jpg', 'g38.jpg', 'g39.jpg', 'g40.jpg', 'g41.jpg', 'g42.jpg', 'g43.jpg', 'g44.jpg', 'g45.jpg', 'g46.jpg', 'g47.jpg', 'g48.jpg', 'g49.jpg', 'g50.jpg', 'g51.jpg', 'g52.jpg', 'g53.jpg', 'g54.jpg', 'g55.jpg', 'g56.jpg', 'g57.jpg', 'g58.jpg', 'g59.jpg', 'g60.jpg', 'g61.jpg', 'g62.jpg', 'g63.jpg', 'g64.jpg', 'g65.jpg'],
        'Lesbian': ['l1.jpg', 'l2.jpg', 'l3.jpg', 'l4.jpg', 'l5.jpg', 'l6.jpg', 'l7.jpg', 'l8.jpg', 'l9.jpg', 'l10.jpg', 'l11.jpg', 'l12.jpg', 'l13.jpg', 'l14.jpg', 'l15.jpg', 'l16.jpg', 'l17.jpg', 'l18.jpg', 'l19.jpg', 'l20.jpg', 'l21.jpg', 'l22.jpg', 'l23.jpg', 'l24.jpg', 'l25.jpg', 'l26.jpg', 'l27.jpg', 'l28.jpg', 'l29.jpg', 'l30.jpg', 'l31.jpg', 'l32.jpg', 'l33.jpg', 'l34.jpg', 'l35.jpg', 'l36.jpg', 'l37.jpg', 'l38.jpg', 'l39.jpg', 'l40.jpg', 'l41.jpg', 'l42.jpg', 'l43.jpg', 'l44.jpg', 'l45.jpg', 'l46.jpg', 'l47.jpg'],
        'mother': ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg', 'm5.jpg', 'm6.jpg', 'm7.jpg', 'm8.jpg', 'm9.jpg', 'm10.jpg', 'm11.jpg', 'm12.jpg', 'm13.jpg', 'm14.jpg', 'm15.jpg', 'm16.jpg', 'm17.jpg', 'm18.jpg', 'm19.jpg', 'm20.jpg', 'm21.jpg', 'm22.jpg', 'm23.jpg', 'm24.jpg', 'm25.jpg', 'm26.jpg', 'm27.jpg', 'm28.jpg', 'm29.jpg', 'm30.jpg', 'm31.jpg', 'm32.jpg', 'm33.jpg', 'm34.jpg', 'm35.jpg', 'm36.jpg', 'm37.jpg', 'm38.jpg', 'm39.jpg', 'm40.jpg', 'm41.jpg', 'm42.jpg', 'm43.jpg', 'm44.jpg', 'm45.jpg', 'm46.jpg', 'm47.jpg', 'm48.jpg', 'm49.jpg', 'm50.jpg'],
        'clothe': ['c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg', 'c6.jpg', 'c7.jpg', 'c8.jpg', 'c9.jpg', 'c10.jpg', 'c11.jpg', 'c12.jpg', 'c13.jpg', 'c14.jpg', 'c15.jpg', 'c16.jpg', 'c17.jpg', 'c18.jpg', 'c19.jpg', 'c20.jpg', 'c21.jpg', 'c22.jpg', 'c23.jpg', 'c24.jpg', 'c25.jpg', 'c26.jpg', 'c27.jpg', 'c28.jpg', 'c29.jpg', 'c30.jpg', 'c31.jpg', 'c32.jpg', 'c33.jpg', 'c34.jpg', 'c35.jpg', 'c36.jpg', 'c37.jpg', 'c38.jpg', 'c39.jpg', 'c40.jpg', 'c41.jpg', 'c42.jpg', 'c43.jpg', 'c44.jpg', 'c45.jpg', 'c46.jpg', 'c47.jpg', 'c48.jpg', 'c49.jpg', 'c50.jpg', 'c51.jpg', 'c52.jpg', 'c53.jpg', 'c54.jpg', 'c55.jpg', 'c56.jpg', 'c57.jpg', 'c58.jpg', 'c59.jpg', 'c60.jpg', 'c61.jpg', 'c62.jpg'],
        
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