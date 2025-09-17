const uploadBtn = document.getElementById("upload-button") as HTMLButtonElement;
const imageInput = document.getElementById("image-input") as HTMLInputElement;
const uploadMessage = document.getElementById("upload-message") as HTMLDivElement;

async function uploadImage(file: File) {
  const token = localStorage.getItem("jwt");
  if (!token) {
    uploadMessage.textContent = "Você precisa estar logado.";
    uploadMessage.style.color = "red";
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3000/api/users/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar imagem");
    }

    const result = await response.json();
    uploadMessage.textContent = "Upload realizado com sucesso!";
    uploadMessage.style.color = "green";
    console.log("Resposta do servidor:", result);
  } catch (err: any) {
    uploadMessage.textContent = err.message;
    uploadMessage.style.color = "red";
  }
}

uploadBtn.addEventListener("click", () => {
  const file = imageInput.files?.[0];
  if (!file) {
    uploadMessage.textContent = "Selecione um arquivo antes de enviar.";
    uploadMessage.style.color = "red";
    return;
  }
  uploadImage(file);
});
