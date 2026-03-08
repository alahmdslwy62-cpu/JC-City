// وظيفة التنقل بين الأقسام
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // إظهار القسم المختار
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        // الصعود لأعلى الصفحة عند التبديل
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// التمرير لقسم صناع المحتوى
function scrollToStreamers() {
    showSection('home');
    setTimeout(() => {
        const element = document.getElementById('streamers-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// التحكم في قائمة القوانين (Accordion)
document.addEventListener('DOMContentLoaded', () => {
    const accHeaders = document.querySelectorAll('.acc-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // إغلاق العناصر الأخرى (اختياري)
            // document.querySelectorAll('.acc-item').forEach(i => { if(i !== item) i.classList.remove('active'); });

            item.classList.toggle('active');
            
            // تغيير علامة + إلى -
            const icon = header.querySelector('.plus');
            if (item.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });
});

// التعامل مع إرسال النموذج (تنبيه تجريبي)
document.getElementById('activationForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('شكرًا لك! تم استلام طلبك وسيتم مراجعته من قبل الإدارة.');
    showSection('home');
});
document.getElementById('activationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // منع الصفحة من التحديث
    
    const btn = document.getElementById('submitBtn');
    btn.innerText = "جاري الإرسال...";
    btn.disabled = true;

    // تجميع كافة الإجابات في نص واحد منسق
    const allAnswers = `
        تفاصيل مقدم الطلب:
        1. الاسم والعمر الحقيقي: ${document.getElementById('q1').value}
        2. اسم الشخصية وتفاصيلها: ${document.getElementById('q2').value}
        3. قصة الشخصية: ${document.getElementById('q3').value}
        4. الإيجابيات والسلبيات: ${document.getElementById('q4').value}
        5. الخبرة السابقة: ${document.getElementById('q5').value}
        6. سبب الرغبة في الدخول: ${document.getElementById('q6').value}

        الجزء الثاني (المواقف):
        7. موقف شحنة المخدرات: ${document.getElementById('q7').value}
        8. موقف الدين للعصابة: ${document.getElementById('q8').value}
        9. موقف الرهينة (تاكسي): ${document.getElementById('q9').value}
        10. موقف رهن البيت: ${document.getElementById('q10').value}
    `;

    // المعايير التي ترسل إلى EmailJS
    const templateParams = {
        from_name: document.getElementById('q1').value, // اسم الشخص من السؤال الأول
        message: allAnswers, // النص الكامل لكل الإجابات
        reply_to: 'alahmdslwy62@gmail.com'
    };

    // إرسال الطلب (تأكد من Service ID و Template ID)
    emailjs.send('service_2bodjba', 'template_6a6p82o', templateParams)
        .then(function() {
            alert('تم إرسال طلب التفعيل بنجاح! سيتم مراجعته ووصوله إلى الإيميل.');
            document.getElementById('activationForm').reset();
            showSection('home');
            btn.innerText = "تقديم الطلب";
            btn.disabled = false;
        }, function(error) {
            alert('فشل الإرسال، تأكد من إعدادات EmailJS: ' + JSON.stringify(error));
            btn.innerText = "تقديم الطلب";
            btn.disabled = false;
        });
});
document.getElementById('activationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerText;
    btn.innerText = "جاري الإرسال...";
    btn.disabled = true;

    // تجميع البيانات بالأسماء الموجودة في صورتك الأخيرة (Email Template)
    const templateParams = {
        from_name: document.getElementById('q1').value,
        real_name_age: document.getElementById('q1').value,
        char_details: document.getElementById('q2').value,
        char_story: document.getElementById('q3').value,
        pros_cons: document.getElementById('q4').value,
        experience: document.getElementById('q5').value,
        reason: document.getElementById('q6').value,
        scen_1: document.getElementById('q7').value,
        scen_2: document.getElementById('q8').value,
        scen_3: document.getElementById('q9').value,
        scen_4: document.getElementById('q10').value
    };

    // الإرسال مع التأكد من معرف الخدمة والقالب
    emailjs.send('service_2bodjba', 'template_6a6p82o', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('تم تقديم الطلب بنجاح ✅ راجع بريدك alahmdslwy62@gmail.com');
            document.getElementById('activationForm').reset();
            showSection('home');
            btn.innerText = originalText;
            btn.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            alert('فشل في الإرسال: ' + JSON.stringify(error));
            btn.innerText = originalText;
            btn.disabled = false;
        });
});
