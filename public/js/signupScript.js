
const signUpForm = document.querySelector('form');
const errorUsername = document.querySelector('.error.username');
const errorEmail = document.querySelector('.error.email');

signUpForm.addEventListener('submit', async (e) => {
e.preventDefault();

const username = signUpForm.usernameSignUp.value;
const email = signUpForm.userEmailSignUp.value;
const password = signUpForm.passSignUp.value;

// Reset errors
errorUsername.textContent = '';
errorEmail.textContent = '';

const saveData = {
    username: username,
    email: email,
    password: password
};

try {
    const res = await fetch('/api/auth/signup', {
        method: 'POST', // Use POST method for signup
        body: JSON.stringify(saveData), // Send data as JSON string
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
        errorUsername.textContent = data.errors.username;
        errorEmail.textContent = data.errors.email;
    }
    if(data.user){
        location.assign('/')
        
    }
} catch (err) {
    console.error('Error occurred during signup:', err);
    // Handle error (display message, log, etc.)
}
});

