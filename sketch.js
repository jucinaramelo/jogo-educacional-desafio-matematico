//fontes de texto
var fonteRegular;
var fonteMonofett;
//mapas
var mapa0;
var mapa1;
var mapa2;
var mapa3;
var mapa4;
var mapa5;
var mapa6;
//imagens
var img;
var imgOrient;
var imgPro;
var imgcred;
var imgplay;
var imgPirata;
var imagtecla;
var imgseta;
var imgpointer;
var imgesc;
var siga;
var imgPerg;
var heart;
var imgGameOver;
var imgFim;
//efeitos sonoros
var somDeTelaDeInicio;
var hit;
var pegandoMoedas;
var somGameOver;
var somMapaFinal;
//contadores
var atraso = 0;
var contPirata;
var atrasoPirata;
var contBauMapa1 = 0;
var contBauMapa3 = 0;
var contMoeda = 0;
var atrasoMoeda = 0;
var atrasoPirataPulo;
var contSomDeMenu = 0;
var contSomGameOver = 0;
var contSomMapaFinal = 0;
//vetores
var bau = [];
var vetorMoedas = [];
var vetorOrk1 = [];
var vetorOrk2 = [];
var vetorOrk3 = [];
var vetorPirataDir = [];
var vetorPirataEsq = [];
var vetorPirata = [];
var vetorPirataPulo = [];
var vetorPirataMorte = [];
//auxiliares
var yChao = 282;
var chaoAtual = 282;
var estaPulando = false;
/*//////INSTRUÇÕES DAS TRANSIÇOES////// MARCADO
1 = está no mapa1 voltando para telaPlay (xJogador < 0)
2 = está no mapa1 indo para o mapa2 (xJogador > 470)
3 = está no mapa2 voltando para o mapa1 (xJogador < 0)
4 = está no mapa2 indo para o mapa3 (xJogador > 470)
5 = está no mapa3 voltando para o mapa2 (xJogador < 0)
6 = está no mapa3 indo para o mapa4 (xJogador > 470)
7 = está no mapa4 voltando para o mapa3 (xJogador < 0)
8 = está no mapa4 indo para o mapa5 (xJogador > 470)
9 = está no mapa5 voltando para o mapa4 (xJogador < 0)
10 = está no mapa5 indo para o mapa6 (xJogador > 470)
11 = está no mapa6 voltando para o mapa5 (xJogador < 0)
*/
//numero aleatório só para começar
var tela = 0;
var transcicaoDeTela = 100;
var vidas = 3;
var pontos = 0;
//auxiliares perguntas
var alternativaCerta;
var alternativaEscolhida;
var perguntaMapa1 = false;
var perguntaMapa2 = false;
var perguntaMapa3 = false;
var perguntaMapa4 = false;
var perguntaMapa5 = false;
var contPontosWhile = 0;
var contVidasWhile = 0;

