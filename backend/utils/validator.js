export const validateContactInput = (data) => {
  const errors = {};

  const { name, email, subject, message } = data;

  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
  }

  if (!subject || subject.trim() === '') {
    errors.subject = 'Subject is required';
  }

  if (!message || message.trim() === '') {
    errors.message = 'Message content is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
