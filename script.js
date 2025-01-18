document.addEventListener('DOMContentLoaded', () => {
    const wordBtn = document.getElementById('wordBtn');
    const passwordBtn = document.getElementById('passwordBtn');
    const numberBtn = document.getElementById('numberBtn');
    const output = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
    const refreshBtn = document.getElementById('refreshBtn');

    let currentType = '';
    let words = [];

    // Загрузка слов из JSON файла
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data.words;
        })
        .catch(error => console.error('Error loading words:', error));

    const generateWord = () => {
        return words[Math.floor(Math.random() * words.length)];
    };

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const generateNumber = () => {
        return Math.floor(Math.random() * 100).toString();
    };

    const updateOutput = (type) => {
        currentType = type;
        switch (type) {
            case 'word':
                output.value = generateWord();
                break;
            case 'password':
                output.value = generatePassword();
                break;
            case 'number':
                output.value = generateNumber();
                break;
        }
    };

    wordBtn.addEventListener('click', () => updateOutput('word'));
    passwordBtn.addEventListener('click', () => updateOutput('password'));
    numberBtn.addEventListener('click', () => updateOutput('number'));

    copyBtn.addEventListener('click', () => {
        if (output.value) {
            navigator.clipboard.writeText(output.value).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Скопировано!';
                copyBtn.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.backgroundColor = '';
                }, 1500);
            });
        }
    });

    refreshBtn.addEventListener('click', () => {
        if (currentType) {
            updateOutput(currentType);
        }
    });

    output.addEventListener('click', () => {
        if (output.value) {
            navigator.clipboard.writeText(output.value).then(() => {
                alert('Текст скопирован в буфер обмена!');
            });
        } else {
            alert('Сначала выберите тип генерации!');
        }
    });

    // Анимации для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05) rotate(2deg)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Эффект волны при клике на кнопку
    const addRippleEffect = (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    };

    buttons.forEach(button => {
        button.addEventListener('click', addRippleEffect);
    });
});

