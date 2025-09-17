const userListDiv = document.getElementById("user-list") as HTMLDivElement;
const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const pageInfo = document.getElementById("page-info") as HTMLSpanElement;

let currentPage = 0;
const limit = 10;

async function fetchUsers(offset: number, limit: number) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    userListDiv.innerHTML = "<p>Você precisa estar logado.</p>";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/users?offset=${offset}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) throw new Error("Erro ao buscar usuários");

    const users = await response.json();

    renderUsers(users);
  } catch (err: any) {
    userListDiv.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
}

function renderUsers(users: any[]) {
  if (users.length === 0) {
    userListDiv.innerHTML = "<p>Nenhum usuário encontrado.</p>";
    return;
  }

  let html = "<table><thead><tr><th>ID</th><th>Nome</th><th>Email</th></tr></thead><tbody>";
  users.forEach((u) => {
    html += `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.email}</td></tr>`;
  });
  html += "</tbody></table>";

  userListDiv.innerHTML = html;
}

// eventos de paginação
prevBtn.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    updateUsers();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
    updateUsers();
});

function updateUsers() {
  const offset = currentPage * limit;
  fetchUsers(offset, limit);
  pageInfo.textContent = `Página ${currentPage + 1}`;
}

// quando entrar no app (já logado), busca usuários
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    updateUsers();
  }
});
