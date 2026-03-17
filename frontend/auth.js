// Toggle forms
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Switch to Login
loginTab.addEventListener("click", () => {
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
});

// Switch to Signup
signupTab.addEventListener("click", () => {
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
});

// Handle Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html"; // redirect to main page
  } else {
    alert(data.error || "Login failed");
  }
});

// Handle Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Signup successful! Please log in.");
    loginTab.click(); // switch to login tab
  } else {
    alert(data.error || "Signup failed");
  }
});
