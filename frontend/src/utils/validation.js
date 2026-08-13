export const validateForm = (values) => {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (!values.subject || values.subject.trim() === '') {
    errors.subject = 'Subject is required';
  }

  if (!values.message || values.message.trim() === '') {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
};
