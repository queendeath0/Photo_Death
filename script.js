// أسماء الأقسام بالعربية
const categoryNames = {
    'clothe': 'ملابس',
    'girl': 'بنات', 
    'mother': 'أمهات',
    'Lesbian': 'مثليات'
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
    
    // قائمة الصور الثابتة (للاحتياط إذا لم تعمل القراءة الديناميكية)
    const fallbackImages = {
        'girl': ['g1.jpg', 'g2.jpg', 'g3.jpg', 'g4.jpg', 'g5.jpg', 'g6.jpg', 'g7.jpg', 'g8.jpg', 'g9.jpg', 'g10.jpg', 'g11.jpg', 'g12.jpg', 'g13.jpg', 'g14.jpg', 'g15.jpg', 'g16.jpg', 'g17.jpg', 'g18.jpg', 'g19.jpg', 'g20.jpg', 'g21.jpg', 'g22.jpg', 'g23.jpg', 'g24.jpg', 'g25.jpg', 'g26.jpg', 'g27.jpg'],
        'Lesbian': ['l1.jpg', 'l2.jpg', 'l3.jpg', 'l4.jpg', 'l5.jpg', 'l6.jpg', 'l7.jpg', 'l8.jpg', 'l9.jpg', 'l10.jpg', 'l11.jpg', 'l12.jpg', 'l13.jpg', 'l14.jpg', 'l15.jpg', 'l16.jpg', 'l17.jpg', 'l18.jpg', 'l19.jpg', 'l20.jpg', 'l21.jpg', 'l22.jpg', 'l23.jpg', 'l24.jpg', 'l25.jpg', 'l26.jpg', 'l27.jpg', 'l28.jpg'],
        'mother': ['m1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg', 'm5.jpg', 'm6.jpg', 'm7.jpg', 'm8.jpg', 'm9.jpg', 'm10.jpg', 'm11.jpg', 'm12.jpg', 'm13.jpg', 'm14.jpg', 'm15.jpg', 'm16.jpg', 'm17.jpg', 'm18.jpg', 'm19.jpg', 'm20.jpg', 'm21.jpg', 'm22.jpg', 'm23.jpg', 'm24.jpg', 'm25.jpg', 'm26.jpg', 'm27.jpg', 'm28.jpg'],
        'clothe': ['c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.jpg', 'c5.jpg', 'c6.jpg', 'c7.jpg', 'c8.jpg', 'c9.jpg', 'c10.jpg', 'c11.jpg', 'c12.jpg', 'c13.jpg', 'c14.jpg', 'c15.jpg', 'c16.jpg', 'c17.jpg', 'c18.jpg', 'c19.jpg', 'c20.jpg', 'c21.jpg', 'c22.jpg', 'c23.jpg', 'c24.jpg', 'c25.jpg'],
    };
    
    const imagesContainer = document.getElementById('images-container');
    
    // محاولة قراءة الملفات من المجلدات بشكل ديناميكي
    loadImagesFromFolder(category, fallbackImages[category] || []);
}

