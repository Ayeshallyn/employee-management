// Register user
function register() {
    let fullname = document.getElementById("reg-fullname").value;
    let username = document.getElementById("reg-username").value;
    let password = document.getElementById("reg-password").value;
    let confirm = document.getElementById("reg-confirm").value;

    if (!fullname || !username || !password || !confirm) {
        alert("Please fill out all fields.");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username exists
    if (users.some(u => u.username === username)) {
        alert("Username already taken.");
        return;
    }

    users.push({ fullname, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}


// Login user
function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(u => u.username === username && u.password === password);

    if (found) {
        localStorage.setItem("currentUser", JSON.stringify(found));
        window.location.href = "index.html"; // go to system
    } else {
        alert("Invalid username or password.");
    }
}
