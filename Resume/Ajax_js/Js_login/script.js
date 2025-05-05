// Save user to localStorage
async function registerUser(e) {
  e.preventDefault();
  
  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    mobile: document.getElementById('mobile').value,
    city: document.getElementById('city').value,
    address: document.getElementById('address').value,
  };

  // Simulating POST request using fetch
  await fetch('register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  });

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  
  alert('Registered successfully!');
  document.getElementById('registerForm').reset();
}

// Validate login
async function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Simulating POST request using fetch
  await fetch('login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  });

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const userFound = users.find(u => u.email === email && u.password === password);

  if (userFound) {
    alert('Login successful!');
  } else {
    alert('Invalid email or password');
  }
}

// Attach events
document.getElementById('registerForm').addEventListener('submit', registerUser);
document.getElementById('loginForm').addEventListener('submit', loginUser);
