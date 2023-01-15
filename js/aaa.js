let cima = document.querySelector("#cima");
let esquerda = document.querySelector("#esquerda");
let direita = document.querySelector("#direita");
let baixo = document.querySelector("#baixo");
let bordas = document.querySelector("#bordas");
let bordaextra = document.querySelector("#bordaextra");
let paredeesq = document.querySelector("#paredeesq");
let info = document.querySelector("#info");
let botaodificil = document.querySelector("#dificil");
let botaonormal = document.querySelector("#normal");
let projeti1width;
let pwidth;
let paredeesqwidth;
let paredecimaheight;
let intervaldireita;
let intervalesquerda;
let intervalcima;
let intervalbaixo;
let personagem = document.querySelector("#personagem");
let vida = 100;
let atk1 = [];
let atk2 = [];
let atk3 = [];
let atk4 = [];
let atk5total = [];
let atk6 = [];
let atk7 = [];
let i1 = 0;
let i2 = 0;
let i3 = 0;
let i4 = 0;
let i5 = 0;
let i6 = 0;
let i7 = 0;
let lockcima = 0,
  lockbaixo = 0,
  lockesquerda = 0,
  lockdireita = 0;
let colisao1, colisao2, colisao3, colisao4, colisao5, colisao6, colisao7;
let pleft, ptop;
let podemexer = 0;
let comecaatk;
let invencibilidade = 0;
let ataques = ["ataquef1","ataquef2","ataquef3","ataquef4","ataquef5","ataquef6","ataquef7",];
let selecionaratk;
let linha = 0;
let ataqueanterior = "";
let tempopcomecar = 1000;
let projetil1width;
let projetilheight, projetiltop, projetilleft, projetilwidth;
let viralaranja = 0,
  viraazul = 0;
let menu = 0,
  placar = 0;
let dificil;
let intervalatk1,
  intervalatk2,
  intervalatk3,
  intervalatk4,
  intervalatk5,
  intervalatk6,
  intervalatk7;
let espacoatk2 = 2.1;
let distatk3 = 3.2;
let vlcdatk5;
let vlcdatk4 = 1.4;
let anim1,
  anim2,
  anim3,
  anim4 = 8000,
  anim5,
  anim6,
  anim7;
let colisaolock = 0;
let intervalp;
let recomecar = document.querySelector("#recomecar"),
  textofinal = document.querySelector("#textofinal");
let jajogou = 0,
  continuou = 0;
let continuar;
let nomes = [];
let zeroudificil = [];
let zerounormal = [];
let colocanome = document.querySelector("#colocanome");
let contadornome = 0;
let textoplacar = "";
let salvacontadornome = 0;
let nomelock = 0;
let podemexeranterior = 1;
//FUNCAO PARA RESIZE
function resize() {
  if (window.innerWidth >= 600) {
    personagem.style.left = "26vh";
    personagem.style.top = "26vh";
    personagem.style.width = "3vh";
    personagem.style.height = "3vh";
    bordas.style.width = "55vh";
    bordas.style.height = "55vh";
    paredeesq.style.width = "3.5vh";
    bordaextra.style.width = "62vh";
    bordaextra.style.height = "65vh";
    projetil1width = 3;
    vlcdatk5 = 3;
    intervalp = 10;
  } else {
    personagem.style.left = "18vh";
    personagem.style.top = "18vh";
    personagem.style.width = "2vh";
    personagem.style.height = "2vh";
    bordas.style.width = "38vh";
    bordas.style.height = "38vh";
    paredeesq.style.width = "2.5vh";
    bordaextra.style.width = "43vh";
    bordaextra.style.height = "46vh";
    projetil1width = 2;
    vlcdatk5 = 2.5;
    intervalp = 15;
  }
  pwidth = parseFloat(getComputedStyle(personagem).width);
  paredeesqwidth = parseFloat(getComputedStyle(paredeesq).width);
  paredecimaheight = parseFloat(getComputedStyle(paredecima).height);
}
resize();

window.addEventListener("resize", () => {
  resize();
});
//transforma os valores salvos do localstorage em variáveis
if (localStorage.getItem("contadornome") !== null){
  contadornome = localStorage.getItem("contadornome");
  nomes = JSON.parse(localStorage.getItem("nomes"));
  zerounormal = JSON.parse(localStorage.getItem("zerounormal"));
  zeroudificil = JSON.parse(localStorage.getItem("zeroudificil"));
  document.querySelector("#nomesplacar").innerHTML = localStorage.getItem("textoplacar");
  salvacontadornome = localStorage.getItem("salvacontadornome");
}

