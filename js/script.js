var context;
var canvas;
var velocidade = 500;
var score = 0;
var carroEscolhido = 'img/car_black.svg';
var carro;
var finish = false;
var quadradosGuia;
var movimentoVelocidade = 10;
//Classes
function InimigoSprite(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.frames = [
        'img/frame-1.png',
        'img/frame-2.png',
        'img/frame-3.png',
        'img/frame-4.png',
        'img/frame-5.png',
        'img/frame-6.png',
        'img/frame-7.png',
        'img/frame-8.png'
    ];

    this.fly = function () {
        var i = 0;
        var flyng = setInterval(() => {
            if (i == 7 || finish) {
                clearInterval(flyng);
            }
            let fr = new Image();
            fr.src = this.frames[i];
            context.beginPath();
            context.fillStyle = "#1C1C1C";
            context.fillRect(this.x - 5, this.y - movimentoVelocidade, this.width + 15, this.height);
            context.drawImage(fr, this.x, this.y, this.width, this.height);
            i++;
        }, 100);
    }

    this.setX = function (x) {
        this.x = x;
    }
    this.setY = function (y) {
        this.y = y;
    }
    this.getX = function () {
        return this.x;
    }
    this.getY = function () {
        return this.y;
    }

    this.bateu = function (carro) {
        if (this.x + this.width - 15 > carro.x && this.x + 25 < carro.x + carro.width && this.y + this.height > carro.y && this.y < carro.y + this.height) {
            return true;
        }
        return false;
    }
}

function Carro(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.width = 120;
    this.height = 120;

    this.setX = function (x) {
        this.x = x;
    }
    this.setY = function (y) {
        this.y = y;
    }
    this.getX = function () {
        return this.x;
    }
    this.getY = function () {
        return this.y;
    }

    this.getImg = function () {
        return this.img;
    }

    this.moveLeft = function (value) {
        if ((this.x - value) >= 223) {
            this.x -= value;
        }
    }

    this.moveRigth = function (value) {
        if ((this.x + value) <= 890) {
            this.x += value;
        }
    }

    this.moveDown = function (value) {
        if ((this.y + value) <= 500) {
            this.y += value;
        }
    }

    this.moveUp = function (value) {
        if ((this.y - value) > 0) {
            this.y -= value;
        }
    }

    this.getWidth = function() {
        return this.width;
    }

    this.getHeight = function() {
        return this.height;
    }
}
/*    ######################    Ações executadas ao iniciar a pagina   ##################       */
$(document).ready(function () {
    $("#corrida").css("border", 0).css("padding", 0).css("margin", 0);
    $("#corrida").attr("width", 1200).attr("height", 650);
    canvas = document.getElementById("corrida");
    criaJogo();
    $("#start").click(function () {
        gameStart();
        //Inicia a contagem de pontos
        var addPts = setInterval(() => {
            score += 1;
            if (!finish) {
                $("#pts").text(score);
            } else {
                clearInterval(addPts);
            }
        }, 50);
        $(this).prop("disabled", true);
        $("#carro").prop("disabled", true);
    });
    //Verifica se o jogador já possui um recorde
    if (localStorage.getItem('record')) {
        $("#record").text(localStorage.getItem('record'));
    }
    //Deleta o recorde do usuário
    $("#clear-rc").click(function () {
        $("#record").text(0);
        localStorage.setItem('record', 0);
    });
    $("#carro").change(function () {
        $("#carro-selecionado").attr("src", $(this).val());
        carroEscolhido = $(this).val();
    });

    $("#try-again").click(function () {
        tryagain();
    });

    /*  Player de musica */
    var aud = $('audio').get(0);
    aud.play();
    $("#play-stop").bind('click', function() {
        if (aud.paused){
            aud.play();
            $("#play-stop i").remove();
            $("#play-stop").append($("<i/>").text("stop").addClass("material-icons"));
        } else {
            aud.pause();
            $("#play-stop i").remove();
            $("#play-stop").append($("<i/>").text("play_arrow").addClass("material-icons"));
        }   
    });
});
/*   #######################  Inicializa o cenário    ###########################    */
function criaJogo() {
    context = canvas.getContext('2d');
    quadradosGuia = canvas.height / 8;
    //Desenhando grama
    desenhaGrama();

    //Faixas vermelho e branco 
    //Esquerda e direita
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
            context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
            context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
        }
    }
}

