'use strict';

class KAI90sTheme {
    constructor() {
        this.isActive = false;
        this.storageKey = 'kai-90s-theme-enabled';
        this.themeClass = 'kai-90s-theme';
        this.init();
    }

    init() {
        this.loadState();
        this.createToggleButton();
        this.injectStyles();
        if (this.isActive) {
            this.applyTheme();
        }
    }

    // Загружаем состояние темы из localStorage
    loadState() {
        const saved = localStorage.getItem(this.storageKey);
        this.isActive = saved === 'true';
    }

    // Сохраняем состояние темы в localStorage
    saveState() {
        localStorage.setItem(this.storageKey, this.isActive.toString());
    }

    createToggleButton() {
        // Проверяем, существует ли кнопка через getElementById
        if (document.getElementById('kai-90s-toggle')) {
            return;
        }

        // Ищем контейнер для кнопки через querySelector с комплексным селектором
        const buttonContainer = document.querySelector('.box_links, .header, nav, .navigation, .menu');
        
        // Если контейнер не найден, создаем плавающую кнопку
        if (!buttonContainer) {
            console.log('Контейнер не найден, создаем плавающую кнопку');
            this.createFloatingButton();
            return;
        }

        const button = document.createElement('button');
        button.id = 'kai-90s-toggle';
        button.innerHTML = this.isActive ? ' 90s ON!' : ' 90s MODE';
        button.title = 'Переключить 90s стиль';
        
        // Применяем стили кнопки в стиле 90-х
        Object.assign(button.style, {
            padding: '10px 15px',
            backgroundColor: this.isActive ? '#ff00ff' : '#0000ff',
            color: '#ffffff',
            border: '3px outset #00ffff',
            borderRadius: '0px',
            cursor: 'pointer',
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '5px',
            textShadow: '2px 2px 0 #000000',
            boxShadow: '0 0 10px #ff00ff',
            zIndex: '10000',
            position: 'relative'
        });

        // Добавляем эффекты при наведении через parentElement для поиска связанных элементов
        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = '#00ff00';
            button.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = this.isActive ? '#ff00ff' : '#0000ff';
            button.style.transform = 'scale(1)';
        });

        button.addEventListener('click', () => this.toggleTheme());

        // Добавляем кнопку в контейнер через children для проверки структуры
        if (buttonContainer.children.length > 0) {
            buttonContainer.insertBefore(button, buttonContainer.children[0]);
        } else {
            buttonContainer.appendChild(button);
        }
    }

    // Создаем плавающую кнопку если не нашли подходящий контейнер
    createFloatingButton() {
        const button = document.createElement('button');
        button.id = 'kai-90s-toggle';
        button.innerHTML = this.isActive ? ' 90s ON!' : ' 90s MODE';
        
        Object.assign(button.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '10000',
            padding: '10px 15px',
            backgroundColor: this.isActive ? '#ff00ff' : '#0000ff',
            color: 'white',
            border: '3px outset #00ffff',
            fontFamily: '"Comic Sans MS", cursive',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer'
        });

        button.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(button);
    }

    // Внедряем CSS стили для темы
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .kai-90s-theme {
                /* Кислотный фон с анимацией */
                background: linear-gradient(45deg, #ff00ff, #00ffff, #00ff00, #ffff00, #ff00ff) !important;
                background-size: 400% 400% !important;
                animation: gradientShift 8s ease infinite !important;
                
                /* Кастомный анимированный курсор */
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="6" fill="%23ff00ff"/><animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite"/></svg>'), auto !important;
            }

            .kai-90s-theme * {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="4" fill="%2300ffff"/><animate attributeName="r" values="4;8;4" dur="0.8s" repeatCount="indefinite"/></svg>'), auto !important;
            }

            /* Анимация мигающего текста */
            .kai-90s-theme .blink-text {
                animation: blink 2s infinite !important;
            }

            .kai-90s-theme h1, .kai-90s-theme .main-heading {
                animation: blink 3s infinite !important;
            }

            /* Кейфреймы для анимаций */
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* Специфичные стили для 90-х */
            .kai-90s-theme #page_wrapper {
                background: rgba(0, 0, 0, 0.8) !important;
                border: 8px ridge #ff6600 !important;
                margin: 10px !important;
                padding: 15px !important;
                box-shadow: 0 0 50px #ff00ff !important;
            }

            .kai-90s-theme .main_slider_holder,
            .kai-90s-theme .news_box,
            .kai-90s-theme .content {
                background: linear-gradient(135deg, #9b41d4, #00ffff) !important;
                border: 4px dotted #00ff00 !important;
                padding: 20px !important;
                margin: 15px 0 !important;
                box-shadow: 0 0 25px #ff00ff inset !important;
            }

            .kai-90s-theme h1, .kai-90s-theme h2, .kai-90s-theme h3 {
                color: #00ff00 !important;
                text-shadow: 3px 3px 0 #ff00ff, -1px -1px 0 #0000ff !important;
                font-family: "Comic Sans MS", cursive !important;
                text-align: center !important;
            }

            .kai-90s-theme p, .kai-90s-theme div, .kai-90s-theme span {
                color: #00ffff !important;
                font-size: 18px !important;
                font-family: "Comic Sans MS", cursive !important;
                text-shadow: 1px 1px 0 #000000 !important;
            }

            .kai-90s-theme a {
                color: #ff6600 !important;
                text-decoration: underline wavy !important;
                font-weight: bold !important;
            }

            .kai-90s-theme a:hover {
                color: #00ff00 !important;
                background-color: #ff00ff !important;
                padding: 2px 5px !important;
            }

            .kai-90s-theme button, .kai-90s-theme .btn {
                background: linear-gradient(to bottom, #ff00ff, #9b41d4) !important;
                border: 3px outset #00ffff !important;
                color: #000000 !important;
                font-weight: bold !important;
                padding: 8px 15px !important;
                font-family: "Comic Sans MS", cursive !important;
            }

            .kai-90s-theme input, .kai-90s-theme textarea {
                background-color: #000000 !important;
                color: #00ff00 !important;
                border: 2px solid #ff00ff !important;
                font-family: "Comic Sans MS", cursive !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Переключаем тему
    toggleTheme() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.applyTheme();
        } else {
            this.removeTheme();
        }
        this.saveState();
        this.updateButtonState();
    }

    // Применяем тему
    applyTheme() {
        document.body.classList.add(this.themeClass);
        
        // Используем getElementById для основного контейнера
        const pageWrapper = document.getElementById('page_wrapper');
        if (pageWrapper) {
            pageWrapper.classList.add(this.themeClass);
        }

        // Используем querySelectorAll с комплексным селектором для множественных элементов
        const contentSections = document.querySelectorAll('.main_slider_holder, .news_box, .content, .container');
        contentSections.forEach(section => {
            section.classList.add(this.themeClass);
        });

        // Добавляем эффект мигания важному тексту через children
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach((heading, index) => {
            heading.classList.add(this.themeClass);
            if (index === 0) {
                heading.classList.add('blink-text');
            }
        });

        // Стилизуем навигацию через parentElement и комплексный селектор
        const navElements = document.querySelectorAll('nav, .navigation, .menu, .nav');
        navElements.forEach(nav => {
            nav.classList.add(this.themeClass);
            if (nav.parentElement) {
                const navChildren = Array.from(nav.children);
                navChildren.forEach(child => {
                    child.classList.add(this.themeClass);
                });
            }
        });

        console.log('Тема 90-х применена!');
    }

    // Удаляем тему
    removeTheme() {
        document.body.classList.remove(this.themeClass);
        
        // Удаляем со всех элементов
        const themedElements = document.querySelectorAll('.kai-90s-theme, .blink-text');
        themedElements.forEach(el => {
            el.classList.remove(this.themeClass, 'blink-text');
        });
        
        console.log('Тема 90-х удалена!');
    }

    // Обновляем состояние кнопки
    updateButtonState() {
        const button = document.getElementById('kai-90s-toggle');
        if (button) {
            button.innerHTML = this.isActive ? ' 90s ON!' : ' 90s MODE';
            button.style.backgroundColor = this.isActive ? '#ff00ff' : '#0000ff';
            button.style.borderColor = this.isActive ? '#00ff00' : '#00ffff';
        }
    }
}

// Инициализируем расширение когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new KAI90sTheme();
    });
} else {
    new KAI90sTheme();
}