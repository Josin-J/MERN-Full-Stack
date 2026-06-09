const validateRegister = (username, email, password) => {
  if (!username || !email || !password) {
    return "All fields are required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
};

const validateTask = (title) => {
  if (!title) {
    return "Title is required";
  }
  return null;
};

module.exports = { validateRegister, validateTask };
