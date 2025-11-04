// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Form validation and submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const formMessage = document.getElementById('form-message');

  let valid = true;
  let errors = [];

  // Clear previous errors
  [name, email, message].forEach(field => {
    field.classList.remove('error');
  });
  formMessage.className = 'form-message';

  // Validate name
  if (!name.value.trim()) {
    name.classList.add('error');
    errors.push('Name is required');
    valid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    email.classList.add('error');
    errors.push('Email is required');
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    email.classList.add('error');
    errors.push('Please enter a valid email address');
    valid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    message.classList.add('error');
    errors.push('Message is required');
    valid = false;
  }

  if (!valid) {
    // Show error message
    formMessage.textContent = errors.join('. ');
    formMessage.classList.add('error');
  } else {
    // Show success message and submit form
    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
    formMessage.classList.add('success');

    // Clear form
    name.value = "";
    email.value = "";
    message.value = "";

    // Submit the form after a short delay to show success message
    setTimeout(() => {
      e.target.submit();
    }, 2000);
  }
});
