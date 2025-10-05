const loginForm = document.querySelector('.sign-in-container');
const signupForm = document.querySelector('.sign-up-container');
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToLogin = document.getElementById('switchToLogin');

// Switch from Login → Signup
switchToSignUp.addEventListener('click', (e) => {
  e.preventDefault();

  // Remove previous animations
  loginForm.classList.remove('animate__fadeInLeft', 'animate__fadeInUp', 'animate__fadeOutRight');
  signupForm.classList.remove('animate__fadeInRight', 'animate__fadeOutLeft');

  // Add fade-out to login
  loginForm.classList.add('animate__animated', 'animate__fadeOutLeft');

  // After fade-out, hide login and show signup
  setTimeout(() => {
    loginForm.classList.add('d-none');
    signupForm.classList.remove('d-none');

    // Animate signup fade-in
    signupForm.classList.add('animate__animated', 'animate__fadeInRight');
  }, 400);
});

// Switch from Signup → Login
switchToLogin.addEventListener('click', (e) => {
  e.preventDefault();

  // Remove previous animations
  signupForm.classList.remove('animate__fadeInRight', 'animate__fadeOutLeft');
  loginForm.classList.remove('animate__fadeInLeft', 'animate__fadeOutRight');

  // Add fade-out to signup
  signupForm.classList.add('animate__animated', 'animate__fadeOutRight');

  // After fade-out, hide signup and show login
  setTimeout(() => {
    signupForm.classList.add('d-none');
    loginForm.classList.remove('d-none');

    // Animate login fade-in
    loginForm.classList.add('animate__animated', 'animate__fadeInLeft');
  }, 400);
});

// Initial entrance animation
window.onload = () => {
  document.querySelector('.form-box').classList.add('animate__animated', 'animate__fadeInUp');
};
