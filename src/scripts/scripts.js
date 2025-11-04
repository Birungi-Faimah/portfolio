// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const submitBtn = document.getElementById('submit-btn');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formMessage = document.getElementById('form-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  let valid = true;

  // Disable submit button to prevent multiple submissions
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Clear previous errors
  [name, email, message].forEach(field => {
    field.classList.remove('error');
  });

  [nameError, emailError, messageError].forEach(error => {
    error.style.display = 'none';
    error.textContent = '';
  });

  formMessage.className = 'form-message';
  formMessage.style.display = 'none';

  // Validate name
  if (!name.value.trim()) {
    name.classList.add('error');
    nameError.textContent = 'Name is required';
    nameError.style.display = 'block';
    valid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    email.classList.add('error');
    emailError.textContent = 'Email is required';
    emailError.style.display = 'block';
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    email.classList.add('error');
    emailError.textContent = 'Please enter a valid email address';
    emailError.style.display = 'block';
    valid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    message.classList.add('error');
    messageError.textContent = 'Message is required';
    messageError.style.display = 'block';
    valid = false;
  }

  if (!valid) {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';

    // Show general error message
    formMessage.textContent = 'Please correct the errors above and try again.';
    formMessage.classList.add('error');
    formMessage.style.display = 'block';
  } else {
    // Show success message
    formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon!';
    formMessage.classList.add('success');
    formMessage.style.display = 'block';

    // Clear form
    name.value = "";
    email.value = "";
    message.value = "";

    // Submit the form after showing success message
    setTimeout(() => {
      e.target.submit();
    }, 3000);
  }
});
