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

// Добавляем интерактивность для карточек (опционально) Энергомаркет
document.querySelectorAll('.market-card').forEach(card => {
    card.addEventListener('click', function() {
        // Здесь можно добавить переход на страницу раздела
        console.log('Card clicked:', this);
    });
});

 // РИСКИ
 // Интерактивность для карточек рисков
    document.addEventListener('DOMContentLoaded', function() {
        const riskCards = document.querySelectorAll('.risk-card');
        const integralRisk = document.getElementById('integral-risk');
        const integralBar = document.getElementById('integral-bar');
        
        // Функция обновления интегрального риска
        function updateIntegralRisk() {
            const levels = document.querySelectorAll('.risk-level');
            let sum = 0;
            levels.forEach(el => {
                sum += parseInt(el.textContent);
            });
            const avg = (sum / levels.length).toFixed(1);
            if (integralRisk) integralRisk.textContent = avg;
            if (integralBar) integralBar.style.width = avg + '%';
        }
        
        // Разворачивание/сворачивание карточек
        riskCards.forEach(card => {
            if (card.querySelector('.risk-details')) { // Только для карточек с деталями
                card.addEventListener('click', function(e) {
                    // Предотвращаем срабатывание при клике на индикатор
                    if (e.target.classList.contains('expand-indicator')) {
                        e.stopPropagation();
                    }
                    
                    const details = this.querySelector('.risk-details');
                    const indicator = this.querySelector('.expand-indicator');
                    
                    if (details.style.display === 'none') {
                        details.style.display = 'block';
                        this.classList.add('expanded');
                        if (indicator) indicator.innerHTML = '▲ СВЕРНУТЬ';
                    } else {
                        details.style.display = 'none';
                        this.classList.remove('expanded');
                        if (indicator) indicator.innerHTML = '▼ ПОДРОБНЕЕ';
                    }
                });
            }
        });
        
        // Интерактивность для матрицы рисков
        const matrixCells = document.querySelectorAll('.matrix-cell');
        matrixCells.forEach(cell => {
            cell.addEventListener('mouseenter', function() {
                // Показываем подсказку (можно добавить tooltip)
                const x = this.dataset.x;
                const y = this.dataset.y;
                if (x && y) {
                    // Здесь можно добавить тултип
                }
            });
        });
        
        // Периодическое обновление для имитации динамики
        setInterval(() => {
            // Небольшие случайные изменения для демонстрации
            const bars = document.querySelectorAll('.risk-bar');
            bars.forEach(bar => {
                const currentWidth = parseFloat(bar.style.width);
                if (currentWidth) {
                    const change = (Math.random() - 0.5) * 2;
                    let newWidth = currentWidth + change;
                    newWidth = Math.max(10, Math.min(30, newWidth));
                    bar.style.width = newWidth + '%';
                    
                    // Обновляем текст
                    const levelEl = bar.closest('.risk-card')?.querySelector('.risk-level');
                    if (levelEl) {
                        levelEl.textContent = Math.round(newWidth) + '%';
                    }
                }
            });
            
            updateIntegralRisk();
        }, 5000);
    });




