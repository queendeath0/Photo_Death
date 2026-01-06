// أسماء الأقسام بالعربية
const categoryNames = {
    'clothe': 'ملابس',
    'girl': 'بنات', 
    'mother': 'أمهات',
    'Lesbian': 'سحاقيات'
};

// تخمين أسماء الصور بناءً على محتوى المجلدات
const imagePatterns = {
    'girl': 'g',
    'Lesbian': 'l', 
    'mother': 'm',
    'clothe': 'c'
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
    
    // استخدام دالة جديدة لتحميل الصور
    loadImagesSmart(category);
}

// دالة ذكية لتحميل الصور
function loadImagesSmart(category) {
    const imagesContainer = document.getElementById('images-container');
    
    // محاولة اكتشاف الصور المتاحة
    detectAvailableImages(category)
        .then(images => {
            if (images.length === 0) {
                // إذا لم نجد أي صور، نعرض رسالة
                imagesContainer.innerHTML = `
                    <div class="no-images">
                        <i class="fas fa-image"></i>
                        <h3>لا توجد صور في هذا القسم</h3>
                        <p>الرجاء التأكد من:</p>
                        <ul style="text-align: right; direction: rtl;">
                            <li>أن المجلد "${category}" موجود</li>
                            <li>أن الصور داخل المجلد بتنسيق .jpg</li>
                            <li>أن الصور لها أسماء صحيحة</li>
                        </ul>
                    </div>
                `;
                return;
            }
            
            displayImages(category, images);
        })
        .catch(error => {
            console.error('خطأ في تحميل الصور:', error);
            
            // محاولة استخدام النمط الافتراضي
            const defaultImages = generateDefaultImageNames(category);
            displayImages(category, defaultImages, true);
        });
}

// دالة لاكتشاف الصور المتاحة
async function detectAvailableImages(category) {
    const images = [];
    const prefix = imagePatterns[category] || category.charAt(0).toLowerCase();
    
    // نحاول تحميل مجموعة من الصور
    for (let i = 1; i <= 50; i++) {
        const imageName = `${prefix}${i}.jpg`;
        const imagePath = `${category}/${imageName}`;
        
        // التحقق مما إذا كانت الصورة موجودة
        const exists = await checkImageExists(imagePath);
        if (exists) {
            images.push(imageName);
        } else {
            // إذا لم نجد صورة بعد 5 محاولات فاشلة متتالية، نتوقف
            if (i > 5 && images.length === 0) {
                break;
            }
        }
    }
    
    return images;
}

// دالة للتحقق من وجود صورة
function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        
        // وقت انتظار قصير
        setTimeout(() => resolve(false), 500);
    });
}

// إنشاء أسماء صور افتراضية
function generateDefaultImageNames(category) {
    const prefix = imagePatterns[category] || category.charAt(0).toLowerCase();
    const images = [];
    
    // ننشئ قائمة بأسماء الصور الافتراضية
    for (let i = 1; i <= 30; i++) {
        images.push(`${prefix}${i}.jpg`);
    }
    
    return images;
}

// دالة لعرض الصور
function displayImages(category, imageNames, isFallback = false) {
    const imagesContainer = document.getElementById('images-container');
    const imageCount = document.getElementById('image-count');
    
    if (imageNames.length === 0) {
        imagesContainer.innerHTML = `
            <div class="no-images">
                <i class="fas fa-image"></i>
                <h3>لا توجد صور في هذا القسم</h3>
            </div>
        `;
        if (imageCount) imageCount.textContent = '0';
        return;
    }
    
    let html = '<div class="images-grid">';
    
    imageNames.forEach((imageName, index) => {
        const imagePath = `${category}/${imageName}`;
        const imageNumber = isFallback ? index + 1 : parseInt(imageName.match(/\d+/)?.[0]) || index + 1;
        
        html += `
            <div class="image-item">
                <img 
                    src="${imagePath}" 
                    alt="صورة ${category} ${imageNumber}" 
                    loading="lazy"
                    onerror="this.onerror=null; this.src='https://via.placeholder.com/300x400/333/fff?text=${category}+${imageNumber}';"
                >
                ${isFallback ? `<div class="image-number">${imageNumber}</div>` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    imagesContainer.innerHTML = html;
    
    if (imageCount) {
        imageCount.textContent = imageNames.length;
    }
    
    // إضافة رسالة إذا كنا نستخدم الصور الافتراضية
    if (isFallback) {
        const warning = document.createElement('div');
        warning.className = 'images-warning';
        warning.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 10px 0; border-radius: 5px;">
                <i class="fas fa-exclamation-triangle"></i>
                <strong>ملاحظة:</strong> يتم عرض صور افتراضية. تأكد من وجود الصور الحقيقية في مجلد "${category}/"
            </div>
        `;
        imagesContainer.insertBefore(warning, imagesContainer.firstChild);
    }
}

// إضافة CSS إضافي
const additionalStyles = `
    .image-item {
        position: relative;
    }
    
    .image-number {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 12px;
    }
    
    .images-warning {
        text-align: center;
        direction: rtl;
    }
`;

// إضافة الأنماط إلى الصفحة
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);