function preload() {
  soundFormats("ogg");
  pegandoMoedas = loadSound("./PLAY/coin.ogg");
  hit = loadSound("./PLAY/hit1.ogg");
  somDeTelaDeInicio = loadSound("./MENU/telaMenuSom.ogg");
  somGameOver = loadSound("./PLAY/GameOver.ogg");
  somMapaFinal = loadSound("./PLAY/mapaFinal.ogg");
  img = loadImage("./MENU/floresttaof.png");
  imgOrient = loadImage("./Créditos/orientadorW.jpeg");
  imgPro = loadImage("./Créditos/prog.jpeg");
  imgcred = loadImage("./Como Jogar/flore.png");
  siga = loadImage("./PLAY/OBJETOS/sigaEmFrente.png");
  mapa0 = loadImage("./PLAY/MAPAS/mapa0.png");
  mapa1 = loadImage("./PLAY/MAPAS/mapa1.png");
  mapa2 = loadImage("./PLAY/MAPAS/mapa2.png");
  mapa3 = loadImage("./PLAY/MAPAS/mapa3.png");
  mapa4 = loadImage("./PLAY/MAPAS/mapa4.jpeg");
  mapa5 = loadImage("./PLAY/MAPAS/mapa5.png");
  imagtecla = loadImage("./Como Jogar/teclas.png");
  imgseta = loadImage("./Como Jogar/rodyk.png");
  imgseti = loadImage("./Como Jogar/setinha.png");
  imgpointer = loadImage("./Como Jogar/pointer.png");
  imgesc = loadImage("./Como Jogar/esc.jpeg");
  imgPerg = loadImage("./PLAY/prgm.png");
  imgGameOver = loadImage("./PLAY/MAPAS/mapa6GameOver.png");
  imgFim = loadImage("./PLAY/MAPAS/mapaFim.png");
  heart = loadImage("./PLAY/OBJETOS/heart16x16.png");
  //colocando as imagens nos vetores
  for (j = 0; j < 7; j++) {
    vetorPirataEsq[j] = loadImage("./PLAY/PIRATE_WALKL_" + j + ".png");
    vetorPirataDir[j] = loadImage("./PLAY/PIRATE_WALK_" + j + ".png");
    vetorPirata[j] = loadImage("./PLAY/PIRATE_IDLE_" + j + ".png");
    vetorPirataPulo[j] = loadImage("./PLAY/PIRATE_JUMP_" + j + ".png");
    vetorPirataMorte[j] = loadImage("./PLAY/PIRATE_DIE_" + j + ".png");
    vetorOrk1[j] = loadImage("./PLAY/BOSS/ORKS/ORK1L_" + j + ".png");
    vetorOrk2[j] = loadImage("./PLAY/BOSS/ORKS/ORK2_" + j + ".png");
    vetorOrk3[j] = loadImage("./PLAY/BOSS/ORKS/ORK3_" + j + ".png");
  }
  //colocando moedas
  for (i = 0; i < 6; i++) {
    vetorMoedas[i] = loadImage("./PLAY/OBJETOS/moeda (" + i + ").png");
  }
  //colocando as imagens do baú
  for (i = 0; i < 8; i++) {
    bau[i] = loadImage("./PLAY/bau (" + i + ").png");
  }
  // colocando as fontes de texto
  fonteRegular = loadFont("./Fonte/fonteRegular.ttf");
  fonteMonofett = loadFont("./Fonte/Monofett-Regular.ttf");
}
function setup() {
  frameRate(30);
  createCanvas(500, 500);
  xBau = 322;
  yBau = 357;
  xBoss = 400;
  yBoss = 307;
  xJogador = 5;
  yJogador = 282;
  xb = 180;
  yb1 = 95;
  yb2 = 170;
  yb3 = 200;
  largurab = 150;
  alturab = 40;
  contTempo = 0;
  corAtiva = false;
  tela = 0;
  lJogador = 130;
  lBau = 80;
  lBoss = 100;
  contPirata = 0;
  atrasoPirata = 0;
}
function movimentar() {
  //movimentos do personagens/////////
  if (keyIsDown(UP_ARROW) && keyIsDown(RIGHT_ARROW) && !estaPulando) {
    yJogador = chaoAtual - 120;
    estaPulando = true;
    xJogador = xJogador + 5;
    image(vetorPirataPulo[contPirata], xJogador, yJogador, 125, 140);
  } else if (keyIsDown(LEFT_ARROW)) {
    image(vetorPirataEsq[contPirata], xJogador, yJogador, 125, 140);
    xJogador = xJogador - 3;
  } else if (keyIsDown(RIGHT_ARROW)) {
    xJogador = xJogador + 3;
    image(vetorPirataDir[contPirata], xJogador, yJogador, 125, 140);
  } else if (keyIsDown(UP_ARROW) && !estaPulando) {
    image(vetorPirataPulo[contPirata], xJogador, yJogador, 125, 140);
    yJogador = chaoAtual - 120;
    estaPulando = true;
  } else {
    image(vetorPirata[contPirata], xJogador, yJogador, 125, 140);
  }

  if (estaPulando) {
    if (yJogador < chaoAtual) {
      yJogador = yJogador + 10;
    } else {
      estaPulando = false;
      yJogador = chaoAtual;
    }
  } else {
    yJogador = chaoAtual;
  }
}
function hpEpontos() {
  textFont(fonteRegular);
  textSize(20);
  image(vetorMoedas[contMoeda], 400, 20, 16, 16);
  text("= " + pontos + "", 420, 35);
  if (vidas == 3) {
    image(heart, 10, 20, 16, 16);
    image(heart, 28, 20, 16, 16);
    image(heart, 46, 20, 16, 16);
  } else if (vidas == 2) {
    image(heart, 10, 20, 16, 16);
    image(heart, 28, 20, 16, 16);
  } else if (vidas == 1) {
    image(heart, 10, 20, 16, 16);
  }
  if (contMoeda > 5) {
    contMoeda = 0;
  }
}
function telaPlay() {
  background(0);
  image(mapa0, 0, 0);
  imageMode(CORNER);
  image(siga, 215, 357, 50, 50);
  movimentar(); // <<<movimentos do pirata
  /////////////////////////////////////
  // limitando o personagem na tela //
  // e fazendo transição de tela   //
  if (xJogador > 470) {
    xJogador = 0;
    tela = 4; //<<< vai para o mapa1
  }
  if (xJogador < 0) {
    xJogador = 0; // limitar
  }
  if (transcicaoDeTela == 1) {
    //"1" se vem do mapa1
    //o pirata entra pelo lado direito
    xJogador = 465;
    //está na telaPlay
    transcicaoDeTela = 0;
  }
  ///////////////////////////////
  atrasoPirata++;
  if (atrasoPirata >= 6) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
  if (dist(xJogador, yJogador, 215, 357) < 50 + lJogador - 190 / 2) {
    imageMode(CORNER);
    image(imgPerg, 80, 110, 350, 210);
    fill(0);
    textFont(fonteRegular);
    textSize(15);
    text("PARA RESPONDER OS DESAFIOS \nUTILIZE UMA DAS TECLAS DO\n TECLADO:", 135, 150);

    fill(0);
    textFont(fonteMonofett);
    textSize(35);
    text("A     B     C", 170, 230);
  }
  textFont(fonteMonofett);
  fill(0);
  textSize(50);
  text("PLAY", 180, 50);
}
function mapaMundo1() {
  background(0);
  image(mapa1, 0, 0);
  imageMode(CORNER);
  //imagem do baú
  image(bau[contBauMapa1], xBau, yBau, 50, 50);
  movimentar(); //<<<movimenta o pirata
  hpEpontos(); //<<<manipula as vidas e os pontos
  /////////////////////////////////////
  // limitando o personagem na tela //
  // e fazendo transição de tela   //
  if (transcicaoDeTela == 3) {
    //"3" se vem do mapa2
    //o pirata entra pelo lado direito
    xJogador = 465;
    //está no mapa1
    transcicaoDeTela = 0;
  }
  if (xJogador < 0) {
    //se o pirata estiver indo para a borda esquerda
    // está no mapa1 indo para telaPlay
    transcicaoDeTela = 1;
    //ir para a telaPlay
    tela = 2;
  }
  if (xJogador > 470) {
    //se o pirata estiver indo para a borda direita
    // entra pelo o lado esquerdo
    xJogador = 0;
    //está no mapa1 indo para o mapa2
    transcicaoDeTela = 2;
    //ir para mapa2
    tela = 5;       
  }
  /////////////////////////////////
  atrasoPirata++;
  if (atrasoPirata >= 6) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
  //MARCADO1

  if (perguntaMapa1 == false) {
    //abre a pergunta quando chega no baú
    if (dist(xBau, yBau, xJogador, yJogador) < lBau + (lJogador - 120)) {
      //////////////////////
      imageMode(CORNER);
      image(imgPerg, 80, 90, 370, 240);
      fill(0);
      textFont(fonteRegular);
      textSize(15);
      text("AJUDE O PIRATA RESOLVER O PRIMEIRO \nDESAFIO E SIGA NO JOGO! \n           \nQuanto é  -2 + 5 ? \n ",115,120);
      fill(255);
      rect(160, 195, 150, 20, 5);
      fill(0);
      text("(a) =   3", 195, 210);
      fill(255);
      rect(160, 230, 150, 20, 5);
      fill(0);
      text("(b) =  -3", 195, 245);
      fill(255);
      rect(160, 265, 150, 20, 5);
      fill(0);
      text("(c) =  -7", 195, 280);

      if (
        (key == "a" || key == "A") &&alternativaEscolhida != "B" &&alternativaEscolhida != "C") {
        /*se apertar "A" e a "alternativaEscolhida" 
        for diferente de "B" ou "C", ou seja, se eu 
        apertei "A" e nao apertei "B" nem "C" antes*/
        alternativaEscolhida = "A";
        alternativaCerta = "A"; // no caso do mapa1 a "A" é a alternativa correta
         contBauMapa1++;
      //abre o baú só uma vez
      if (contBauMapa1 >= 7) {
        contBauMapa1 = 6;
      }
      }
      if (
        (key == "b" || key == "B") &&alternativaEscolhida != "A" &&alternativaEscolhida != "C") {
        /*se apertar "B" e a "alternativaEscolhida" 
        for diferente de "A" ou "C", ou seja, se eu 
        apertei "A" e nao apertei "A" nem "C" antes*/
        alternativaEscolhida = "B";
      }
      if (
        (key == "c" || key == "C") &&alternativaEscolhida != "A" &&alternativaEscolhida != "B") {
        /*se apertar "C" e a "alternativaEscolhida" 
        for diferente de "B" ou "A", ou seja, se eu 
        apertei "A" e nao apertei "B" nem "A" antes*/
        alternativaEscolhida = "C";
      }

      if (alternativaEscolhida == "A") {
        //se a alternativa escolhida for "A"
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text("ALTERNATIVA ESCOLHIDA: (A) = 3 \n PARABÉNS, VOCÊ ACERTOU A RESPOSTA! \n  -2 + 5 = 3 ",115,200);
        while (contPontosWhile < 1) {
          //"contPontosWhile" se inicia com zero(só vai girar/pontuar uma vez)
          /*é preciso de um "while" pq se nao vai ficar
          em loop de pontuacao*/
          pegandoMoedas.play();
          pegandoMoedas.duration(1);
          pontos = pontos + 100;
          contPontosWhile++; // agora é 1 (sai do loop)
        }
      } else if (alternativaEscolhida == "B") {
        //se a alternativa escolhida for "B"
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text("ALTERNATIVA ESCOLHIDA: (B) = - 3 \n \n INFELIZMENTE VOCÊ ERROU!",115,200);
      } else if (alternativaEscolhida == "C") {
        //se a alternativa escolhida for "B"
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text("ALTERNATIVA ESCOLHIDA: (C) = - 7 \n \n INFELIZMENTE VOCÊ ERROU!",115,200);
      }
    }
    if (xJogador > 470 || xJogador < 100) {
      /* se o jogador se afastou do bau*/
      if (
        alternativaEscolhida == "A" ||
        alternativaEscolhida == "B" ||
        alternativaEscolhida == "C"
      ) {
        //se eu escolhi alguma alternativa...
        perguntaMapa1 = true; // entao eu respondi a pergunta do mapa1
        alternativaEscolhida = "NENHUMA"; // "alternativaEscolhida" voltar ao padrao para nao dar errado nos proximos mapas
        contPontosWhile = 0; //"contPontosWhile" volta a zero pode pontuar em outros mapas
      }
    }
  }
}
function mapaMundo2() {
  background(0);
  image(mapa2, 0, 0);
  imageMode(CORNER);
  image(vetorOrk1[contPirata], xBoss, yBoss, 100, 100);
  movimentar(); //<<<movimenta o pirata
  hpEpontos(); //<<<manipula as vidas e os pontos
  /////////////////////////////////////
  // limitando o personagem na tela //
  // e fazendo transição de tela   //

  //barreira
  if (xJogador < 133 || xJogador > 268) {
    //antes de depois do morro
    chaoAtual = yChao; // a chão voltar a ser como antes
  } else {
    // se for entre é pq está em cima do morro
    if (xJogador >= 133 && yJogador == yChao && xJogador < 150) {
      xJogador = 130; //se o jogador estiver na barreira e nao pulou para cima
    } else if (xJogador <= 268 && yJogador == yChao && xJogador > 150) {
      xJogador = 268; //se o jogador estiver na barreira e nao pulou para cima
    } else if ((xJogador > 133 && yJogador < yChao) ||(xJogador < 268 && yJogador < yChao)) {
      chaoAtual = 228; //está em cima da barreira
    }
  }
  if (transcicaoDeTela == 5) {
    //"5" se vem do mapa3
    //o pirata entra pelo lado direito
    xJogador = 465;
    //está no mapa2
    transcicaoDeTela = 0;
  }
  if (xJogador < 0) {
    //se o pirata estiver indo para a borda esquerda
    // está no mapa2 indo para mapa1
    transcicaoDeTela = 3;
    //ir para o mapa1
    tela = 4;
  }
  atrasoPirata++;
  if (atrasoPirata >= 5) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
  //MARCADO
  if (perguntaMapa2 == false) {
    //abre a pergunta quando chega no ork
    if (dist(xBoss, yBoss, xJogador, yJogador) < lBoss + (lJogador - 120)){
      imageMode(CORNER);
      image(imgPerg, 80, 90, 370, 240);
      fill(0);
      textFont(fonteRegular);
      textSize(15);
      text("ORK DA FLORESTA TROPICAL: \n Resolva para seguir \n se errar sofrerá as consequências, HAHA!!\n Quanto é  2 x 3 + 5x(-2) ?",115,120);
      fill(255);
      rect(160, 195, 150, 20, 5);
      fill(0);
      text("(a) =   9", 195, 210);
      fill(255);
      rect(160, 230, 150, 20, 5);
      fill(0);
      text("(b) =  12", 195, 245);
      fill(255);
      rect(160, 265, 150, 20, 5);
      fill(0);
      text("(c) =  -4", 195, 280);

      if (
        (key == "a" || key == "A") &&alternativaEscolhida != "B" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "A";
      }
      if (
        (key == "b" || key == "B") &&alternativaEscolhida != "A" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "B";
      }
      if (
        (key == "c" || key == "C") &&alternativaEscolhida != "A" &&alternativaEscolhida != "B") {
        alternativaEscolhida = "C";
        alternativaCerta = "C";
      }

      if (alternativaEscolhida == "A") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (A) = 9 \n \n INFELIZMENTE VOCÊ ERROU!",
          115,
          200
        );
        if (contVidasWhile < 1) {
          hit.play();
          hit.duration();
          vidas = vidas - 1;
          contVidasWhile++;
        }
      } else if (alternativaEscolhida == "B") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (B) = 12 \n \n INFELIZMENTE VOCÊ ERROU!",
          115,
          200
        );
        if (contVidasWhile < 1) {
          hit.play();
          hit.duration();
          vidas = vidas - 1;
          contVidasWhile++;
        }
      } else if (alternativaEscolhida == "C") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (C) = -4 \nPARABÉNS, VOCÊ ACERTOU A RESPOSTA! \n  2 x 3 + 5x(-2) = -4",
          115,
          200
        );
        while (contPontosWhile < 1) {
          pegandoMoedas.play();
          pegandoMoedas.duration(1);
          pontos = pontos + 200;
          contPontosWhile++;
        }
      }
    }
    if (xJogador > 470 || xJogador < 100) {
      if (alternativaEscolhida == "A" ||alternativaEscolhida == "B" ||alternativaEscolhida == "C") {
        perguntaMapa2 = true;
        alternativaEscolhida = "NENHUMA";
        contPontosWhile = 0;
      }
    }
  }
  if (xJogador > 470) { 
    if(perguntaMapa2){
      //se o pirata estiver indo para a borda direita
      // entra pelo o lado esquerdo
      xJogador = 0;
      //está no mapa2 indo para o mapa3
      transcicaoDeTela = 4;
      //ir para mapa3
      tela = 6;
      }else{
          imageMode(CORNER);
      image(imgPerg, 80, 90, 370, 240);
      fill(0);
      textFont(fonteRegular);
      textSize(15);
      text("RESPONDA A PERGUNTA \n \n  PARA SEGUIR NO JOGO!",115,120);
        xJogador = 470;
       }
  }
}
function mapaMundo3() {
  background(0);
  image(mapa3, 0, 0);
  imageMode(CORNER);
  //imagem do baú
  image(bau[contBauMapa3], 250, 305, 50, 50);
  movimentar(); //<<<movimenta o pirata
  hpEpontos(); //<<<manipula as vidas e os pontos
  /////////////////////////////////////
  // limitando o personagem na tela //
  // e fazendo transição de tela   //
  //barreira
  if (xJogador < 128 || xJogador > 315) {
    //antes de depois do morro
    chaoAtual = yChao; // a chão voltar a ser como antes
  } else {
    // se for entre é pq está em cima do morro
    if (xJogador >= 133 && yJogador == yChao && xJogador < 150) {
      xJogador = 130; //se o jogador estiver na barreira e nao pulou para cima
    } else if (xJogador <= 315 && yJogador == yChao && xJogador > 150) {
      xJogador = 315; //se o jogador estiver na barreira e nao pulou para cima
    } else if ((xJogador > 133 && yJogador < yChao) ||(xJogador < 315 && yJogador < yChao)) {
      chaoAtual = 228; //está em cima da barreira
    }
  }
  if (transcicaoDeTela == 7) {
    //"7" se vem do mapa4
    //o pirata entra pelo lado direito
    xJogador = 465;
    //está no mapa3
    transcicaoDeTela = 0;
  }

  if (xJogador < 0) {
    //se o pirata estiver indo para a borda esquerda
    // está no mapa3 indo para mapa2
    transcicaoDeTela = 5;
    //ir para o mapa2
    tela = 5;
  }
  if (xJogador > 470) {
    //MARCADO3
    //se o pirata estiver indo para a borda direita
    // entra pelo o lado esquerdo
    xJogador = 0;
    //está no mapa3 indo para o mapa4
    transcicaoDeTela = 6;
    //ir para mapa4
    tela = 7;
  }
  atrasoPirata++;
  if (atrasoPirata >= 5) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
  if (perguntaMapa3 == false) {
    //abre a pergunta quando chega no baú
    if (
      dist(250, 305, xJogador, yJogador) < lBau + (lJogador - 120) &&
      yJogador < yChao
    ) {
      //////////////////////
      imageMode(CORNER);
      image(imgPerg, 80, 90, 370, 240);
      fill(0);
      textFont(fonteRegular);
      textSize(15);
      text(
        "PARA CONTINUAR GANHANDO MOEDAS \n RESPONDA O PRÓXIMA DESAFIO: \n \n Quanto é  4 x (-5+3) / 2? \n ",
        115,
        120
      );
      fill(255);
      rect(160, 195, 150, 20, 5);
      fill(0);
      text("(a) =   -4", 195, 210);
      fill(255);
      rect(160, 230, 150, 20, 5);
      fill(0);
      text("(b) =  6", 195, 245);
      fill(255);
      rect(160, 265, 150, 20, 5);
      fill(0);
      text("(c) =  -12", 195, 280);

      if (
        (key == "a" || key == "A") &&alternativaEscolhida != "B" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "A";
        alternativaCerta = "A";
         contBauMapa3++;
      //abre o baú só uma vez
      if (contBauMapa3 >= 7) {
        contBauMapa3 = 6;
      }
      }
      if (
        (key == "b" || key == "B") &&alternativaEscolhida != "A" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "B";
      }
      if (
        (key == "c" || key == "C") &&alternativaEscolhida != "A" &&alternativaEscolhida != "B") {
        alternativaEscolhida = "C";
      }
      if (alternativaEscolhida == "A") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (A) = -4 \nPARABÉNS, VOCÊ ACERTOU A RESPOSTA! \n  4 x (-5+3) / 2 = -4",
          115,
          200
        );
        while (contPontosWhile < 1) {
          pegandoMoedas.play();
          pegandoMoedas.duration(1);
          pontos = pontos + 100;
          contPontosWhile++;
        }
      } else if (alternativaEscolhida == "B") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (B) = 6 \n \n INFELIZMENTE VOCÊ ERROU!",
          115,
          200
        );
      } else if (alternativaEscolhida == "C") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (C) = - 12 \n \n INFELIZMENTE VOCÊ ERROU!",
          115,
          200
        );
      }
    }
    if (xJogador > 470 || xJogador < 100) {
      if (alternativaEscolhida == "A" ||alternativaEscolhida == "B" ||alternativaEscolhida == "C") {
        perguntaMapa3 = true;
        alternativaEscolhida = "NENHUMA";
        contPontosWhile = 0;
      }
    }
  }
}
function mapaMundo4() {
  background(0);
  image(mapa4, 0, 0);
  imageMode(CORNER);
  image(vetorOrk2[contPirata], xBoss - 185, yBoss - 100, 100, 100);

  movimentar(); //<<<movimenta o pirata
  hpEpontos(); //<<<manipula as vidas e os pontos
  /////////////////////////////////////
  // limitando o personagem na tela //
  // e fazendo transição de tela   //
  //MARCADO4
  //primeiro degrau
  if(xJogador < 80 || xJogador > 365){
     chaoAtual = yChao; // a chão voltar a ser como antes
   if (xJogador >= 75 && yJogador == yChao && xJogador < 365) {
      xJogador = 75; //se o jogador estiver na barreira e nao pulou para cima
    }
  } else if(xJogador < 130 || xJogador > 320){
    chaoAtual = 228; 
     if (xJogador >= 125 && yJogador == chaoAtual && xJogador < 280) {
      xJogador = 125; //se o jogador estiver na barreira e nao pulou para cima
    }
  }else if(xJogador < 178 || xJogador > 235){
    chaoAtual = 176; 
     if (xJogador >= 176 && yJogador == chaoAtual && xJogador < 205) {
      xJogador = 176; //se o jogador estiver na barreira e nao pulou para cima
    }
  }

  if (transcicaoDeTela == 9) {
    //"9" se vem do mapa5
    //o pirata entra pelo lado direito
    xJogador = 465;
    //está no mapa4
    transcicaoDeTela = 0;
  }

  if (xJogador < 0) {
    //se o pirata estiver indo para a borda esquerda
    // está no mapa4 indo para mapa3
    transcicaoDeTela = 7;
    //ir para o mapa3
    tela = 6;
  }
  atrasoPirata++;
  if (atrasoPirata >= 5) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
  if (perguntaMapa4 == false) {
    //abre a pergunta quando chega no ork
    if (dist(xBoss, yBoss, xJogador, yJogador) < lBoss + (lJogador+20)) {
      //////////////////////
      imageMode(CORNER);
      image(imgPerg, 80, 90, 370, 240);
      fill(0);
      textFont(fonteRegular);
      textSize(15);
      text(
        "VOCÊ É UM ÓTIMO JOGADOR \n AGORA RESPONDA ESTE DESAFIO \n QUANTO É (-20 / 2 ) + (3 x 5) - 8 ?",115,120);
      fill(255);
      rect(160, 195, 150, 20, 5);
      fill(0);
      text("(a) =  15", 195, 210);
      fill(255);
      rect(160, 230, 150, 20, 5);
      fill(0);
      text("(b) =  -3", 195, 245);
      fill(255);
      rect(160, 265, 150, 20, 5);
      fill(0);
      text("(c) =  -9", 195, 280);

      if (
        (key == "a" || key == "A") &&alternativaEscolhida != "B" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "A";
      }
      if (
        (key == "b" || key == "B") &&alternativaEscolhida != "A" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "B";
        alternativaCerta = "B";
      }
      if (
        (key == "c" || key == "C") &&alternativaEscolhida != "A" &&alternativaEscolhida != "B") {
        alternativaEscolhida = "C";
      }

      if (alternativaEscolhida == "A") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (A) = 15 \n \n INFELIZMENTE VOCÊ ERROU!",
          115,
          200
        );
        if (contVidasWhile < 2) {
          hit.play();
          hit.duration();
          vidas = vidas - 1;
          contVidasWhile++;
        }
      } else if (alternativaEscolhida == "B") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text("ALTERNATIVA ESCOLHIDA: (B) = -3 \n \n PARABÉNS, VOCÊ ACERTOU A RESPOSTA! \n -20 / 2 +  3 x 5 - 8 = -3 ",115,120);
        while (contPontosWhile < 1) {
          pegandoMoedas.play();
          pegandoMoedas.duration(1);
          pontos = pontos + 200;
          contPontosWhile++;
        }
      } else if (alternativaEscolhida == "C") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text("ALTERNATIVA ESCOLHIDA: (C) = -9 \n INFELIZMENTE VOCÊ ERROU!",115,200);
        if (contVidasWhile < 2) {
          hit.play();
          hit.duration();
          vidas = vidas - 1;
          contVidasWhile++;
        }
      }
    }
  }
    if (xJogador > 470 || xJogador < 100) {
      if (alternativaEscolhida == "A" ||alternativaEscolhida == "B" ||alternativaEscolhida == "C") {
        perguntaMapa4 = true;
        alternativaEscolhida = "NENHUMA";
        contPontosWhile = 0;
      }
    }
      if (xJogador > 470) {
        if(perguntaMapa4){
        //se o pirata estiver indo para a borda direita
        // entra pelo o lado esquerdo
        xJogador = 0;
        //está no mapa4 indo para o mapa5
        transcicaoDeTela = 8;
        //ir para mapa4
        tela = 8;  
        }else{
          imageMode(CORNER);
          image(imgPerg, 80, 90, 370, 240);
          fill(0);
          textFont(fonteRegular);
          textSize(15);
          text("RESPONDA A PERGUNTA \n \n  PARA SEGUIR NO JOGO!",115,120);
          xJogador = 470;
        }
      }
}
function mapaMundo5() {
  background(0);
 image(imgGameOver, 0, 0);
  imageMode(CORNER);
  image(vetorOrk3[contPirata], xBoss, yBoss, 100, 100);
  movimentar(); //<<<movimenta o pirata
  hpEpontos(); //<<<manipula as vidas e os pontos
  /////////////////////////////////////
  // limitando o personagem na tela //
  // e fazendo transição de tela   //
  if (transcicaoDeTela == 11) {
    //"11" se vem do mapa6
    //o pirata entra pelo lado direito
    xJogador = 465;
    //está no mapa5
    transcicaoDeTela = 0;
  }
  if (xJogador < 0) {
    //se o pirata estiver indo para a borda esquerda
    // está no mapa5 indo para mapa4
    transcicaoDeTela = 9;
    //ir para o mapa4
    tela = 7;
  }
  atrasoPirata++;
  if (atrasoPirata >= 5) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
  if (perguntaMapa5 == false) {
    //abre a pergunta quando chega no ork
    if (dist(xBoss, yBoss, xJogador, yJogador) < lBoss + (lJogador - 180)){
      imageMode(CORNER);
      image(imgPerg, 80, 90, 370, 240);
      fill(0);
      textFont(fonteRegular);
      textSize(15);
      text(
        "PRONTO(A) PARA ESTE DESAFIO? \nVAMOS LÁ RESOLVER MAIS UM \nQUANTO É  (-35 x 2)-(10-20)+(-6 / 2)?",115,120);
      fill(255);
      rect(160, 195, 150, 20, 5);
      fill(0);
      text("(a) =  -100", 195, 210);
      fill(255);
      rect(160, 230, 150, 20, 5);
      fill(0);
      text("(b) =  58", 195, 245);
      fill(255);
      rect(160, 265, 150, 20, 5);
      fill(0);
      text("(c) =  -63", 195, 280);

      if (
        (key == "a" || key == "A") &&alternativaEscolhida != "B" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "A";
      }
      if (
        (key == "b" || key == "B") &&alternativaEscolhida != "A" &&alternativaEscolhida != "C") {
        alternativaEscolhida = "B";
      }
      if (
        (key == "c" || key == "C") &&alternativaEscolhida != "A" &&alternativaEscolhida != "B"
      ) {
        alternativaEscolhida = "C";
        alternativaCerta = "C";
      }

      if (alternativaEscolhida == "A") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (A) = -100 \n \n INFELIZMENTE VOCÊ ERROU!",115,200);
        if (contVidasWhile < 3) {
          hit.play();
          hit.duration();
          vidas = vidas - 1;
          contVidasWhile++;
        }
      } else if (alternativaEscolhida == "B") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (B) = 58 \n \n INFELIZMENTE VOCÊ ERROU!",
          115,
          200
        );
        if (contVidasWhile < 3) {
          hit.play();
          hit.duration();
          vidas = vidas - 1;
          contVidasWhile++;
        }
      } else if (alternativaEscolhida == "C") {
        image(imgPerg, 80, 90, 370, 240);
        fill(0);
        textFont(fonteRegular);
        textSize(15);
        text(
          "ALTERNATIVA ESCOLHIDA: (C) = -63 \nPARABÉNS, VOCÊ ACERTOU A RESPOSTA! \n  (-35 x 2) - (10-20) + (-6 / 2) = -63",
          115,
          200
        );
        while (contPontosWhile < 3) {
          pegandoMoedas.play();
          pegandoMoedas.duration(1);
          pontos = pontos + 200;
          contPontosWhile++;
        }
      }
    }
  }
    if (xJogador > 470 || xJogador < 100) {
      if (alternativaEscolhida == "A" ||alternativaEscolhida == "B" ||alternativaEscolhida == "C") {
        perguntaMapa5 = true;
        alternativaEscolhida = "NENHUMA";
        contPontosWhile = 0;
      }
    }
    if (xJogador > 470) {
      if(perguntaMapa5){
      //se o pirata estiver indo para a borda direita
      // entra pelo o lado esquerdo
      xJogador = 0;
      // //está no mapa5 indo para o mapa6
      transcicaoDeTela = 10;
      // //ir para mapa6
      tela = 9;
      xJogador = 470;  
         }else{
            imageMode(CORNER);
          image(imgPerg, 80, 90, 370, 240);
          fill(0);
          textFont(fonteRegular);
          textSize(15);
          text(
            "RESPONDA A PERGUNTA \n \n  PARA SEGUIR NO JOGO!",115,120);
        xJogador = 470;
         }
    }
}
function mapaMundoFim() {
  background(0);
  image(imgFim, 0, 0);
  image(imgPerg, 80, 90, 370, 240);
  fill(0);
  textFont(fonteMonofett);
  textSize(50);
  text("FIM DE JOGO!", 115, 150);
  textSize(25);
  text("obrigada pela ajuda \nvocê é um(a) excelente\njogador(a)!", 115, 200);
  movimentar();
  somDeTelaDeInicio.stop();
   if (contSomMapaFinal < 1) {
    somMapaFinal.loop(); //som do jogo
    contSomMapaFinal++;
  }
  if (transcicaoDeTela == 10) {
    //"11" se vem do mapa6
    //o pirata entra pelo lado direito
    xJogador = 0;
    //está no mapa5
    transcicaoDeTela = 0;
  }
  if (xJogador < 0) {
    xJogador = 0;
  }
  if (xJogador > 470) {
    //MARCADO5
    //se o pirata estiver indo para a borda direita
    // entra pelo o lado esquerdo
    xJogador = 465;
  }
  atrasoPirata++;
  if (atrasoPirata >= 5) {
    atrasoPirata = 0;
    atrasoPirata++;
    contPirata++;
    if (contPirata >= 7) {
      contPirata = 0;
    }
  }
}
function gameOver() {
  background(0);
  text("GAME OVER", 195, 210);
  image(imgGameOver, 0, 0);
  image(imgPerg, 80, 90, 370, 240);
  fill(0);
  textFont(fonteMonofett);
  textSize(60);
  text("GAME OVER", 115, 230);
  somDeTelaDeInicio.stop();
  if (contSomGameOver < 1) {
    somGameOver.loop(); //som do jogo
    contSomGameOver++;
  }
  image(vetorPirataMorte[6], 200, 170, 125, 140);
}
function draw() {
  if (contSomDeMenu < 1) {
    somDeTelaDeInicio.loop(); //som do jogo
    contSomDeMenu++;
  }
  if (tela === 0) {
    telaMenu();
  }
  if (tela === 1) {
    telaComoJogar();
  }
  if (tela === 2) {
     telaPlay();
  }
  if (tela === 3) {
    telaCreditos();
  }
  if (tela === 4) {
    mapaMundo1();
  }
  if (tela === 5) {
    mapaMundo2();
  }
  if (tela === 6) {
    mapaMundo3();
  }
  //MARCADO
  if (tela === 7) {
    mapaMundo4();
  }
  if (tela === 8) {
    mapaMundo5();
  }
  if (tela == 9) {
    mapaMundoFim();
  }
  if (vidas <= 0) {
    gameOver();
  }
  atraso = atraso + 1;

  if (atraso > 30) {
    contMoeda = parseInt(atraso / 8);
  }

  if (atraso > 180) {
    atraso = 0;
  }
  if (contMoeda > 5) {
    contMoeda = 0;
  }
}
function mouseClicked() {
  if (tela === 0) {
    if (mouseY > 185 &&mouseY < 185 + alturab &&mouseX > xb && mouseX < xb + largurab) {
      tela = 1;
    }
    if (mouseY > 240 &&mouseY < 240 + alturab &&mouseX > xb &&mouseX < xb + largurab) {
      tela = 2;
    }
    if (mouseY > 295 &&mouseY < 295 + alturab &&mouseX > xb &&mouseX < xb + largurab) {
      tela = 3;
    }
  }
}
function keyPressed() {
  if (tela === 1 ||tela === 2 ||tela === 3 ||tela === 4 ||tela === 5 ||tela === 6) {
    if (keyCode === ESCAPE) {
      tela = 0;
    }
  }
}
function telaMenu() {
  background(220);
  image(img, 0, 0);
  contTempo = contTempo + 1;
  if (contTempo > 5) {
    contTempo = 0;
    corAtiva = !corAtiva;
  }

  textSize(45);
  textFont(fonteMonofett);
  fill(0);
  text("DESAFIO", 160, 100);
  text("MATEMÁTICO", 120, 140);
  textSize(15);
  fill(255);
  textFont(fonteRegular);
  if (mouseY > 185 &&mouseY < 185 + alturab &&mouseX > xb &&mouseX < xb + largurab) {
    if (corAtiva) {
      fill(255);
    } else {
      fill("#77942E");
    }
  }
  rect(180, 185, 150, 40, 15);
  fill(0);
  text("COMO JOGAR", xb + 22, yb1 + 115);
  fill(255);
  textSize(16);
  if (mouseY > 240 &&mouseY < 240 + alturab &&mouseX > xb &&mouseX < xb + largurab
  ) {
    if (corAtiva) {
      fill(255);
    } else {
      fill("#77942E");
    }
  }
  rect(180, 240, 150, 40, 15);
  fill(0);
  text("PLAY", xb + 55, yb2 + 95);
  fill(255);

  textSize(15);
  if (mouseY > 295 &&mouseY < 295 + alturab &&mouseX > xb &&mouseX < xb + largurab) {
    if (corAtiva) {
      fill(255);
    } else {
      fill("#77942E");
    }
  }
  rect(180, 295, 150, 40, 15);
  fill(0);
  text("CRÉDITOS", xb + 37, yb3 + 120);
  fill(255);
}
function telaComoJogar() {
  background(0);
  image(imgcred, 0, 0);
  textFont(fonteMonofett);
  fill(0);
  textSize(50);
  text("COMO JOGAR", 120, 50);
  fill("#85BB65");
  rect(5, 70, 491, 142, 10);
  fill(0);

  textSize(15);
  textFont(fonteRegular);
  text("O OBJETIVO DO JOGO É CUMPRIR OS DESAFIOS MATEMÁTICOS" +"\n" + "SOBRE REGRA DE SINAIS. VOCÊ VAI DESCOBRIR QUE DÁ PARA",10,100);
  text("APRENDER SE DIVERTINDO.", 10, 140);
  text("LEIA AS INSTRUÇÕES E VAMOS JUNTOS APRENDER.", 10, 160);
  text("BOM JOGO!!!", 10, 190);
  fill("#85BB65");
  rect(5, 230, 491, 260, 10);

  textSize(20);
  fill(0);
  text("INSTRUÇÕES: ", 60, 260);
  textSize(15);
  text("O JOGADOR SE MOVIMENTA COM AS TECLAS:", 50, 300);
  text("PARA VOLTAR AO MENU, UTILIZE A TECLA:", 50, 410);

  imageMode(CORNER);
  image(imagtecla, 150, 310, 80, 80);
  image(imgpointer, 10, 220, 65, 65);
  image(imgpointer, 10, 275, 40, 40);
  image(imgpointer, 10, 385, 40, 40);
  image(imgesc, 170, 420, 50, 50);
}
function telaCreditos() {
  background(0);
  image(imgcred, 0, 0);
  imageMode(CORNER);
  image(imgOrient, 15, 130, 110, 110);
  image(imgPro, 15, 270, 110, 110);
  fill(0);
  textSize(50);
  textFont(fonteMonofett);
  text("CRÉDITOS", 150, 70);
  textFont(fonteRegular);
  textSize(14.7);
  fill(0);
  text("ORIENTADOR: WILLEMBERG OLIVEIRA.", 130, 160);
  text("GRADUANDO DA LICENCIATURA EM MATEMÁTICA", 130, 180);
  text("NA UFRN E PROFESSOR RESIDENTE.", 130, 200);
  text("PROGRAMADORA: JUCINARA MELO.", 130, 300);
  text("GRADUANDA DO BACHARELADO EM CIÊNCIAS E", 130, 317);
  text("TECNOLOGIA NA UFRN.", 130, 335);
}