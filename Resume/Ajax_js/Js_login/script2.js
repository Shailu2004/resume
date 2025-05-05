async function register(e) {
    e.preventDefault();

    const user = {
        username: document.getElementById('r_name').value,
        pass: document.getElementById('r_password').value
    }

    await fetch('register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });

    const userdata = JSON.parse(localStorage.getItem('userdata')) || [];
    userdata.push(user);

    localStorage.setItem('userdata', JSON.stringify(userdata));

    alert("USer Registered Successfully !");

}

async function login(e) {
    e.preventDefault();

    const username = document.getElementById('l_name').value;
    const pass = document.getElementById('l_password').value;

    await fetch('login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, pass })
    });

    const userdata = JSON.parse(localStorage.getItem('userdata')) || [];
    const userfound = userdata.find(u => u.username === username && u.pass === pass);

    if (userfound) {
        alert("User Login Successfully !");
    }
    else {
        alert("User not Found !");
    }

}

document.getElementById('RegisterForm').addEventListener('submit', register);
document.getElementById('LoginForm').addEventListener('submit', login);