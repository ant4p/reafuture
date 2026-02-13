(function() {
    "use strict";

    // ---------- МАТРИЧНЫЙ ДОЖДЬ ----------
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯабвгдежзиклмнопрстуфхцчшщэюя~!@#$%^&*()_+{}[]:;<>,.?/|\\=+-*/";
    
    let fontSize = 18;
    let columnCount = 0;
    let drops = [];
    
    function getMatrixColor(isHead = false) {
        if (isHead) return '#c0e2ff';
        const colors = ['#3c8db0', '#4f9fff', '#68b0e0', '#7fc0ff', '#5da0d0', '#48b0e8', '#2f8cb0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columnCount = Math.floor(canvas.width / (fontSize * 0.8));
        drops = new Array(columnCount);
        for (let i = 0; i < columnCount; i++) {
            drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
        }
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(11, 11, 14, 0.062)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = fontSize + 'px "Courier New", "MS Gothic", "Lucida Console", monospace';
        
        for (let i = 0; i < columnCount; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * (fontSize * 0.8);
            const y = drops[i] * fontSize;
            
            const isHead = (Math.random() > 0.95);
            ctx.fillStyle = getMatrixColor(isHead);
            ctx.fillText(char, x, y);
            
            if (y > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }
            drops[i] += 0.5 + Math.random() * 0.4;
            
            if (Math.random() > 0.8) {
                ctx.fillStyle = '#2a607a';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y + fontSize * 0.6);
            }
        }
    }

    let matrixInterval;
    function startMatrix() {
        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 38);
    }

    window.addEventListener('resize', function() {
        resizeCanvas();
    });

    resizeCanvas();
    startMatrix();

    window.addEventListener('beforeunload', function() {
        clearInterval(matrixInterval);
    });

    // ---------- ЭФФЕКТ ПЕЧАТИ ----------
    const textElement = document.getElementById('typed-text');
    const button = document.getElementById('join-button');
    
    const fullText = "connect_to_virtual_universe\nРЭА МИН[ЭНЕРГО]***\n...connect...\n...connect...\n...\n...\n...\nдоступ разрешен и рекомендован\n...\nДОБРО ПОЖАЛОВАТЬ В БУДУЩЕЕ!";
    
    let currentIndex = 0;
    
    function typeEffect() {
        if (currentIndex < fullText.length) {
            textElement.textContent = fullText.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeEffect, 130);
        } else {
            textElement.style.animation = 'none';
            textElement.style.borderRight = 'none';
            
            setTimeout(() => {
                button.classList.add('visible');
            }, 200);
        }
    }

    setTimeout(() => {
        typeEffect();
    }, 300);
    
})();