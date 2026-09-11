const form = document.querySelector('form');
const errorMsg = document.getElementById('form-error');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('name-error');
const emailErrorMissing = document.getElementById('email-error');
const emailErrorInvalid = document.getElementById('email-error-invalid');
const messageError = document.getElementById('message-error');

function toggleFieldError(errorSpan, show) {
    if (show) {
        errorSpan.classList.add('visible');
    } else {
        errorSpan.classList.remove('visible');
    }
}

function clearAllFieldErrors() {
    toggleFieldError(nameError, false);
    toggleFieldError(emailErrorMissing, false);
    toggleFieldError(emailErrorInvalid, false);
    toggleFieldError(messageError, false);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.remove('visible');
    clearAllFieldErrors();

    if (!nameInput.value.trim()) {
        toggleFieldError(nameError, true);
        nameInput.focus();
        return;
    }

    if (!emailInput.value.trim()) {
        toggleFieldError(emailErrorMissing, true);
        emailInput.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        toggleFieldError(emailErrorInvalid, true);
        emailInput.focus();
        return;
    }

    if (!messageInput.value.trim()) {
        toggleFieldError(messageError, true);
        messageInput.focus();
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            window.location.href = 'thanks.html';
        } else {
            errorMsg.classList.add('visible');
        }
    } catch (error) {
        errorMsg.classList.add('visible');
    }
});

[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input === nameInput) {
            toggleFieldError(nameError, false);
        }
        if (input === emailInput) {
            toggleFieldError(emailErrorMissing, false);
            toggleFieldError(emailErrorInvalid, false);
        }
        if (input === messageInput) {
            toggleFieldError(messageError, false);
        }
    });
});