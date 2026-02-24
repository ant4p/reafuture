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







// АРХИВ
    document.addEventListener('DOMContentLoaded', function() {
        // Переключение между тремя лентами
        const localBtn = document.getElementById('switch-local');
        const globalBtn = document.getElementById('switch-global');
        const energyBtn = document.getElementById('switch-energy');
        const localTimeline = document.getElementById('timeline-local');
        const globalTimeline = document.getElementById('timeline-global');
        const energyTimeline = document.getElementById('timeline-energy');
        const timelineObject = document.getElementById('timeline-object');
        
        localBtn.addEventListener('click', function() {
            // Активируем локальную ленту
            localTimeline.style.display = 'block';
            globalTimeline.style.display = 'none';
            energyTimeline.style.display = 'none';
            
            // Обновляем стили кнопок
            resetSwitchButtons();
            localBtn.classList.add('active-switch');
            localBtn.style.background = 'rgba(79, 159, 255, 0.2)';
            localBtn.style.borderColor = '#4f9fff';
            localBtn.style.color = '#ffffff';
            
            // Обновляем название объекта
            timelineObject.textContent = 'РЭА_МИН[ЭНЕРГО]';
        });
        
        globalBtn.addEventListener('click', function() {
            // Активируем глобальную ленту
            localTimeline.style.display = 'none';
            globalTimeline.style.display = 'block';
            energyTimeline.style.display = 'none';
            
            // Обновляем стили кнопок
            resetSwitchButtons();
            globalBtn.classList.add('active-switch');
            globalBtn.style.background = 'rgba(127, 192, 255, 0.2)';
            globalBtn.style.borderColor = '#4f9fff';
            globalBtn.style.color = '#ffffff';
            
            // Обновляем название объекта
            timelineObject.textContent = 'ГЛОБАЛЬНЫЙ[МИР]';
        });
        
        energyBtn.addEventListener('click', function() {
            // Активируем энергетическую ленту
            localTimeline.style.display = 'none';
            globalTimeline.style.display = 'none';
            energyTimeline.style.display = 'block';
            
            // Обновляем стили кнопок
            resetSwitchButtons();
            energyBtn.classList.add('active-switch');
            energyBtn.style.background = 'rgba(136, 255, 136, 0.2)';
            energyBtn.style.borderColor = '#88ff88';
            energyBtn.style.color = '#ffffff';
            
            // Обновляем название объекта
            timelineObject.textContent = 'ЭНЕРГЕТИКА[СИСТЕМА]';
        });
        
        function resetSwitchButtons() {
            [localBtn, globalBtn, energyBtn].forEach(btn => {
                btn.classList.remove('active-switch');
                btn.style.background = 'transparent';
                btn.style.borderColor = '#4f9fff';
                btn.style.color = '#8fc0ff';
            });
        }
        
        // Функция для скролла к году - ИСПРАВЛЕННАЯ
        window.scrollToYear = function(year) {
            // Определяем, какая лента сейчас активна
            let activeTimeline;
            if (localTimeline.style.display === 'block') {
                activeTimeline = localTimeline;
            } else if (globalTimeline.style.display === 'block') {
                activeTimeline = globalTimeline;
            } else if (energyTimeline.style.display === 'block') {
                activeTimeline = energyTimeline;
            } else {
                // По умолчанию локальная (на случай, если display не установлен)
                activeTimeline = localTimeline;
            }
            
            // Ищем элементы только внутри активной ленты
            const items = activeTimeline.querySelectorAll('.timeline-item');
            for (let item of items) {
                if (item.dataset.year == year) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    break;
                }
            }
        };
        
        // Прогресс-бар и анимация появления
        window.addEventListener('scroll', function() {
            // Определяем активную ленту для подсветки элементов
            let activeTimeline;
            if (localTimeline.style.display === 'block') {
                activeTimeline = localTimeline;
            } else if (globalTimeline.style.display === 'block') {
                activeTimeline = globalTimeline;
            } else if (energyTimeline.style.display === 'block') {
                activeTimeline = energyTimeline;
            } else {
                activeTimeline = localTimeline;
            }
            
            const items = activeTimeline.querySelectorAll('.timeline-item');
            const progressFill = document.getElementById('progress-fill');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Прогресс-бар (работает для всей страницы, оставляем как есть)
            const scrollHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollPercent = (scrollPosition / scrollHeight) * 100;
            if (progressFill) {
                progressFill.style.height = Math.min(100, scrollPercent) + '%';
            }
            
            // Подсветка видимых элементов только в активной ленте
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
    });






// ЛАБОРАТОРИЯ 
document.addEventListener('DOMContentLoaded', function() {
        // Переключение между экспериментами
        const quantumBtn = document.getElementById('exp-quantum');
        const neuralBtn = document.getElementById('exp-neural');
        const bioBtn = document.getElementById('exp-bio');
        
        const quantumContent = document.getElementById('exp-quantum-content');
        const neuralContent = document.getElementById('exp-neural-content');
        const bioContent = document.getElementById('exp-bio-content');
        
        function resetExpButtons() {
            [quantumBtn, neuralBtn, bioBtn].forEach(btn => {
                btn.classList.remove('active-exp');
                btn.style.background = 'transparent';
                btn.style.color = '#c0ffc0';
            });
        }
        
        quantumBtn.addEventListener('click', function() {
            resetExpButtons();
            quantumBtn.classList.add('active-exp');
            quantumBtn.style.background = 'rgba(136, 255, 136, 0.15)';
            quantumBtn.style.color = '#ffffff';
            
            quantumContent.style.display = 'block';
            neuralContent.style.display = 'none';
            bioContent.style.display = 'none';
        });
        
        neuralBtn.addEventListener('click', function() {
            resetExpButtons();
            neuralBtn.classList.add('active-exp');
            neuralBtn.style.background = 'rgba(136, 255, 136, 0.15)';
            neuralBtn.style.color = '#ffffff';
            
            quantumContent.style.display = 'none';
            neuralContent.style.display = 'block';
            bioContent.style.display = 'none';
        });
        
        bioBtn.addEventListener('click', function() {
            resetExpButtons();
            bioBtn.classList.add('active-exp');
            bioBtn.style.background = 'rgba(136, 255, 136, 0.15)';
            bioBtn.style.color = '#ffffff';
            
            quantumContent.style.display = 'none';
            neuralContent.style.display = 'none';
            bioContent.style.display = 'block';
        });
        
        // Интерактивность для квантовых гейтов
        const gates = document.querySelectorAll('.quantum-gate');
        const prob0 = document.getElementById('prob-0');
        const prob1 = document.getElementById('prob-1');
        const prob0Bar = document.getElementById('prob-0-bar');
        const prob1Bar = document.getElementById('prob-1-bar');
        const qubitStates = document.querySelectorAll('.qubit-state');
        
        gates.forEach(gate => {
            gate.addEventListener('click', function() {
                // Случайное изменение вероятностей для демонстрации
                const newProb0 = (Math.random() * 0.3 + 0.35).toFixed(2);
                const newProb1 = (1 - parseFloat(newProb0)).toFixed(2);
                
                prob0.textContent = newProb0;
                prob1.textContent = newProb1;
                prob0Bar.style.width = (parseFloat(newProb0) * 100) + '%';
                prob1Bar.style.width = (parseFloat(newProb1) * 100) + '%';
                
                // Изменяем состояния кубитов
                qubitStates.forEach((state, index) => {
                    const states = ['|0⟩', '|1⟩', '|+⟩', '|−⟩', '|i⟩', '|-i⟩'];
                    const randomState = states[Math.floor(Math.random() * states.length)];
                    state.textContent = randomState;
                });
                
                // Добавляем запись в лог
                const log = document.getElementById('experiment-log');
                const gateName = this.textContent.trim();
                const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const newEntry = document.createElement('div');
                newEntry.style.color = '#88ff88';
                newEntry.textContent = `[${time}] ▶ Применен гейт ${gateName}`;
                log.appendChild(newEntry);
                log.scrollTop = log.scrollHeight;
            });
        });
        
        // Анимация активности графика
        const graphBars = document.querySelectorAll('#activity-graph div');
        const tempBar = document.getElementById('temp-bar');
        const tempValue = document.getElementById('temp-value');
        const pressureBar = document.getElementById('pressure-bar');
        const pressureValue = document.getElementById('pressure-value');
        const magnetBar = document.getElementById('magnet-bar');
        const magnetValue = document.getElementById('magnet-value');
        const powerBar = document.getElementById('power-bar');
        const powerValue = document.getElementById('power-value');
        
        setInterval(() => {
            // Обновляем график активности
            graphBars.forEach(bar => {
                const newHeight = Math.floor(Math.random() * 100) + 20;
                bar.style.height = newHeight + 'px';
            });
            
            // Обновляем параметры
            const temp = (-273.1 + (Math.random() * 0.2)).toFixed(2);
            tempValue.textContent = temp + '°C';
            tempBar.style.width = (98 + (Math.random() - 0.5) * 4) + '%';
            
            const pressure = (1.1 + Math.random() * 0.3).toFixed(1);
            pressureValue.textContent = pressure + 'e-10 Па';
            pressureBar.style.width = (76 + (Math.random() - 0.5) * 10) + '%';
            
            const magnet = (8.0 + Math.random() * 0.8).toFixed(1);
            magnetValue.textContent = magnet + ' Тл';
            magnetBar.style.width = (83 + (Math.random() - 0.5) * 8) + '%';
            
            const power = 247 + Math.floor(Math.random() * 20) - 10;
            powerValue.textContent = power + ' кВт';
            powerBar.style.width = (62 + (Math.random() - 0.5) * 8) + '%';
        }, 3000);
        
        // Кнопка запуска нового эксперимента
        const newExpBtn = document.getElementById('new-experiment');
        newExpBtn.addEventListener('click', function() {
            const log = document.getElementById('experiment-log');
            const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const newEntry = document.createElement('div');
            newEntry.style.color = '#88ff88';
            
            const experiments = [
                'Квантовый эксперимент Q-2046-' + Math.floor(Math.random() * 1000),
                'Нейроинтерфейс N-7 тест #' + Math.floor(Math.random() * 100),
                'Биотехнологический протокол CRISPR-' + Math.floor(Math.random() * 20),
                'Калибровка кубитов матрицы ' + Math.floor(Math.random() * 8),
                'Измерение квантовой запутанности'
            ];
            const exp = experiments[Math.floor(Math.random() * experiments.length)];
            
            newEntry.textContent = `[${time}] ▶ Запуск: ${exp}`;
            log.appendChild(newEntry);
            log.scrollTop = log.scrollHeight;
            
            // Визуальный эффект на кнопке
            this.style.background = 'rgba(136, 255, 136, 0.2)';
            setTimeout(() => {
                this.style.background = 'transparent';
            }, 200);
        });
    });






// ОСЬ

document.addEventListener('DOMContentLoaded', function() {
        // Интерактивность для узлов сети (показ тултипов)
        const nodes = document.querySelectorAll('.network-node');
        nodes.forEach(node => {
            const tooltip = node.querySelector('.node-tooltip');
            
            node.addEventListener('mouseenter', function() {
                if (tooltip) tooltip.style.display = 'block';
                // Подсветка узла
                const circle = this.querySelector('div:first-child');
                if (circle) {
                    circle.style.transform = 'scale(1.1)';
                    circle.style.transition = 'all 0.2s';
                }
            });
            
            node.addEventListener('mouseleave', function() {
                if (tooltip) tooltip.style.display = 'none';
                const circle = this.querySelector('div:first-child');
                if (circle) {
                    circle.style.transform = 'scale(1)';
                }
            });
            
            node.addEventListener('click', function() {
                // Добавляем запись в лог
                const log = document.getElementById('live-log');
                const nodeName = this.querySelector('span:not([style])').textContent;
                const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const newEntry = document.createElement('div');
                newEntry.style.color = '#88ff88';
                newEntry.textContent = `[${time}] * selected node: ${nodeName}`;
                log.appendChild(newEntry);
                log.scrollTop = log.scrollHeight;
            });
        });

        // Анимация для линий связи (пакеты данных)
        setInterval(() => {
            const packets = document.querySelectorAll('.data-packet');
            packets.forEach(packet => {
                // Случайное изменение скорости анимации для разнообразия
                const duration = 1.5 + Math.random() * 2;
                packet.style.animation = `movePacket ${duration}s infinite`;
            });
        }, 5000);

        // Обновление статистики в реальном времени
        const activeNodes = document.getElementById('active-nodes');
        const bandwidth = document.getElementById('bandwidth');
        const latency = document.getElementById('latency');
        const dataFlow = document.getElementById('data-flow');
        const trafficGraph = document.querySelectorAll('#traffic-graph div');
        const trafficIndicator = document.getElementById('traffic-indicator');
        
        setInterval(() => {
            // Случайные изменения для имитации реальной сети
            const nodesChange = Math.floor(Math.random() * 5) - 2;
            let newNodes = 47 + nodesChange;
            newNodes = Math.max(44, Math.min(52, newNodes));
            if (activeNodes) activeNodes.textContent = newNodes;
            
            const bwChange = (Math.random() * 2 - 1).toFixed(1);
            let newBw = (10 + parseFloat(bwChange)).toFixed(1);
            newBw = Math.max(8.5, Math.min(11.5, newBw));
            if (bandwidth) bandwidth.textContent = newBw;
            
            const latChange = (Math.random() * 0.2 - 0.1).toFixed(2);
            let newLat = (0.4 + parseFloat(latChange)).toFixed(2);
            newLat = Math.max(0.2, Math.min(0.8, newLat));
            if (latency) latency.textContent = newLat;
            
            // Обновление потока данных
            const trafficValue = (0.8 + Math.random() * 0.8).toFixed(1);
            if (trafficIndicator) trafficIndicator.textContent = `⬆ ${trafficValue} Gb/s`;
            
            // Обновление графика трафика
            trafficGraph.forEach(bar => {
                const newHeight = Math.floor(Math.random() * 80) + 20;
                bar.style.height = newHeight + 'px';
            });
            
            // Обновление текста потока данных
            if (dataFlow) {
                const logCount = 4521 + Math.floor(Math.random() * 50) - 25;
                dataFlow.textContent = `ПОТОК ДАННЫХ: ${trafficValue} TB/s | ЛОГОВ: ${logCount}`;
            }
            
            // Иногда добавляем случайную запись в лог
            if (Math.random() > 0.7) {
                const log = document.getElementById('live-log');
                const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const events = [
                    `node NODE-${Math.floor(Math.random() * 50)} latency: ${(Math.random() * 5).toFixed(2)}ms`,
                    `interface eth${Math.floor(Math.random() * 4)}: RX ${(Math.random() * 2).toFixed(2)} Gb/s`,
                    `route ${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 255)}.0.0/16 updated`,
                    `new node registered: NODE-${Math.floor(Math.random() * 100)} (10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)})`,
                    `packet loss detected on link ${Math.floor(Math.random() * 5)}: ${(Math.random() * 0.5).toFixed(2)}%`
                ];
                const event = events[Math.floor(Math.random() * events.length)];
                const colors = ['#6aff8c', '#ffaa6a', '#4f9fff', '#88ff88'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                const newEntry = document.createElement('div');
                newEntry.style.color = color;
                newEntry.textContent = `[${time}] ${color === '#ffaa6a' ? '⚠' : '•'} ${event}`;
                log.appendChild(newEntry);
                
                // Ограничим количество записей в логе
                if (log.children.length > 12) {
                    log.removeChild(log.children[0]);
                }
                log.scrollTop = log.scrollHeight;
            }
        }, 3000);

        // Обработка команд управления
        const commandOutput = document.getElementById('command-output');
        const controlButtons = document.querySelectorAll('.network-control');
        
        controlButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.dataset.action;
                const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                
                let output = '';
                switch(action) {
                    case 'ping':
                        output = `[${time}] PING 10.0.0.1 (10.0.0.1): 56 data bytes<br>`;
                        output += `[${time}] 64 bytes from 10.0.0.1: icmp_seq=0 ttl=64 time=${(Math.random() * 10 + 5).toFixed(2)} ms<br>`;
                        output += `[${time}] 64 bytes from 10.0.0.1: icmp_seq=1 ttl=64 time=${(Math.random() * 10 + 5).toFixed(2)} ms<br>`;
                        output += `[${time}] 64 bytes from 10.0.0.1: icmp_seq=2 ttl=64 time=${(Math.random() * 10 + 5).toFixed(2)} ms<br>`;
                        output += `[${time}] --- 10.0.0.1 ping statistics ---<br>`;
                        output += `[${time}] 3 packets transmitted, 3 packets received, 0% packet loss`;
                        break;
                    case 'traceroute':
                        output = `[${time}] traceroute to 10.0.1.34 (10.0.1.34)<br>`;
                        output += `[${time}]  1  10.0.0.1 (10.0.0.1)  0.4 ms<br>`;
                        output += `[${time}]  2  10.0.5.23 (10.0.5.23)  1.2 ms<br>`;
                        output += `[${time}]  3  10.0.8.47 (10.0.8.47)  2.8 ms<br>`;
                        output += `[${time}]  4  10.0.1.34 (10.0.1.34)  3.1 ms`;
                        break;
                    case 'config':
                        output = `[${time}] Current network configuration:<br>`;
                        output += `[${time}]   hostname: network-hub-01<br>`;
                        output += `[${time}]   IP forwarding: enabled<br>`;
                        output += `[${time}]   MTU: 1500<br>`;
                        output += `[${time}]   routing table: 47 entries<br>`;
                        output += `[${time}]   firewall: active (23 rules)`;
                        break;
                    case 'scan':
                        output = `[${time}] Scanning network 10.0.0.0/16...<br>`;
                        output += `[${time}] Found ${Math.floor(Math.random() * 20) + 40} active hosts<br>`;
                        output += `[${time}] Open ports: 22, 80, 443, 8080, 8443<br>`;
                        output += `[${time}] New device detected: 10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
                        break;
                }
                
                commandOutput.innerHTML = `<span style="color: #88ff88;">$</span> <span style="color: #b0e0ff;">${action}</span><br>${output}`;
                
                // Добавляем запись в лог
                const log = document.getElementById('live-log');
                const newEntry = document.createElement('div');
                newEntry.style.color = '#88ff88';
                newEntry.textContent = `[${time}] • executed command: ${action}`;
                log.appendChild(newEntry);
                if (log.children.length > 12) {
                    log.removeChild(log.children[0]);
                }
                log.scrollTop = log.scrollHeight;
            });
        });

        // Обновление описания сети при изменении статистики
        setInterval(() => {
            const desc = document.getElementById('network-description');
            if (desc && activeNodes) {
                const standby = Math.floor(Math.random() * 5) + 1;
                desc.innerHTML = `Обнаружено ${activeNodes.textContent} активных узлов. ${standby} узла в режиме ожидания. Пропускная способность канала ${bandwidth ? bandwidth.textContent : '10'} Гбит/с.`;
            }
        }, 5000);
    });


    // РИСКИ

        document.addEventListener('DOMContentLoaded', function() {
        // Интерактивность для карточек (разворачивание)
        const cards = document.querySelectorAll('.risk-card');
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

        // Анимация графика тренда
        const trendBars = document.querySelectorAll('.trend-bar');
        const trendValue = document.getElementById('trend-value');
        
        setInterval(() => {
            trendBars.forEach(bar => {
                const barDiv = bar.querySelector('div:first-child');
                const newHeight = Math.floor(Math.random() * 50) + 35;
                barDiv.style.height = newHeight + 'px';
            });
            
            // Обновляем тренд
            const trend = (Math.random() * 6 - 3).toFixed(1);
            trendValue.textContent = `ОБЩИЙ ТРЕНД: ${trend > 0 ? '+' : ''}${trend}%`;
        }, 4000);

        // Анимация для интегрального риска
        const integralRisk = document.getElementById('integral-risk');
        const integralBar = document.getElementById('integral-bar');
        
        setInterval(() => {
            const change = (Math.random() * 4 - 2).toFixed(1);
            let newValue = (27.3 + parseFloat(change)).toFixed(1);
            newValue = Math.max(20, Math.min(35, newValue));
            
            integralRisk.textContent = newValue;
            integralBar.style.width = newValue + '%';
        }, 5000);
    });

