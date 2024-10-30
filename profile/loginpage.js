const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const mobileSignUpButton = document.getElementById('mobileSignUp');
const mobileSignInButton = document.getElementById('mobileSignIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

mobileSignUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add('right-panel-active');
});

mobileSignInButton.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.remove('right-panel-active');
});

const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');

signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Sign Up form submitted!');
});

signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Sign In form submitted!');
});

function goToHome() {
    // Replace this with your actual home page URL
    window.location.href = '/';
}