//FUNCAO RECOMECA---------------------------------------------------------------------
function recomeca() {
  ataqueanterior = "";
  tempopcomecar = 1000;
  jajogou = 1;
  vida = 100;
  ataques = ["ataquef1","ataquef2","ataquef3","ataquef4","ataquef5","ataquef6","ataquef7",];
  textofinal.style.display = "none";
  recomecar.style.display = "none";
  resize();
  document.querySelector("#placarenome").style.display = "flex";
  document.querySelector("#botoesiniciar").style.display = "flex";
  document.querySelector("#instrucoes").style.display = "flex";
  document.querySelector("#controlesguia").style.display = "block";
  podemexer = 0;
  personagem.style.opacity = 1;
  personagem.style.display = "none";
  document.querySelector("#vida").textContent = "VIDA: ";
  document.querySelector("#atks").textContent = "ATKs: ";
}
esquerda.addEventListener("mouseout", () => {
  clearInterval(intervalesquerda);
  lockesquerda = 0;
});
direita.addEventListener("mouseout", () => {
  clearInterval(intervaldireita);
  lockdireita = 0;
});

baixo.addEventListener("mouseout", () => {
  clearInterval(intervalbaixo);
  lockbaixo = 0;
});

cima.addEventListener("mouseout", () => {
  clearInterval(intervalcima);
  lockcima = 0;
});

//FUNÇAO DIREITA---------------------------------------------------------------------------------------
function vaipradireita() {
  if (
    parseFloat(personagem.style.left) + parseFloat(personagem.style.width) <
      parseFloat(bordas.style.width) &&
    podemexer == 1
  ) {
    personagem.style.left = parseFloat(personagem.style.left) + 0.4 + "vh";
  }
}
//FUNÇAO ESQUERDA---------------------------------------------------------------------------------------
function vaipraesquerda() {
  if (parseFloat(personagem.style.left) > 0 && podemexer == 1) {
    personagem.style.left = parseFloat(personagem.style.left) - 0.4 + "vh";
  }
}
//FUNÇAO CIMA---------------------------------------------------------------------------------------
function vaipracima() {
  if (parseFloat(personagem.style.top) > 0 && podemexer == 1) {
    personagem.style.top = parseFloat(personagem.style.top) - 0.4 + "vh";
  }
}
//FUNÇAO BAIXO---------------------------------------------------------------------------------------
function vaiprabaixo() {
  if (
    parseFloat(personagem.style.top) + parseFloat(personagem.style.width) <
      parseFloat(bordas.style.height) &&
    podemexer == 1
  ) {
    personagem.style.top = parseFloat(personagem.style.top) + 0.4 + "vh";
  }
}
//DIREITA---------------------------------------------------------------------------------------
direita.addEventListener("mousedown", () => {
  if (lockdireita == 0) {
    intervaldireita = setInterval(vaipradireita, intervalp);
    lockdireita = 1;
  }
});
direita.addEventListener("mouseup", () => {
  if (lockdireita == 1) {
    clearInterval(intervaldireita);
    lockdireita = 0;
  }
});
direita.addEventListener("touchstart", () => {
  if (lockdireita == 0) {
    intervaldireita = setInterval(vaipradireita, intervalp);
    lockdireita = 1;
  }
});
direita.addEventListener("touchend", () => {
  if (lockdireita == 1) {
    clearInterval(intervaldireita);
    lockdireita = 0;
  }
});

//ESQUERDA---------------------------------------------------------------------------------------
esquerda.addEventListener("mousedown", () => {
  if (lockesquerda == 0) {
    intervalesquerda = setInterval(vaipraesquerda, intervalp);
    lockesquerda = 1;
  }
});
esquerda.addEventListener("mouseup", () => {
  if (lockesquerda == 1) {
    clearInterval(intervalesquerda);
    lockesquerda = 0;
  }
});
esquerda.addEventListener("touchstart", () => {
  if (lockesquerda == 0) {
    intervalesquerda = setInterval(vaipraesquerda, intervalp);
    lockesquerda = 1;
  }
});
esquerda.addEventListener("touchend", () => {
  if (lockesquerda == 1) {
    clearInterval(intervalesquerda);
    lockesquerda = 0;
  }
});

//CIMA---------------------------------------------------------------------------------------
cima.addEventListener("mousedown", () => {
  if (lockcima == 0) {
    intervalcima = setInterval(vaipracima, intervalp);
    lockcima = 1;
  }
});
cima.addEventListener("mouseup", () => {
  if (lockcima == 1) {
    clearInterval(intervalcima);
    lockcima = 0;
  }
});
cima.addEventListener("touchstart", () => {
  if (lockcima == 0) {
    intervalcima = setInterval(vaipracima, intervalp);
    lockcima = 1;
  }
});
cima.addEventListener("touchend", () => {
  if (lockcima == 1) {
    clearInterval(intervalcima);
    lockcima = 0;
  }
});

