// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Form validation and async submission (works with Formspree)
document.getElementById('contactForm').addEventListener('submit', async function (e) {
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

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Clear previous errors
  [name, email, message].forEach(field => field.classList.remove('error'));
  [nameError, emailError, messageError].forEach(error => {
    error.style.display = 'none';
    error.textContent = '';
  });
  formMessage.style.display = 'none';
  formMessage.className = 'form-message';

  // Validate fields
  if (!name.value.trim()) {
    name.classList.add('error');
    nameError.textContent = 'Name is required';
    nameError.style.display = 'block';
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    email.classList.add('error');
    emailError.textContent = 'Email is required';
    emailError.style.display = 'block';
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    email.classList.add('error');
    emailError.textContent = 'Please enter a valid email';
    emailError.style.display = 'block';
    valid = false;
  }

  if (!message.value.trim()) {
    message.classList.add('error');
    messageError.textContent = 'Message is required';
    messageError.style.display = 'block';
    valid = false;
  }

  if (!valid) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    formMessage.textContent = 'Please fix the errors above and try again.';
    formMessage.classList.add('error');
    formMessage.style.display = 'block';
    return;
  }

  // ✅ Send to Formspree using Fetch
  try {
    const formData = new FormData(e.target);
    const response = await fetch(e.target.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      formMessage.textContent = 'Thank you! Your message has been sent successfully. I’ll get back to you soon!';
      formMessage.classList.add('success');
      formMessage.style.display = 'block';
      e.target.reset(); // Clear form
    } else {
      formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
      formMessage.classList.add('error');
      formMessage.style.display = 'block';
    }
  } catch (error) {
    formMessage.textContent = 'Network error. Please check your connection and try again.';
    formMessage.classList.add('error');
    formMessage.style.display = 'block';
  }

  // Re-enable button
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send Message';
});
