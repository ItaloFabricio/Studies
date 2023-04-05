fetch("https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios")
  .then(function(response) {
      if (!response.ok) {
          throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
      }
      return response.json()
  })
  .then(function(usuarios) {
      console.log(usuarios)
      let tagTabelaUsuarios = document.querySelector('#tabelaUsuarios')
      usuarios.forEach(usuario => {
        let tagTr = document.createElement('tr')
        let tagTdNome = document.createElement('td')
        tagTdNome.textContent = usuario.nome;
        let tagTdEmail = document.createElement('td')
        tagTdEmail.textContent = usuario.email

        let tagTdOpcoes = document.createElement('td')

        let tagButtonEditar = document.createElement('button')
        let tagImgEditar = document.createElement('img')
        tagImgEditar.src = 'img/edit.png'
        tagImgEditar.alt = 'Editar usuário'
        tagButtonEditar.appendChild(tagImgEditar)

        let tagButtonRemover = document.createElement('button')
        let tagImgRemover = document.createElement('img')
        tagImgRemover.src = 'img/delete.png'
        tagImgRemover.alt = 'Remover usuário'
        tagButtonRemover.appendChild(tagImgRemover)

        tagTdOpcoes.appendChild(tagButtonEditar)
        tagTdOpcoes.appendChild(tagButtonRemover)


        tagTr.appendChild(tagTdNome)
        tagTr.appendChild(tagTdEmail)
        tagTr.appendChild(tagTdOpcoes)

        tagTabelaUsuarios.appendChild(tagTr)
      })
  })
  .catch(function(error) {
      console.log(error)
  })

carregarUsuarios();


function carregarUsuarios(){
  fetch("https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios")
  .then(function(response) {
      if (!response.ok) {
          throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
      }
      return response.json()
  })
  .then(function(usuarios) {
      console.log(usuarios)
      let tagTabelaUsuarios = document.querySelector('#tabelaUsuarios')
      tagTabelaUsuarios.innerHTML = ""
      usuarios.forEach(usuario => {
        let tagTr = document.createElement('tr')
        let tagTdNome = document.createElement('td')
        tagTdNome.textContent = usuario.nome;
        let tagTdEmail = document.createElement('td')
        tagTdEmail.textContent = usuario.email

        let tagTdOpcoes = document.createElement('td')

        let tagButtonEditar = document.createElement('button')
        let tagImgEditar = document.createElement('img')
        tagImgEditar.src = 'img/edit.png'
        tagImgEditar.alt = 'Editar usuário'
        tagButtonEditar.appendChild(tagImgEditar)

        let tagButtonRemover = document.createElement('button')
        let tagImgRemover = document.createElement('img')
        tagImgRemover.src = 'img/delete.png'
        tagImgRemover.alt = 'Remover usuário'
        tagButtonRemover.appendChild(tagImgRemover)

        tagTdOpcoes.appendChild(tagButtonEditar)
        tagTdOpcoes.appendChild(tagButtonRemover)


        tagTr.appendChild(tagTdNome)
        tagTr.appendChild(tagTdEmail)
        tagTr.appendChild(tagTdOpcoes)

        tagTabelaUsuarios.appendChild(tagTr)
      })
  })
  .catch(function(error) {
      console.log(error)
  })
}

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
        event.target.reset();
        carregarUsuarios();
      })
      .catch(function (error) {
        console.log(error);
        let tagerrorMsg = document.querySelector('#errorMsg');
        tagerrorMsg.textContent = 'Ocorreu um erro no cadastro ' + error;
        tagerrorMsg.style.display = 'block';
      });
  }
});