//BAIXO---------------------------------------------------------------------------------------
baixo.addEventListener("mousedown", () => {
  if (lockbaixo == 0) {
    intervalbaixo = setInterval(vaiprabaixo, intervalp);
    lockbaixo = 1;
  }
});
baixo.addEventListener("mouseup", () => {
  if (lockbaixo == 1) {
    clearInterval(intervalbaixo);
    lockbaixo = 0;
  }
});
baixo.addEventListener("touchstart", () => {
  if (lockbaixo == 0) {
    intervalbaixo = setInterval(vaiprabaixo, intervalp);
    lockbaixo = 1;
  }
});
baixo.addEventListener("touchend", () => {
  if (lockbaixo == 1) {
    clearInterval(intervalbaixo);
    lockbaixo = 0;
  }
});
//TECLADO----------------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    if (lockesquerda == 0) {
      intervalesquerda = setInterval(vaipraesquerda, intervalp);
      lockesquerda = 1;
    }
  }
  if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
    if (lockdireita == 0) {
      intervaldireita = setInterval(vaipradireita, intervalp);
      lockdireita = 1;
    }
  }
  if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
    if (lockcima == 0) {
      intervalcima = setInterval(vaipracima, intervalp);
      lockcima = 1;
    }
  }
  if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
    if (lockbaixo == 0) {
      intervalbaixo = setInterval(vaiprabaixo, intervalp);
      lockbaixo = 1;
    }
  }
});
//SOLTAR TECLA
document.addEventListener("keyup", (e) => {
  if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    if (lockesquerda == 1) {
      clearInterval(intervalesquerda);
      lockesquerda = 0;
    }
  }
  if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
    if (lockdireita == 1) {
      clearInterval(intervaldireita);
      lockdireita = 0;
    }
  }
  if (e.key == "w" || e.key == "W" || e.key == "ArrowUp") {
    if (lockcima == 1) {
      clearInterval(intervalcima);
      lockcima = 0;
    }
  }
  if (e.key == "s" || e.key == "S" || e.key == "ArrowDown") {
    if (lockbaixo == 1) {
      clearInterval(intervalbaixo);
      lockbaixo = 0;
    }
  }
});

//FUNCAO ATAQUE1----------------------------------------------------------------------
function ataque1() {
  atk1[i1] = document.createElement("div");
  atk1[i1].setAttribute("id", "projetil1");
  if (dificil == 1) {
    atk1[i1].style.animationDuration = "1.2s";
  }
  atk1[i1].style.left =
    Math.random() *
      (parseFloat(bordaextra.style.width) -
        parseFloat(paredeesq.style.width) * 2 -
        projetil1width) +
    parseFloat(paredeesq.style.width) +
    "vh";
  if (i1 > 1) {
    if (
      parseFloat(atk1[i1].style.left) <
        parseFloat(atk1[i1 - 1].style.left) + projetil1width &&
      parseFloat(atk1[i1].style.left) + projetil1width >
        parseFloat(atk1[i1 - 1].style.left)
    ) {
      atk1.pop().remove();
      ataque1();
      return;
    }
  }
  bordaextra.appendChild(atk1[i1]);
  removeprojetil(atk1, anim1 - 5);
  i1++;
}
//FUNCAO ATAQUE2----------------------------------------------------------------------
function ataque2() {
  atk2[i2] = document.createElement("div");
  atk2[i2].setAttribute("id", "projetil2");
  if (dificil == 1) {
    atk2[i2].style.animationDuration = "2.3s";
  }
  atk2[i2].style.height =
    Math.random() *
      (parseFloat(getComputedStyle(bordaextra).height) -
        parseFloat(getComputedStyle(info).height) * 2 -
        parseFloat(getComputedStyle(paredecima).height)) +
    parseFloat(getComputedStyle(paredecima).height) * 1.05 +
    "px";
  bordaextra.appendChild(atk2[i2]);
  removeprojetil(atk2, anim2);
  i2++;
  atk2[i2] = document.createElement("div");
  atk2[i2].setAttribute("id", "projetil2");
  if (dificil == 1) {
    atk2[i2].style.animationDuration = "2.3s";
  }
  atk2[i2].style.top =
    parseFloat(atk2[i2 - 1].style.height) +
    parseFloat(getComputedStyle(personagem).height) * espacoatk2 +
    "px";
  atk2[i2].style.height =
    parseFloat(getComputedStyle(bordaextra).height) -
    parseFloat(atk2[i2].style.top) +
    "px";
  bordaextra.appendChild(atk2[i2]);
  removeprojetil(atk2, anim2 - 5);
  i2++;
}
//FUNCAO ATAQUE3----------------------------------------------------------------------
function ataque3() {
  let posicaopjt3;

  if (linha == 0) {
    posicaopjt3 = paredeesqwidth;
    linha = 1;
  } else {
    posicaopjt3 = paredeesqwidth + pwidth * 1.5;
    linha = 0;
  }
  for (
    ;
    posicaopjt3 <=
    parseFloat(getComputedStyle(bordaextra).width) - paredeesqwidth;

  ) {
    atk3[i3] = document.createElement("div");
    atk3[i3].setAttribute("id", "projetil3");
    if (dificil == 1) {
      atk3[i3].style.animationDuration = "2s";
    }
    atk3[i3].style.left = posicaopjt3 + "px";
    posicaopjt3 += pwidth * distatk3;
    bordaextra.appendChild(atk3[i3]);
    removeprojetil(atk3, anim3 - 5);
    i3++;
  }
}
//FUNCAO ATAQUE4----------------------------------------------------------------------
function ataque4() {
  let duracaoanim = Math.random() * vlcdatk4 + 0.5;
  atk4[i4] = document.createElement("div");
  atk4[i4].setAttribute("id", "projetil4");
  atk4[i4].style.animation =
    "atk4-1 linear 7.5s, atk4-2 linear infinite alternate " + duracaoanim + "s";
  atk4[i4].style.left = Math.random() * paredeesqwidth * 2 + "px";
  bordaextra.appendChild(atk4[i4]);
  removeprojetil(atk4, 7500);
  i4++;
  duracaoanim = Math.random() + 1;
  atk4[i4] = document.createElement("div");
  atk4[i4].setAttribute("id", "projetil4");
  atk4[i4].style.animation =
    "atk4-1 linear 8s, atk4-2 linear infinite alternate-reverse " +
    duracaoanim +
    "s";
  atk4[i4].style.left = Math.random() * paredeesqwidth * 2 + "px";
  bordaextra.appendChild(atk4[i4]);
  removeprojetil(atk4, 7995);
  i4++;
}

