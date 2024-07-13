// This file is used to handle the login form submission.
const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form by default so we can do so with JavaScript.
    event.preventDefault();
    const userName = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If the email and password fields aren't empty, send the user data to the login route.
    if (userName && password) {
      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ userName, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        // If the response is okay, redirect the user to the homepage.
        if (response.ok) {
          document.location.replace('/');
        } else {
          throw new Error('Failed to log in');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };
  // Add an event listener to the login form.
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);