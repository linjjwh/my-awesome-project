// Открытие модального окна
document.getElementById('openDialog').addEventListener('click', function() {
    document.getElementById('contactDialog').showModal();
});

// Закрытие модального окна
document.getElementById('closeDialog').addEventListener('click', function() {
    document.getElementById('contactDialog').close();
});

// Валидация формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!this.checkValidity()) {
        // Показать ошибки
        this.reportValidity();
        return;
    }

    // Если форма валидна
    alert('Форма успешно отправлена!');
    this.reset();
    document.getElementById('contactDialog').close();
});

// Маска для телефона
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    // Удаляем всё кроме цифр
    let digits = this.value.replace(/\D/g, '');

    // Ограничиваем до 11 цифр (первая 7 или 8)
    digits = digits.slice(0, 11);

    // Если номер начинается с 8, меняем на 7
    if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
    }

    // Форматируем номер
    let formatted = '';
    if (digits.length > 0) {
        formatted = '+7 (';
        if (digits.length > 1) {
            formatted += digits.slice(1, 4);
        }
        if (digits.length >= 4) {
            formatted += ') ';
        }
        if (digits.length >= 5) {
            formatted += digits.slice(4, 7);
        }
        if (digits.length >= 8) {
            formatted += '-' + digits.slice(7, 9);
        }
        if (digits.length >= 10) {
            formatted += '-' + digits.slice(9, 11);
        }
    }

    this.value = formatted;
});

// Валидация телефона при отправке формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // ... остальная валидация ...

    // Проверка телефона
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(phoneInput.value)) {
        phoneInput.setCustomValidity('Введите телефон в формате: +7 (900) 000-00-00');
        phoneInput.reportValidity();
        e.preventDefault();
        return;
    }
});

// Функция для показа ошибок
function showError(input, message) {
    input.setCustomValidity(message);
    input.setAttribute('aria-invalid', 'true');
    input.reportValidity();

    // Убираем ошибку при следующем вводе
    input.addEventListener('input', function() {
        this.setCustomValidity('');
        this.removeAttribute('aria-invalid');
    }, { once: true });
}

// Обновлённая валидация формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Сброс предыдущих ошибок
    const inputs = this.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.setCustomValidity('');
        input.removeAttribute('aria-invalid');
    });

    // Проверка валидности
    if (!this.checkValidity()) {
        // Показываем конкретные ошибки
        // Проверка ИМЕНИ
        if (!nameInput.value) {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
        } else if (nameInput.value.length < 2) {
            showError(nameInput, 'Имя должно содержать минимум 2 символа');
        }

        // Проверка EMAIL
        if (!emailInput.value) {
            showError(emailInput, 'Пожалуйста, введите email');
        } else if (!emailInput.validity.valid || /[а-яё]/i.test(emailInput.value)) {
            showError(emailInput, 'Email не должен содержать русские буквы');
        } else if (!emailInput.validity.valid) {
            showError(emailInput, 'Введите корректный email адрес (например: example@mail.com)');
        }

        // Проверка ТЕЛЕФОНА
        if (!phoneInput.value) {
            showError(phoneInput, 'Пожалуйста, введите телефон');
        } else if (!phoneInput.validity.valid) {
            showError(phoneInput, 'Введите телефон в формате: +7 (900) 000-00-00');
        }

        // Проверка ТЕМЫ
        if (!topicSelect.value) {
            showError(topicSelect, 'Пожалуйста, выберите тему обращения');
        }

        // Проверка СООБЩЕНИЯ
        if (!messageTextarea.value) {
            showError(messageTextarea, 'Пожалуйста, введите ваше сообщение');
        } else if (messageTextarea.value.length < 10) {
            showError(messageTextarea, 'Сообщение должно содержать минимум 10 символов');
        }

        return;
    }

    // Если форма валидна
    alert('Спасибо! Ваше сообщение отправлено.');
    this.reset();
    document.getElementById('contactDialog').close();
});