async function delay(ml) {
  return new Promise((resolve) => {
    setTimeout(resolve, ml);
  });
}

//FUNCAO ATAQUE5----------------------------------------------------------------------
async function ataque5() {
  let atk5 = document.createElement("div");
  atk5.setAttribute("class", "projetil5");
  let ladoataque5 = Math.floor(Math.random() * 4);
  switch (ladoataque5) {
    case 0:
      atk5.style.left = 0;
      atk5.style.top = Math.random() * 85 + 5 + "%";
      break;

    case 1:
      atk5.style.left = "95%";
      atk5.style.top = Math.random() * 85 + 5 + "%";
      break;

    case 2:
      atk5.style.left = Math.random() * 85 + 5 + "%";
      atk5.style.top = 0;
      break;

    case 3:
      atk5.style.left = Math.random() * 85 + 5 + "%";
      atk5.style.top = "92%";
      break;
  }
  bordaextra.appendChild(atk5);
  await delay(500);
  let posxp =
    parseFloat(getComputedStyle(personagem).left) +
    parseFloat(getComputedStyle(personagem).width) / 2;
  let posyp =
    parseFloat(getComputedStyle(personagem).top) +
    parseFloat(getComputedStyle(personagem).height) / 2;
  let posxt =
    parseFloat(getComputedStyle(atk5).left) +
    parseFloat(getComputedStyle(atk5).width) / 2 -
    paredeesqwidth;
  let posyt =
    parseFloat(getComputedStyle(atk5).top) +
    parseFloat(getComputedStyle(atk5).height) / 2 -
    paredecimaheight;
  let distx = posxp - posxt;
  let disty = posyp - posyt;
  let hipotenusa = Math.sqrt(distx ** 2 + disty ** 2);

  if (ladoataque5 == 0) {
    while (
      parseFloat(getComputedStyle(atk5).left) <
        parseFloat(getComputedStyle(bordaextra).width) - pwidth &&
      parseFloat(getComputedStyle(atk5).top) >= 0 &&
      parseFloat(getComputedStyle(atk5).top) <=
        parseFloat(getComputedStyle(bordaextra).height) - pwidth
    ) {
      atk5.style.left =
        parseFloat(getComputedStyle(atk5).left) +
        (distx / hipotenusa) * vlcdatk5 +
        "px";
      atk5.style.top =
        parseFloat(getComputedStyle(atk5).top) +
        (disty / hipotenusa) * vlcdatk5 +
        "px";
      await delay(16);
    }
  }
  if (ladoataque5 == 1) {
    while (
      parseFloat(getComputedStyle(atk5).left) > 0 &&
      parseFloat(getComputedStyle(atk5).top) >= 0 &&
      parseFloat(getComputedStyle(atk5).top) <=
        parseFloat(getComputedStyle(bordaextra).height) - pwidth
    ) {
      atk5.style.left =
        parseFloat(getComputedStyle(atk5).left) +
        (distx / hipotenusa) * vlcdatk5 +
        "px";
      atk5.style.top =
        parseFloat(getComputedStyle(atk5).top) +
        (disty / hipotenusa) * vlcdatk5 +
        "px";
      await delay(16);
    }
  }
  if (ladoataque5 == 2) {
    while (
      parseFloat(getComputedStyle(atk5).left) > 0 &&
      parseFloat(getComputedStyle(atk5).left) <
        parseFloat(getComputedStyle(bordaextra).width) - pwidth &&
      parseFloat(getComputedStyle(atk5).top) <=
        parseFloat(getComputedStyle(bordaextra).height) - pwidth
    ) {
      atk5.style.left =
        parseFloat(getComputedStyle(atk5).left) +
        (distx / hipotenusa) * vlcdatk5 +
        "px";
      atk5.style.top =
        parseFloat(getComputedStyle(atk5).top) +
        (disty / hipotenusa) * vlcdatk5 +
        "px";
      await delay(16);
    }
  }
  if (ladoataque5 == 3) {
    while (
      parseFloat(getComputedStyle(atk5).left) > 0 &&
      parseFloat(getComputedStyle(atk5).top) >= 0 &&
      parseFloat(getComputedStyle(atk5).left) <=
        parseFloat(getComputedStyle(bordaextra).width) - pwidth
    ) {
      atk5.style.left =
        parseFloat(getComputedStyle(atk5).left) +
        (distx / hipotenusa) * vlcdatk5 +
        "px";
      atk5.style.top =
        parseFloat(getComputedStyle(atk5).top) +
        (disty / hipotenusa) * vlcdatk5 +
        "px";
      await delay(16);
    }
  }
  atk5.style.animation = "atk5-2 0.5s linear";
  setTimeout(() => {
    atk5.remove();
  }, 500);
}

