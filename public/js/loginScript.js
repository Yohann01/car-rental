const signInForm = document.querySelector('form');
    const errorEmail = document.querySelector('.error.email');
    const errorPassword = document.querySelector('.error.password');
    signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signInForm.emailSignIn.value;
    const password = signInForm.passSignIn.value;

    console.log(email, password);
    // Reset errors
    errorPassword.textContent = '';
    errorEmail.textContent = '';

    const saveData = {
        email: email,
        password: password
    };

    try {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(saveData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    if (data.errors) {
        errorEmail.textContent = data.errors.email;
        errorPassword.textContent = data.errors.password;
    }

    if (data.user) {
        const returnTo = data.returnTo || '/';

        window.location.href = returnTo;

    }
} catch (err) {
    console.error('Error occurred during sign-in:', err);
    // Handle error (display message, log, etc.)
}

});