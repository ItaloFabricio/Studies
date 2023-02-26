let tagformularioCadastroUsuario = document.querySelector(
  "#formularioCadastroUsuario"
);
tagformularioCadastroUsuario.addEventListener("submit", function (event) {
  event.preventDefault();

  let nome = event.target.nome.value;
  let email = event.target.email.value;

  let formValido = true;

  if (nome.trim() == "") {
    document.querySelector("#campoObrigatorio").style.display = "block";
    formValido = false;
  } else {
    document.querySelector("#campoObrigatorio").style.display = "none";
  }

  if (formValido) {
    fetch("https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw (
            "Requisição chegou no servidor, mas servidor retornou com erro: " +
            response.statusText
          );
        }
        return response.json();
      })
      .then(function (usuario) {
        console.log(usuario);
        let tagerrorMsg = document.querySelector('#errorMsg');
        tagerrorMsg.textContent = '';
        tagerrorMsg.style.display = 'none';
        event.target.reset;
      })
      .catch(function (error) {
        console.log(error);
        let tagerrorMsg = document.querySelector('#errorMsg');
        tagerrorMsg.textContent = 'Ocorreu um erro no cadastro ' + error;
        tagerrorMsg.style.display = 'block';
      });
  }
});