//FUNCAO ATAQUE6----------------------------------------------------------------------
async function ataque6() {
  atk6[i6] = document.createElement("div");
  atk6[i6].setAttribute("id", "projetil6");
  if (dificil == 1) {
    atk6[i6].style.animationDuration = "1.8s";
  }
  bordaextra.appendChild(atk6[i6]);
  removeprojetil(atk6, anim6);
  i6++;
  await delay(550);
  atk6[i6] = document.createElement("div");
  atk6[i6].setAttribute("id", "projetil6");
  if (dificil == 1) {
    atk6[i6].style.animationDuration = "1.8s";
  }
  atk6[i6].style.top = "50%";
  atk6[i6].style.animationDirection = "reverse";
  bordaextra.appendChild(atk6[i6]);
  removeprojetil(atk6, anim6 - 5);
  i6++;
}
//FUNCAO ATAQUE7----------------------------------------------------------------------
function ataque7() {
  atk7[i7] = document.createElement("div");
  let cor = Math.floor(Math.random() * 2);
  if (viraazul == 2) {
    cor = 0;
  }
  if (viralaranja == 2) {
    cor = 1;
  }
  if (cor == 0) {
    atk7[i7].setAttribute("id", "projetilazul");
    viralaranja++;
    viraazul = 0;
  }
  if (cor == 1) {
    atk7[i7].setAttribute("id", "projetillaranja");
    viralaranja = 0;
    viraazul++;
  }
  atk7[i7].setAttribute("class", "projetil7");
  if (dificil == 1) {
    atk7[i7].style.animationDuration = "1.2s";
  }
  bordaextra.appendChild(atk7[i7]);
  removeprojetil(atk7, anim7 - 5);
  i7++;
}
//FUNCAO REMOVEPROJETIL----------------------------------------------------------------------
function removeprojetil(nprojetil, tempo) {
  setTimeout(() => {
    nprojetil.shift().remove();
    if (nprojetil == atk1) i1--;
    if (nprojetil == atk2) i2--;
    if (nprojetil == atk3) i3--;
    if (nprojetil == atk4) i4--;
    if (nprojetil == atk6) i6--;
    if (nprojetil == atk7) i7--;
  }, tempo);
}

//FUNCAO TOMOUDANO-----------------------------------------------------------------------------
function tomoudano() {
  personagem.setAttribute("class", "animacaodano");
  let audio = new Audio("../sons/dano.mp3");
  audio.volume = 0.05;
  audio.play();
  vida = vida - 10;
  localStorage.setItem("vida", vida);
  document.querySelector("#vida").textContent = "VIDA: " + vida;
}
//FUNCAO PEGATOPLEFT DO PERSONAGEM-----------------------------------------------------------------------------
function pegatopleft() {
  pleft = parseFloat(getComputedStyle(personagem).left);
  ptop = parseFloat(getComputedStyle(personagem).top);
}
//FUNCAO COLISAOATK-----------------------------------------------------------------------------
function colisao(atk) {
  if (colisaolock == 1) {
    pegatopleft();
    for (let a = 0; a < atk.length; a++) {
      projetilwidth = parseFloat(getComputedStyle(atk[a]).width);
      projetilleft = parseFloat(getComputedStyle(atk[a]).left);
      projetiltop = parseFloat(getComputedStyle(atk[a]).top);
      projetilheight = parseFloat(getComputedStyle(atk[a]).height);
      if (
        pleft < projetilleft + projetilwidth - paredeesqwidth &&
        pleft + pwidth > projetilleft - paredeesqwidth &&
        ptop < projetiltop + projetilheight - paredecimaheight &&
        ptop + pwidth > projetiltop - paredecimaheight
      ) {
        if (invencibilidade == 0 && atk[a].className != "projetil7") {
          tomoudano();
          if (vida <= 0) {
            verificavida();
            return;
          }
          invencibilidade = 1;
          setTimeout(() => {
            personagem.removeAttribute("class");
            invencibilidade = 0;
          }, 750);
          return;
        }
        if (
          invencibilidade == 0 &&
          atk[a].id == "projetillaranja" &&
          (((lockesquerda == 0 ||
            (lockesquerda == 1 && parseFloat(personagem.style.left) <= 0)) &&
            (lockdireita == 0 ||
              (lockdireita == 1 &&
                parseFloat(personagem.style.left) >=
                  parseFloat(bordas.style.width) -
                    parseFloat(personagem.style.width))) &&
            (lockcima == 0 ||
              (lockcima == 1 && parseFloat(personagem.style.top) <= 0)) &&
            (lockbaixo == 0 ||
              (lockbaixo == 1 &&
                parseFloat(personagem.style.top) >=
                  parseFloat(bordas.style.height) - 5))) ||
            (lockesquerda == 1 && lockdireita == 1) ||
            (lockcima == 1 && lockbaixo == 1))
        ) {
          tomoudano();
          if (vida <= 0) {
            verificavida();
            return;
          }
          invencibilidade = 1;
          setTimeout(() => {
            personagem.removeAttribute("class");
            invencibilidade = 0;
          }, 750);
          return;
        }
        if (
          invencibilidade == 0 &&
          atk[a].id == "projetilazul" &&
          ((lockesquerda == 1 && parseFloat(personagem.style.left) > 0) ||
            (lockdireita == 1 &&
              parseFloat(personagem.style.left) <
                parseFloat(bordas.style.width) -
                  parseFloat(personagem.style.width)) ||
            (lockcima == 1 && parseFloat(personagem.style.top) > 0) ||
            (lockbaixo == 1 &&
              parseFloat(personagem.style.top) <
                parseFloat(bordas.style.height) - 5))
        ) {
          tomoudano();
          if (vida <= 0) {
            verificavida();
            return;
          }
          invencibilidade = 1;
          setTimeout(() => {
            personagem.removeAttribute("class");
            invencibilidade = 0;
          }, 750);
        }
      }
    }
  }
}

