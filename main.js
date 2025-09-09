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