// دالة لتحميل الصور من المجلدات
function loadImagesFromFolder(category, fallbackImages) {
    const imagesContainer = document.getElementById('images-container');
    
    // محاولة قراءة الملفات من المجلد
    try {
        // في بيئة الويب العادية، لا يمكن قراءة محتويات المجلدات مباشرة لأسباب أمنية
        // لذلك سنستخدم طريقة مختلفة بناءً على البيئة
        
        // الطريقة 1: إذا كان لدينا قائمة بجميع الملفات المتاحة
        const allImages = getAllAvailableImages(category);
        
        // الطريقة 2: استخدام الفال باك إذا لم تنجح الطريقة الأولى
        const imagesToUse = allImages.length > 0 ? allImages : fallbackImages;
        
        // إذا لم توجد صور
        if (imagesToUse.length === 0) {
            imagesContainer.innerHTML = `
                <div class="no-images">
                    <i class="fas fa-image"></i>
                    <h3>لا توجد صور في هذا القسم</h3>
                    <p>قم بإضافة صور إلى مجلد ${category}/</p>
                </div>
            `;
            return;
        }
        
        // عرض الصور
        let html = '<div class="images-grid">';
        
        imagesToUse.forEach((image, index) => {
            // المسار النسبي للصورة - من المجلد المباشر
            const imagePath = `${category}/${image}`;
            
            html += `
                <div class="image-item">
                    <img src="${imagePath}" alt="صورة ${index + 1}" 
                         onerror="handleImageError(this, '${category}', ${index})">
                </div>
            `;
        });
        
        html += '</div>';
        imagesContainer.innerHTML = html;
        
        // تحديث عدد الصور
        const imageCount = document.getElementById('image-count');
        if (imageCount) {
            imageCount.textContent = imagesToUse.length;
        }
        
    } catch (error) {
        console.error('خطأ في تحميل الصور:', error);
        
        // استخدام الصور الاحتياطية في حالة الخطأ
        displayFallbackImages(category, fallbackImages);
    }
}

// دالة لمعالجة خطأ تحميل الصورة
function handleImageError(imgElement, category, index) {
    console.log(`الصورة ${category}/${imgElement.alt} غير موجودة`);
    
    // عرض صورة بديلة
    imgElement.src = 'https://via.placeholder.com/200x200?text=صورة+غير+موجودة';
    imgElement.style.opacity = '0.7';
    
    // إضافة عنوان توضيحي
    const parentDiv = imgElement.parentElement;
    const errorText = document.createElement('div');
    errorText.className = 'image-error';
    errorText.textContent = 'الصورة غير متوفرة';
    errorText.style.cssText = `
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px;
        font-size: 12px;
        text-align: center;
    `;
    parentDiv.style.position = 'relative';
    parentDiv.appendChild(errorText);
}

// دالة للحصول على جميع الصور المتاحة (محاكاة)
function getAllAvailableImages(category) {
    // في الواقع، لا يمكن قراءة محتويات المجلدات في JavaScript من جانب العميل
    // لأسباب أمنية. هذه محاكاة للكيفية التي ستعمل بها إذا كان بإمكاننا ذلك.
    
    // في بيئة حقيقية، قد تحتاج إلى:
    // 1. استخدام Node.js في الخادوم لقراءة المجلدات
    // 2. استخدام API لتقديم قائمة الملفات
    // 3. استخدام قائمة ثابتة مسبقة الصنع
    
    // للتبسيط، سأقوم بإرجاع مصفوفة فارغة لجعل الكود يستخدم الفال باك
    // أو يمكنك تعديل هذه الدالة لتعيد قائمة الملفات بناءً على بنية مجلداتك
    
    // محاكاة: إذا كان المجلد موجوداً، أرجع قائمة افتراضية
    if (categoryNames.hasOwnProperty(category)) {
        // هنا يمكنك إضافة منطق لقراءة الملفات فعلياً إذا كنت تستخدم بيئة تدعم ذلك
        return []; // إرجاع مصفوفة فارغة لاستخدام الفال باك
    }
    
    return [];
}

// دالة لعرض الصور الاحتياطية
function displayFallbackImages(category, fallbackImages) {
    const imagesContainer = document.getElementById('images-container');
    
    // إذا لم توجد صور
    if (!fallbackImages || fallbackImages.length === 0) {
        imagesContainer.innerHTML = `
            <div class="no-images">
                <i class="fas fa-image"></i>
                <h3>لا توجد صور في هذا القسم</h3>
                <p>قم بإضافة صور إلى مجلد ${category}/</p>
            </div>
        `;
        return;
    }
    
    // عرض الصور من القائمة الاحتياطية
    let html = '<div class="images-grid">';
    
    fallbackImages.forEach((image, index) => {
        // المسار النسبي للصورة - من المجلد المباشر
        const imagePath = `${category}/${image}`;
        
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
        imageCount.textContent = fallbackImages.length;
    }
}