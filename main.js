//A lista camposJogo foi criada fora das funções para ter um escopo global
let camposJogo = []
var nomes = []
var resultados = []
const btnJogar = document.getElementById('btnStart')

//Responsavel por validar se os campos estão preenchidos
//Caso sim, a função de montar o jogo será acionada
function verificaInputs(ev) {
  const jogador1 = document.getElementById('player1')
  const jogador2 = document.getElementById('player2')
  const btnJogar = document.getElementById('btnStart')

  if (jogador1.value == '' || jogador2.value == '') {
    alert("Existem campos há serem preenchidos")
  }

  else {
    nomes.push(jogador1.value, jogador2.value)
    jogador1.value = ''
    jogador2.value = ''
    jogador1.setAttribute('disabled' , !jogador1.disabled)
    jogador2.setAttribute('disabled' , !jogador2.disabled)

    btnJogar.removeEventListener('click', verificaInputs)

    btnJogar.innerText = 'Reiniciar'
    btnJogar.addEventListener('click', function() {
      window.location.reload()
    })

    montaJogo()
  }
}

//Essa função vai alterar o HTML da div-jogo com a tabela do jogo da velha
function montaJogo() {
  const divJogo = document.getElementById('div-jogo')
  divJogo.innerHTML = `<p id="nomeJogador1" class="nomeSelecionado">${nomes[0]}</p>

  <table>
    <tr>
      <td id="l1 c1"></td>
      <td id="l1 c2"></td>
      <td id="l1 c3"></td>
    </tr>
    <tr>
      <td id="l2 c1"></td>
      <td id="l2 c2"></td>
      <td id="l2 c3"></td>
    </tr>
    <tr>
      <td id="l3 c1"></td>
      <td id="l3 c2"></td>
      <td id="l3 c3"></td>
    </tr>
  </table>

  <p id="nomeJogador2" class="nomeOculto">${nomes[1]}</p>`

  camposJogo = document.querySelectorAll('td');

  //Foi criado o listener dos clicks após a criação do HTML para não ter erros
  camposJogo.forEach(function(campo) {
    campo.addEventListener('click', selecionarCampo)
  })
}

//Resposavel por adicionar o X ou O na pagina HTML
function selecionarCampo(ev) {
  const player1 = document.getElementById('nomeJogador1')
  const player2 = document.getElementById('nomeJogador2')

  if (ev.target.innerText == "") {

    if (resultados[resultados.length - 1] == 'X') {
      ev.target.innerText = 'O'
      resultados.push('O')
      player2.classList.remove('nomeSelecionado')
      player2.classList.add('nomeOculto')
      player1.classList.add('nomeSelecionado')
    }
    else {
      ev.target.innerText = 'X'
      resultados.push('X')
      player1.classList.remove('nomeSelecionado')
      player1.classList.add('nomeOculto')
      player2.classList.add('nomeSelecionado')
    }
    verificaCampos()
  }
}

//Essa função sempre verificará cada linha, coluna e diagonais criadas
//Caso o conjunto tenha os 3 elementos iguais, significa que algum dos jogadores ganhou o jogo
function verificaCampos() {
  
  const tabela = [
    [
      document.getElementById('l1 c1'),
      document.getElementById('l1 c2'),
      document.getElementById('l1 c3')
    ]
    ,
    [
      document.getElementById('l2 c1'),
      document.getElementById('l2 c2'),
      document.getElementById('l2 c3')
    ]
    ,
    [
      document.getElementById('l3 c1'),
      document.getElementById('l3 c2'),
      document.getElementById('l3 c3')
    ]
    ,
    [
      document.getElementById('l1 c1'),
      document.getElementById('l2 c1'),
      document.getElementById('l3 c1')
    ]
    ,
    [
      document.getElementById('l1 c2'),
      document.getElementById('l2 c2'),
      document.getElementById('l3 c2')
    ]
    ,
    [
      document.getElementById('l1 c3'),
      document.getElementById('l2 c3'),
      document.getElementById('l3 c3')
    ]
    ,
    [
      document.getElementById('l1 c1'),
      document.getElementById('l2 c2'),
      document.getElementById('l3 c3')
    ]
    ,
    [
      document.getElementById('l1 c3'),
      document.getElementById('l2 c2'),
      document.getElementById('l3 c1')
    ]
  ]

  tabela.forEach(function(linhaColuna) {

    var listaCampos = []
    linhaColuna.forEach(function(campo) {
      listaCampos.push(campo.innerText)
    })
    if (listaCampos.join('') == 'OOO' || listaCampos.join('') == 'XXX') {
      var ganhador = ""

      if (listaCampos.join('') == 'OOO') {
        ganhador = nomes[1]
      }
      else {
        ganhador = nomes[0]
      }

      const player1 = document.getElementById('nomeJogador1')
      const player2 = document.getElementById('nomeJogador2')
      const divVitoria = document.getElementById('div-vitoria')

      linhaColuna.forEach(function(campo) {
        campo.bgColor = "008000"
      })
      camposJogo.forEach(function(campo) {
        campo.removeEventListener('click', selecionarCampo)
      })

      player1.classList.remove('nomeSelecionado')
      player2.classList.remove('nomeSelecionado')
      player1.classList.add('nomeOculto')
      player2.classList.add('nomeOculto')
      divVitoria.innerHTML = `<p id="Ganhador">Jogador <nome>${ganhador}</nome> venceu o jogo!</p>`
    }

  })

  if (resultados.length == 9) {
    const player1 = document.getElementById('nomeJogador1')
    const player2 = document.getElementById('nomeJogador2')
    const divVelha = document.getElementById('div-vitoria')

    player1,player2.classList.remove('nomeSelecionado')
    player1,player2.classList.add('nomeOculto')
    divVelha.innerHTML = '<p id="Velha">Deu velha!</p>'

    tabela.forEach(function(linhaColuna) {
      linhaColuna.forEach(function(campo) {
        campo.bgColor = "FF7F0F"
      }) 
    })

  }
}

btnJogar.addEventListener('click', verificaInputs)