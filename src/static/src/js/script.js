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


    // Энергомаркет

    document.addEventListener('DOMContentLoaded', function() {
        // Интерактивность для карточек
        const cards = document.querySelectorAll('.market-card');
        cards.forEach(card => {
            const indicator = card.querySelector('.expand-indicator');
            if (indicator) {
                indicator.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const details = card.querySelector('.risk-details');
                    if (details.style.display === 'none' || !details.style.display) {
                        details.style.display = 'block';
                        this.innerHTML = '▲ СВЕРНУТЬ';
                    } else {
                        details.style.display = 'none';
                        this.innerHTML = '▼ ПОДРОБНЕЕ';
                    }
                });
            }
        });

        // Интерактивность для круговой диаграммы
        const segments = document.querySelectorAll('.pie-segment');
        const detailItems = document.querySelectorAll('.pie-detail-item');
        const pieCenterValue = document.getElementById('pie-value');
        const pieCenterLabel = document.getElementById('pie-label');
        
        // Данные для сегментов
        const segmentData = {
            generation: { value: '9 млн', label: 'Генерация', color: '#ffaa4f' },
            transmission: { value: '6 млн', label: 'Передача', color: '#88ff99' },
            oilgas: { value: '5 млн', label: 'Нефтегаз', color: '#4f9fff' }
        };
        
        // Функция сброса выделения
        function resetHighlight() {
            segments.forEach(seg => {
                seg.style.opacity = '0.9';
                seg.style.strokeWidth = '40';
            });
            detailItems.forEach(item => {
                item.style.borderBottomColor = 'transparent';
                item.style.opacity = '1';
            });
            pieCenterValue.textContent = '20M';
            pieCenterLabel.textContent = 'всего ед.';
        }
        
        // Добавляем обработчики для сегментов
        segments.forEach(segment => {
            const category = segment.dataset.category;
            
            segment.addEventListener('mouseenter', function() {
                // Затемняем все сегменты кроме текущего
                segments.forEach(seg => {
                    if (seg !== this) {
                        seg.style.opacity = '0.3';
                    } else {
                        seg.style.opacity = '1';
                        seg.style.strokeWidth = '45';
                    }
                });
                
                // Подсвечиваем соответствующий пункт в легенде
                detailItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.style.borderBottomColor = segmentData[category].color;
                        item.style.opacity = '1';
                    } else {
                        item.style.opacity = '0.5';
                    }
                });
                
                // Обновляем центральную часть
                pieCenterValue.textContent = segmentData[category].value;
                pieCenterLabel.textContent = segmentData[category].label;
            });
            
            segment.addEventListener('mouseleave', function() {
                resetHighlight();
            });
        });
        
        // Добавляем обработчики для пунктов легенды
        detailItems.forEach(item => {
            const category = item.dataset.category;
            
            item.addEventListener('mouseenter', function() {
                // Подсвечиваем соответствующий сегмент
                segments.forEach(seg => {
                    if (seg.dataset.category === category) {
                        seg.style.opacity = '1';
                        seg.style.strokeWidth = '45';
                    } else {
                        seg.style.opacity = '0.3';
                    }
                });
                
                // Подсвечиваем текущий пункт
                detailItems.forEach(i => {
                    if (i === this) {
                        i.style.borderBottomColor = segmentData[category].color;
                        i.style.opacity = '1';
                    } else {
                        i.style.opacity = '0.5';
                    }
                });
                
                // Обновляем центральную часть
                pieCenterValue.textContent = segmentData[category].value;
                pieCenterLabel.textContent = segmentData[category].label;
            });
            
            item.addEventListener('mouseleave', function() {
                resetHighlight();
            });
        });

        // Анимация активности рынка
        const activityBar = document.getElementById('market-activity-bar');
        const activityText = document.getElementById('market-activity');
        
        if (activityBar) {
            setInterval(() => {
                const baseValue = 87;
                const fluctuation = Math.floor(Math.random() * 5) - 2;
                let newValue = baseValue + fluctuation;
                newValue = Math.max(80, Math.min(94, newValue));
                
                activityBar.style.width = newValue + '%';
                activityText.textContent = newValue + '%';
            }, 5000);
        }
    });