//FUNCAO VERIFICAVIDA----------------------------------------------------------------------
function verificavida() {
  colisaolock = 0;
  clearInterval(comecaatk);
  podemexer = 0;
  podemexeranterior = 0;
  personagem.removeAttribute("class");
  personagem.style.opacity = 0.65;
  ataques = [];
  fimdejogo();
  let audio2 = new Audio("../sons/morte.mp3");
  audio2.volume = 0.5;
  audio2.play();
  setTimeout(() => {
    personagem.style.display = "none";
  }, 1440);
}
//FUNCAO ABREMENU----------------------------------------------------------------------
function abremenu() {
  if (menu == 0) {
    document.querySelector("#botoesiniciar").style.display = "none";
    document.querySelector("#placarenome").style.display = "none";
    document.querySelector("#pagina").style.display = "block";
    document.querySelector("#controlesguia").style.opacity = 1;
    if (
      localStorage.getItem("vida") !== null ||
      localStorage.getItem("ataques") !== null
    ) {
      document.querySelector("#controlesguia").style.display = "block";
      continuar.style.display = "none";
    }
    document.querySelector("#leia").style.opacity = 0;
    menu = 1;
    return;
  }
  if (menu == 1) {
    document.querySelector("#botoesiniciar").style.display = "flex";
    document.querySelector("#placarenome").style.display = "flex";
    document.querySelector("#pagina").style.display = "none";
    document.querySelector("#controlesguia").style.opacity = 0;
    if (
      localStorage.getItem("vida") !== null ||
      localStorage.getItem("ataques") !== null
    ) {
      document.querySelector("#controlesguia").style.display = "none";
      continuar.style.display = "block";
    }
    document.querySelector("#leia").style.opacity = 1;
    menu = 0;
    return;
  }
}
//FUNCAO ABREPLACAR----------------------------------------------------------------------
function abreplacar() {
  if (placar == 0) {
    document.querySelector("#instrucoes").style.display = "none";
    colocanome.style.display = "none";
    document.querySelector("#limpar").style.display = "block"
    document.querySelector("#botoesiniciar").style.display = "none";
    document.querySelector("#nomesplacar").style.display = "block";
    placar = 1;
    return;
  }
  if (placar == 1) {
    document.querySelector("#botoesiniciar").style.display = "flex";
    document.querySelector("#instrucoes").style.display = "flex";
    document.querySelector("#nomesplacar").style.display = "none";
    colocanome.style.display = "block";
    document.querySelector("#limpar").style.display = "none"

    placar = 0;
    return;
  }
}
  //FUNCAO REMOVECONTINUAR----------------------------------------------------------------------
  function removecontinuar(){
    localStorage.removeItem("vida");
    localStorage.removeItem("ataques");
    localStorage.removeItem("dificuldade");
    localStorage.removeItem("ultimoataque")
  }

//Comandos para iniciar o jogo
if (
  localStorage.getItem("vida") !== null ||
  localStorage.getItem("ataques") !== null
) {
  document.querySelector("#controlesguia").style.display = "none";
  continuar = document.createElement("button");
  continuar.setAttribute("id", "continuar");
  continuar.setAttribute("class", "botao");
  continuar.textContent = "Continuar de onde parou";
  document.querySelector("#instrucoes").appendChild(continuar);
  document.querySelector("#divpralegenda").before(continuar);
  continuar.addEventListener("click", () => {
    if (localStorage.getItem("vida") !== null) {
      vida = localStorage.getItem("vida");
    }
    if (localStorage.getItem("ataques") !== null) {
      ataques = JSON.parse(localStorage.getItem("ataques"));
    }
    dificil = localStorage.getItem("dificuldade");
    colocanome.value = localStorage.getItem("nomeanterior");
    continuou = 1;
    comecarjogo();
  });
}

