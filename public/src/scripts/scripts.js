// Form validation on submit
document.getElementById('contactForm').addEventListener('submit', function (e) {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let valid = true;

  [name, email, message].forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      valid = false;
    } else {
      field.classList.remove('error');
    }
  });

  if (!valid) {
    e.preventDefault(); // Stop form submission
  } else {
    alert("Thank you, Faimah! Your message has been sent.");
    name.value = "";
    email.value = "";
    message.value = "";
  }
});
