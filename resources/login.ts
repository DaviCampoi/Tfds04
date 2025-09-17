const loginForm = document.getElementById("login-form") as HTMLFormElement;
const loginMessage = document.getElementById("login-message") as HTMLDivElement;
const loginSection = document.getElementById("login-section") as HTMLElement;
const appSection = document.getElementById("app-section") as HTMLElement;
const logoutButton = document.getElementById("logout-button") as HTMLButtonElement;

function showMessage(msg: string, error: boolean = false) {
  loginMessage.textContent = msg;
  loginMessage.style.color = error ? "red" : "green";
}

async function login(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();
    const token = data.token;

    if (!token) throw new Error("Token não retornado");

    // salva token no navegador
    localStorage.setItem("jwt", token);

    showMessage("Login realizado com sucesso!");
    loginSection.hidden = true;
    appSection.hidden = false;
  } catch (err: any) {
    showMessage(err.message, true);
  }
}

// evento de submit do form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;
  login(email, password);
});

// botão de logout
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  loginSection.hidden = false;
  appSection.hidden = true;
  showMessage("Logout realizado");
});

// se já tiver token no localStorage, pula direto pro app
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    loginSection.hidden = true;
    appSection.hidden = false;
  }
});