botaodificil.addEventListener("click", () => {
  removecontinuar()
  dificil = 1;
  localStorage.setItem("dificuldade", 1);
  comecarjogo();
});
botaonormal.addEventListener("click", () => {
  removecontinuar()
  dificil = 0;
  localStorage.setItem("dificuldade", 0);
  comecarjogo();
});
document.querySelector("#guia").addEventListener("click", abremenu);
document.querySelector("#placar").addEventListener("click", abreplacar);
document.querySelector("#limpar").addEventListener("click",()=>{
  localStorage.removeItem("contadornome");
  localStorage.removeItem("nomes");
  localStorage.removeItem("zerounormal");
  localStorage.removeItem("zeroudificil");
  localStorage.removeItem("textoplacar");
  localStorage.removeItem("salvacontadornome");
  document.querySelector("#nomesplacar").innerHTML = ""
  nomes = [];
  zeroudificil = [];
  zerounormal = [];
  contadornome = 0;
  salvacontadornome = 0;
  nomelock = 0;
  textoplacar = "";
})

//FUNCAO COMECARJOGO----------------------------------------------------------------------
function comecarjogo() {
  if (dificil == 1) {
    intervalatk1 = 75;
    intervalatk2 = 990;
    intervalatk3 = 370;
    intervalatk4 = 1250;
    intervalatk5 = 400;
    intervalatk6 = 560;
    intervalatk7 = 450;
    anim1 = 1200;
    anim2 = 2300;
    anim3 = 2000;
    anim5 = 3600;
    anim6 = 1800;
    anim7 = 1200;
    distatk3 = 3;
    espacoatk2 = 2.05;
    vlcdatk4 = 1.1;
    if (window.innerWidth >= 600) {
      vlcdatk5 = 3.5;
    } else {
      vlcdatk5 = 3;
    }
  }
  if (dificil == 0) {
    intervalatk1 = 120;
    intervalatk2 = 1250;
    intervalatk3 = 570;
    intervalatk4 = 1500;
    intervalatk5 = 520;
    intervalatk6 = 1000;
    intervalatk7 = 900;
    anim1 = 1800;
    anim2 = 3000;
    anim3 = 2500;
    anim5 = 4200;
    anim6 = 2500;
    anim7 = 2000;
    distatk3 = 3.2;
    espacoatk2 = 2.15;
    vlcdatk4 = 1.4;
    if (window.innerWidth >= 600) {
      vlcdatk5 = 3;
    } else {
      vlcdatk5 = 2.5;
    }
  }
  colisaolock = 1;
  localStorage.setItem("nomeanterior",colocanome.value);
  document.querySelector("#vida").textContent = "VIDA: " + vida;
  document.querySelector("#atks").textContent = "ATKs: " + ataques.length;
  personagem.style.display = "block";
  podemexer = 1;
  document.querySelector("#botoesiniciar").style.display = "none";
  document.querySelector("#instrucoes").style.display = "none";
  document.querySelector("#placarenome").style.display = "none";
  jogo();
}
  //FUNCAO PARAATAQUE----------------------------------------------------------------------
  function paraataque(tipocolisao,anim){
    if(podemexer ==  1 && podemexeranterior == 1){
      clearInterval(comecaatk);
      ataques.splice(selecionaratk, 1);
      setTimeout(() => {
        clearInterval(tipocolisao);
      }, anim);
      jogo()
    }
    if (podemexeranterior == 0){
      podemexeranterior = 1;
    }
  }
