carregarUsuarios()

function carregarUsuarios() {
    fetch("https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios")
    .then(function(response) {
        if (!response.ok) {
            throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
        }
        return response.json()
    })
    .then(function(usuarios) {
        console.log(usuarios)
        let tagTabelaUsuarios = document.querySelector("#tabelaUsuarios")
        tagTabelaUsuarios.innerHTML = 
            `<tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Opções</th>
            </tr>`
        usuarios.forEach(usuario => {
          let tagTr = document.createElement("tr")
          tagTr.setAttribute("data-idcliente", usuario.id)
  
          let tagTdNome = document.createElement("td")
          tagTdNome.textContent = usuario.nome
          let tagTdEmail = document.createElement("td")
          tagTdEmail.textContent = usuario.email
  
          let tagTdOpcoes = document.createElement("td")
  
          let tagButtonEditar = document.createElement("button")
          let tagImgEditar = document.createElement("img")
          tagImgEditar.src = "img/edit.png"
          tagImgEditar.alt = "Editar usuário"
          tagButtonEditar.appendChild(tagImgEditar)

          tagButtonEditar.addEventListener("click", function(event) {
            let tagBotao = event.target
            let tagTr = tagBotao.parentElement.parentElement.parentElement
            console.log(tagTr)
            let idCliente = tagTr.dataset.idcliente
            document.querySelector("#idcliente").value = idCliente
            let nome = tagTr.querySelectorAll("td")[0].textContent
            let email = tagTr.querySelectorAll("td")[1].textContent

            document.querySelector("#nome").value = nome
            document.querySelector("#email").value = email
            tagTr.style.border = "2px dashed #fff"
            let botaoCriarUsuario = document.querySelector("#criarUsuario")
            botaoCriarUsuario.querySelector("img").src = "img/update.png"
          })
  
          let tagButtonRemover = document.createElement("button")
          let tagImgRemover = document.createElement("img")
          tagImgRemover.src = "img/delete.png"
          tagImgRemover.alt = "Remover usuário"
          tagButtonRemover.appendChild(tagImgRemover)
  
          tagTdOpcoes.appendChild(tagButtonEditar)
          tagTdOpcoes.appendChild(tagButtonRemover)
  
          tagTr.appendChild(tagTdNome)
          tagTr.appendChild(tagTdEmail)
          tagTr.appendChild(tagTdOpcoes)
  
          tagTabelaUsuarios.appendChild(tagTr)
        });
    })
    .catch(function(error) {
        console.log(error)
    })
}

let tagFormularioCadastroUsuario = document.querySelector("#formularioCadastroUsuario")
tagFormularioCadastroUsuario.addEventListener("submit", function(event) {
    event.preventDefault()

    let nome = event.target.nome.value
    let email = event.target.email.value
    let idCliente = event.target.idcliente.value
    
    console.log(idcliente)

    let formValido = true
    if (nome.trim() == "") {
        document.querySelector("#campoObrigatorio").style.display = "inline"
        formValido = false
    } else {
        document.querySelector("#campoObrigatorio").style.display = "none"
    }

    if (formValido) {
        if (idcliente == "") {
            fetch("https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw "Requisição chegou no servidor, mas servidor retornou com erro: " + response.statusText
                }
                return response.json()
            })
            .then(function(usuario) {
                console.log(usuario)
                let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
                tagMensagensDeErro.textContent = ""
                tagMensagensDeErro.style.display = "none"
                event.target.reset()
                carregarUsuarios()
            })
            .catch(function(error) {
                console.log(error)
                let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
                tagMensagensDeErro.textContent = "Ocorre um erro no cadastro. Erro: " + error
                tagMensagensDeErro.style.display = "inline"
            })
        } else {
            fetch("https://63442914dcae733e8fd8e3e5.mockapi.io/usuarios/" + idCliente, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email
                })
                })
                .then(function(response) {
                    return response.json()
                })
                .then(function(usuario) {
                    console.log(usuario)
                    let botaoCriarUsuario = document.querySelector("#criarUsuario")
                    botaoCriarUsuario.querySelector("img").src = "img/create.png"
                    let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
                    tagMensagensDeErro.textContent = ""
                    tagMensagensDeErro.style.display = "none"
                    event.target.reset()
                    carregarUsuarios()
                })
                .catch(function(error) {
                    console.log(error)
                    let tagMensagensDeErro = document.querySelector("#mensagensDeErro")
                    tagMensagensDeErro.textContent = "Ocorre um erro no cadastro. Erro: " + error
                    tagMensagensDeErro.style.display = "inline"
            })
        }
        
    }
})