function desenhaGrama() {
    var grass = new Image();
    grass.src = 'img/grass.jpg';
    var sand = new Image();
    sand.src = 'img/sand.jpg';
    var water = new Image();
    water.src = 'img/water.jpg';
    //Grama
    grass.onload = function() {
        var gramaQtde = Math.ceil(canvas.height / this.height);
        for (var i = 0; i < gramaQtde; i++) {
            context.drawImage(this, 1069,(i * this.height), 175, this.height + 8);
        }
        for (var i = 0; i < gramaQtde; i++) {
            context.drawImage(this, 100, (i * this.height) ,75, this.height + 8);
        }
    }
    //Areia
    sand.onload = function() {
        var sandQtde = Math.ceil(canvas.height / this.height);
        for (var i = 0; i < sandQtde; i++) {
            context.drawImage(this, 50, (i * this.height), 50, this.height + 8);
        }
    }
    //Agua
    water.onload = function() {
        var waterQtde = Math.ceil(canvas.height / this.height);
        for (var i = 0; i < waterQtde; i++) {
            context.drawImage(this, 0, (i * this.height), 50, this.height + 8);
        }
    }
}
/*              #########################   Ações do carro   #####################                */
//Movimentação do veiculo
function movimentaCarro(e) {
    var mv = e.which || e.KeyCode;
    switch (mv) {
        //Esquerda
        case 97, 65:
            carro.moveLeft(10);
            desenhaCarro();
            break;
        //Direita
        case 100, 68:
            carro.moveRigth(10);
            desenhaCarro();
            break;
        //Cima
        case 119, 87:
            carro.moveUp(10);
            desenhaCarro();
            break;
        //Baixo
        case 115, 83:
            carro.moveDown(10);
            desenhaCarro();
            break;
        default:
            break;
    }
};
function desenhaCarro() {
    context.beginPath();
    context.fillStyle = "#1C1C1C";
    context.fillRect(carro.getX() - 10, carro.getY() - 10, carro.getWidth() + 10, carro.getHeight() + 20);
    context.drawImage(carro.getImg(), carro.getX(), carro.getY(), carro.getWidth(), carro.getHeight());
}


//Cria e movimenta os inimigos
function inimigos() {
    var ry = [0, 80, 150];
    var rx = [220, 400, 600, 800, 935];
    var enemys = [];
    for (var i = 0; i < 5; i++) {
        enemys.push(new InimigoSprite(rx[Math.floor(Math.random() * (5))] , ry[Math.floor(Math.random() * (3))]));
    }
    function loop() {
        for (var i = 0; i < 5; i++) {
            var colisao = enemys[i].bateu(carro);
            if (colisao) {
                gameOver(enemys[i]);
                break;
            } else {
                if (enemys[i].getY() > canvas.height) {
                    enemys[i].setY(ry[Math.floor(Math.random() * (3))]);
                    enemys[i].setX(rx[Math.floor(Math.random() * (5))]);   
                }
                if (!colisao) {
                    enemys[i].setY(enemys[i].getY() + movimentoVelocidade);
                    enemys[i].fly();
                }
            }
        }

        if (!colisao) {
            setTimeout(loop, velocidade);
        }

    }
    setTimeout(loop, velocidade);
}
/*                    #################        Iniciar jogo,parar jogo e reiniciar    ####################                      */
//Inicia o jogo
function gameStart() {
    var imgCarro = new Image();
    imgCarro.src = carroEscolhido;
    imgCarro.onload = function () {
        context.drawImage(this, 600, 500, 120, 120);
    }
    carro = new Carro(600, 500, imgCarro);
    document.addEventListener("keydown", movimentaCarro);
    document.addEventListener("keyup", movimentaCarro);
    var div = 2;
    function movimentaCenario() {
        //Lateral vermelha e branca
        for (var i = 0; i < 8; i++) {
            if (div == 2) {
                if (i % 2 == 0) {
                    context.fillStyle = "red";
                    context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
                    context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
                } else {
                    context.fillStyle = "white";
                    context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
                    context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
                }
            } else {
                if (i % 2 != 0) {
                    context.fillStyle = "red";
                    context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
                    context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
                } else {
                    context.fillStyle = "white";
                    context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
                    context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
                }
            }
        }
        div = div == 2 ? 1 : 2;
        if (!finish) {
            setTimeout(movimentaCenario, velocidade);
        }
    }
    setTimeout(movimentaCenario, velocidade);
    inimigos();

    var acelera = setInterval(() => {
        //Velocidade limite do jogo
        if (velocidade <= 100) {
            stop();
        }
        if (movimentoVelocidade < 15) {
            movimentoVelocidade += 1;
        }
        velocidade -= 50;
    }, 8000)
    function stop() {
        clearInterval(acelera);
    }
}
//Ações para serem executadas após falha do usuário
function gameOver(inimigoColisao) {
    finish = true;
    document.removeEventListener("keydown", movimentaCarro);
    document.removeEventListener("keyup", movimentaCarro);
    var animate = [
        'img/bloodsplats_0001.png',
        'img/bloodsplats_0002.png',
        'img/bloodsplats_0003.png',
        'img/bloodsplats_0004.png',
        'img/bloodsplats_0005.png',
        'img/bloodsplats_0006.png',
        'img/bloodsplats_0007.png'
    ];
    //Animação sangue
    var sprite = setInterval(() => {
        if (animate.length == 0) {
            context.font = "9em mortal";
            context.fillStyle = "red";
            context.textAlign = "center";
            context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
            clearInterval(sprite);
        }
        var img = new Image();
        img.src = animate.shift();
        img.onload = function () {
            context.drawImage(this, inimigoColisao.getX() - 10, inimigoColisao.getY() - 10, 140, 140);
        }
    }, 30);
    // Verifica se o usuário possui record e se a pontuação atual é maior que o record
    if (localStorage.getItem('record')) {
        if (localStorage.getItem('record') < score) {
            localStorage.setItem('record', score);
        }
    } else {
        localStorage.setItem('record', score);
    }
}
// Faz um reload na pagina para reiniciar o jogo
function tryagain() {
    location.reload();
}