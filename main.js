// Элементы формы
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const topicSelect = document.getElementById('topic');
const messageTextarea = document.getElementById('message');

// Открытие модального окна
document.getElementById('openDialog').addEventListener('click', () => {
  document.getElementById('contactDialog').showModal();
});

// Закрытие модального окна
document.getElementById('closeDialog').addEventListener('click', () => {
  document.getElementById('contactDialog').close();
});

// Маска для телефона
phoneInput.addEventListener('input', function() {
  let digits = this.value.replace(/\D/g, '').slice(0, 11);
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);

  let formatted = '';
  if (digits.length > 0) {
    formatted = '+7 (';
    if (digits.length > 1) formatted += digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ';
    if (digits.length >= 5) formatted += digits.slice(4, 7);
    if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 10) formatted += '-' + digits.slice(9, 11);
  }
  this.value = formatted;
});

// Функция для показа ошибок
function showError(input, message) {
  input.setCustomValidity(message);
  input.setAttribute('aria-invalid', 'true');
  input.reportValidity();
  input.addEventListener('input', function() {

