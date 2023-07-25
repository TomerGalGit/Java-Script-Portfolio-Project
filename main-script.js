function submitForm(event) {
  event.preventDefault(); 
  const fullName = document.getElementById('fullNameInput').value;
  const email = document.getElementById('emailInput').value;
  const phone = document.getElementById('phoneInput').value;
  const message = document.getElementById('messageInput').value;

  const contactData = {
    fullName: fullName,
    email: email,
    phone: phone,
    message: message
  };

  localStorage.setItem('contact', JSON.stringify(contactData));

  openFormModal();

  document.getElementById('fullNameInput').value = '';
  document.getElementById('emailInput').value = '';
  document.getElementById('phoneInput').value = '';
  document.getElementById('messageInput').value = '';
}

const modal = document.getElementById('formModal');
const closeBtn = modal.querySelector('.close');
const modalDisplay = document.querySelector('.modal-content')
function openFormModal() {

  const storedContactData = JSON.parse(localStorage.getItem('contact'));

  document.getElementById('modalFullName').textContent = storedContactData.fullName || '';
  document.getElementById('modalEmail').textContent = storedContactData.email || '';
  document.getElementById('modalPhone').textContent = storedContactData.phone || '';
  document.getElementById('modalMessage').textContent = storedContactData.message || '';

  modal.style.display = 'block';
}
closeBtn.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none' ;
  modalDisplay.style.display = ' none !important;' ;
}
if (localStorage.getItem('contact')) {
  openFormModal();
}