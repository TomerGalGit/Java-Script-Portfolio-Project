function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
  
    // Retrieve the form input values
    const fullName = document.getElementById('fullNameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const message = document.getElementById('messageInput').value;
  
    // Create an object to store the form data
    const contactData = {
      fullName: fullName,
      email: email,
      phone: phone,
      message: message
    };
  
    // Store the form data in localStorage
    localStorage.setItem('contact', JSON.stringify(contactData));
  
    openFormModal();
  }
  
// Function to open the form modal
function openFormModal() {
    const modal = document.getElementById('formModal');
    const closeBtn = modal.querySelector('.close');
  
    // Retrieve the form data from localStorage
    const storedContactData = JSON.parse(localStorage.getItem('contact'));
  
    // Update the modal with the form data
    document.getElementById('modalFullName').textContent = storedContactData.fullName || '';
    document.getElementById('modalEmail').textContent = storedContactData.email || '';
    document.getElementById('modalPhone').textContent = storedContactData.phone || '';
    document.getElementById('modalMessage').textContent = storedContactData.message || '';
  
    // Display the modal
    modal.style.display = 'block';
  
    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', closeModal);
  
    // Close the modal when the user clicks outside the modal
    window.addEventListener('click', outsideClick);
  
    // Function to close the modal
    function closeModal() {
      modal.style.display = 'none';
      closeBtn.removeEventListener('click', closeModal);
      window.removeEventListener('click', outsideClick);
    }
  
    // Function to close the modal when clicking outside
    function outsideClick(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        closeBtn.removeEventListener('click', closeModal);
        window.removeEventListener('click', outsideClick);
      }
    }
  }
  
  // Check if contact data exists in localStorage
  if (localStorage.getItem('contact')) {
    openFormModal();
  } t6