/* ============================================
   HARDWARE SERVICES - CONTACT FORM VALIDATION
============================================ */

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('contactForm');
  if (!form) return;

  const formStatus = document.getElementById('formStatus');

  const fields = {
    name: {
      el: document.getElementById('name'),
      group: document.getElementById('nameGroup'),
      error: document.getElementById('nameError'),
      validate: function (value) {
        if (value.trim() === '') return 'Full name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        if (!/^[A-Za-z\s.'-]+$/.test(value.trim())) return 'Name can only contain letters and spaces.';
        return '';
      }
    },
    email: {
      el: document.getElementById('email'),
      group: document.getElementById('emailGroup'),
      error: document.getElementById('emailError'),
      validate: function (value) {
        if (value.trim() === '') return 'Email address is required.';
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      }
    },
    phone: {
      el: document.getElementById('phone'),
      group: document.getElementById('phoneGroup'),
      error: document.getElementById('phoneError'),
      validate: function (value) {
        if (value.trim() === '') return 'Phone number is required.';
        const digitsOnly = value.replace(/\D/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 13) {
          return 'Enter a valid phone number (10-13 digits).';
        }
        return '';
      }
    },
    service: {
      el: document.getElementById('service'),
      group: document.getElementById('serviceGroup'),
      error: document.getElementById('serviceError'),
      validate: function (value) {
        if (value === '' || value === null) return 'Please select a service.';
        return '';
      }
    },
    message: {
      el: document.getElementById('message'),
      group: document.getElementById('messageGroup'),
      error: document.getElementById('messageError'),
      validate: function (value) {
        if (value.trim() === '') return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        if (value.trim().length > 500) return 'Message must not exceed 500 characters.';
        return '';
      }
    }
  };

  /* live character counter for message */
  const charCount = document.getElementById('charCount');
  if (fields.message.el && charCount) {
    fields.message.el.addEventListener('input', function () {
      const len = fields.message.el.value.length;
      charCount.textContent = len + ' / 500';
    });
  }

  function showError(fieldKey, message) {
    const field = fields[fieldKey];
    field.group.classList.add('error');
    field.group.classList.remove('success');
    field.error.textContent = '⚠ ' + message;
  }

  function showSuccess(fieldKey) {
    const field = fields[fieldKey];
    field.group.classList.remove('error');
    field.group.classList.add('success');
    field.error.textContent = '';
  }

  function validateField(fieldKey) {
    const field = fields[fieldKey];
    const value = field.el.value;
    const errorMsg = field.validate(value);

    if (errorMsg) {
      showError(fieldKey, errorMsg);
      return false;
    } else {
      showSuccess(fieldKey);
      return true;
    }
  }

  /* attach blur + input listeners for real-time validation */
  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    if (!field.el) return;

    field.el.addEventListener('blur', function () {
      validateField(key);
    });

    field.el.addEventListener('input', function () {
      // if field currently shows error, re-validate live as user types/fixes
      if (field.group.classList.contains('error')) {
        validateField(key);
      }
    });

    field.el.addEventListener('change', function () {
      validateField(key);
    });
  });

  /* form submit handler */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let allValid = true;
    Object.keys(fields).forEach(function (key) {
      const valid = validateField(key);
      if (!valid) allValid = false;
    });

    // honeypot spam check (hidden field)
    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value !== '') {
      allValid = false;
    }

    formStatus.classList.remove('show', 'success-box', 'error-box');

    if (allValid) {
      // Simulate successful submission (no backend connected)
      formStatus.classList.add('show', 'success-box');
      formStatus.innerHTML = '✅ Thank you! Your message has been sent successfully. Our team will contact you within 24 hours.';
      form.reset();

      // reset visual states
      Object.keys(fields).forEach(function (key) {
        fields[key].group.classList.remove('success', 'error');
      });
      if (charCount) charCount.textContent = '0 / 500';

      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(function () {
        formStatus.classList.remove('show');
      }, 6000);

    } else {
      formStatus.classList.add('show', 'error-box');
      formStatus.innerHTML = '⚠ Please correct the highlighted fields before submitting.';
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

});