//FUNCAO JOGO----------------------------------------------------------------------
function jogo() {
  selecionaratk = Math.floor(Math.random() * ataques.length);
  if (continuou == 1) {
    selecionaratk = localStorage.getItem("ultimoataque");
    continuou = 0;
  }
  switch (ataqueanterior){
    case "ataque1":
    tempopcomecar = anim1;
    break;
    case "ataque2":
    tempopcomecar = anim2;
    break;
    case "ataque3":
    tempopcomecar = anim3;
    break;
    case "ataque4":
    tempopcomecar = anim4;
    break;
    case "ataque5":
    tempopcomecar = anim5;
    break;
    case "ataque6":
    tempopcomecar = anim6 + 550;
    break;
    case "ataque7":
    tempopcomecar = anim7;
    break;
  }
  setTimeout(() => {
    document.querySelector("#atks").textContent = "ATKs: " + ataques.length;
    localStorage.setItem("ataques", JSON.stringify(ataques));
    if (ataques.length == 0) {
      clearInterval(comecaatk);
      colisaolock = 0;
      fimdejogo();
    }
  }, tempopcomecar);

  if (ataques[selecionaratk] == "ataquef1") {
    ataqueanterior = "ataque1";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao1 = setInterval(colisao, 16, atk1);
    setTimeout(() => {
      comecaatk = setInterval(ataque1, intervalatk1);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao1, anim1)
    }, 15000 + tempopcomecar);
  }
  if (ataques[selecionaratk] == "ataquef2") {
    ataqueanterior = "ataque2";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao2 = setInterval(colisao, 16, atk2);
    setTimeout(() => {
      comecaatk = setInterval(ataque2, intervalatk2);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao2, anim2)
    }, 18000 + tempopcomecar);
  }
  if (ataques[selecionaratk] == "ataquef3") {
    ataqueanterior = "ataque3";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao3 = setInterval(colisao, 16, atk3);
    setTimeout(() => {
      comecaatk = setInterval(ataque3, intervalatk3);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao3, anim3)
    }, 10000 + tempopcomecar);
  }
  if (ataques[selecionaratk] == "ataquef4") {
    ataqueanterior = "ataque4";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao4 = setInterval(colisao, 16, atk4);
    setTimeout(() => {
      comecaatk = setInterval(ataque4, intervalatk4);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao4, anim4)
    }, 18000 + tempopcomecar);
  }
  if (ataques[selecionaratk] == "ataquef5") {
    ataqueanterior = "ataque5";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao5 = setInterval(
      colisao,
      16,
      (atk5total = document.getElementsByClassName("projetil5"))
    );
    setTimeout(() => {
      comecaatk = setInterval(ataque5, intervalatk5);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao5, anim5)
    }, 18000 + tempopcomecar);
  }
  if (ataques[selecionaratk] == "ataquef6") {
    ataqueanterior = "ataque6";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao6 = setInterval(colisao, 16, atk6);
    setTimeout(() => {
      comecaatk = setInterval(ataque6, intervalatk6);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao6, anim6 + 550)
    }, 14000 + tempopcomecar);
  }

  if (ataques[selecionaratk] == "ataquef7") {
    ataqueanterior = "ataque7";
    localStorage.setItem("ultimoataque", selecionaratk);
    colisao7 = setInterval(colisao, 16, atk7);
    setTimeout(() => {
      comecaatk = setInterval(ataque7, intervalatk7);
    }, tempopcomecar);
    setTimeout(() => {
      paraataque(colisao7, anim7)
    }, 11000 + tempopcomecar);
  }
}
//FUNCAO FIMDEJOGO----------------------------------------------------------------------
function fimdejogo() {
  clearInterval(colisao1);clearInterval(colisao2);clearInterval(colisao3);clearInterval(colisao4);clearInterval(colisao5);
  clearInterval(colisao6);clearInterval(colisao7);
  removecontinuar();
  if (localStorage.getItem("contadornome") !== null){
    for (let i = 0; i <= contadornome; i++){
      if (nomes[i] == colocanome.value){
        contadornome = i;
        nomelock = 1;
        break;
      }
    }
  }
  if (nomelock == 0){
  nomes[contadornome] = colocanome.value
  zeroudificil[contadornome] = "Não";
  zerounormal[contadornome] = "Não";
}

  if (ataques.length == 0 && vida > 0 && dificil == 0) {
    zerounormal[contadornome] = "Sim"
    textofinal.textContent = "Mandou bem, mas já tentou jogar no difícil? ;)";
  }
  if (ataques.length == 0 && vida > 0 && dificil == 1) {
    zeroudificil[contadornome] = "Sim"
    textofinal.textContent = "Carai, joga muito.";
  }
  localStorage.setItem("nomes",JSON.stringify(nomes));
  localStorage.setItem("zerounormal",JSON.stringify(zerounormal));
  localStorage.setItem("zeroudificil",JSON.stringify(zeroudificil));
  if (contadornome != salvacontadornome){
  contadornome = salvacontadornome
  }
  for (let i = 0; i < nomes.length; i++){
    textoplacar += nomes[i] + "⠀-⠀Normal:⠀" + zerounormal[i] + "⠀⠀Difícil:⠀" + zeroudificil[i] + "<br>";
  }
  localStorage.setItem("textoplacar",textoplacar);
  document.querySelector("#nomesplacar").innerHTML = textoplacar;
  textoplacar = ""
  if (nomelock == 0){
  contadornome++
}
  nomelock = 0;
  salvacontadornome = contadornome
  localStorage.setItem("salvacontadornome",salvacontadornome);
  localStorage.setItem("contadornome",contadornome);

  if (document.querySelector("#continuar")) {
    continuar.remove();
  }
  setTimeout(() => {
    if (vida <= 0) {
      textofinal.textContent = "Treine mais.";
    }
    textofinal.style.display = "block";
    if (jajogou == 0) {
      recomecar.addEventListener("click", () => {
        recomeca();
      });
    }
    setTimeout(() => {
      recomecar.style.display = "block";
    }, 1000);
  }, 1950);
}
