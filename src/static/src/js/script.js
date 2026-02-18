// Функция для скролла к году
function scrollToYear(year) {
    const items = document.querySelectorAll('.timeline-item');
    for (let item of items) {
        if (item.dataset.year == year) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
        }
    }
}

// Прогресс-бар и анимация появления
window.addEventListener('scroll', function() {
    const items = document.querySelectorAll('.timeline-item');
    const progressFill = document.getElementById('progress-fill');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Прогресс-бар
    const scrollHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollPercent = (scrollPosition / scrollHeight) * 100;
    if (progressFill) {
        progressFill.style.height = Math.min(100, scrollPercent) + '%';
    }
    
    // Подсветка видимых элементов
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = (rect.top < windowHeight - 80 && rect.bottom > 80);
        
        if (isVisible) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
});

// Запускаем при загрузке
window.dispatchEvent(new Event('scroll'));

// Отключаем hover на мобильных
if ('ontouchstart' in window) {
    document.documentElement.style.setProperty('--hover-none', 'none');
}