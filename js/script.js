var context;
var canvas;
var velocidade = 1000;
var score = 0;
var carroEscolhido = 'img/car_black.svg';
var carro;
//Classes
function Inimigo(src, x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = src;
    this.width = 80;
    this.height = 80; 
    // this.img.onload = function () {
    //     context.drawImage(this.img, this.x, this.y, 80, 80);
    // }

    this.setSrc = function (src) {
        this.src = src;
    }
    this.setX = function (x) {
        this.x = x;
    }
    this.setY = function (y) {
        this.y = y;
    }
    this.getSrc = function () {
        return this.src;
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

    this.bateu = function (carro) {
        var colisaoXtopo = this.x >= carro.x && this.x <= (carro.width + carro.x);
        var colisaoYtopo = this.y >= (carro.y - carro.height + 2) && this.y <= (carro.height + this.y);
        var colisaoXBase = (carro.x + carro.width) >= this.x && (carro.x + carro.width) <= (this.x + this.width);
        var colisaoYBase = (carro.y + carro.width) >= this.y && (carro.y + carro.height) <= (this.y + this.height);
        console.log(velocidade);
        return (colisaoXtopo && colisaoYtopo) || (colisaoYBase && colisaoXBase);
    }
}

function Carro(src, x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = src;
    this.width = 80;
    this.height = 80;
    this.img.onload = function () {
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    this.setSrc = function (src) {
        this.src = src;
    }
    this.setX = function (x) {
        this.x = x;
    }
    this.setY = function (y) {
        this.y = y;
    }
    this.getSrc = function () {
        return this.src;
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

    this.moveLeft = function(value) {
        this.x -= value;
    }

    this.moveRigth = function(value) {
        this.x += value;
    }

    this.moveDown = function(value) {
        this.y += value;
    }

    this.moveUp = function(value) {
        this.y -= value;
    }
}
$(document).ready(function () {
    $("#corrida").css("border", 0).css("padding", 0).css("margin", 0);
    $("#corrida").attr("width", 1200).attr("height", 650);
    canvas = document.getElementById("corrida");
    criaJogo();


});
// $(window).bind("resize", function () {
//     $("#corrida").attr("width", $(window).width()).attr("height", $(window).height());
//     canvas.width = $("#corrida").width();
//     canvas.height = $("#corrida").height();
//     criaJogo();
// });

function criaJogo() {
    context = canvas.getContext('2d');
    var quadradosGuia = canvas.height / 8;
    //Desenhando grama
    desenhaGrama();

    //Desenhando guias

    //Esquerda
    // context.beginPath();
    // context.moveTo(canvas.width / 5.45,0);
    // context.lineTo(canvas.width / 5.45, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(175, (i * quadradosGuia), 40, quadradosGuia);
        }
    }


    //Direita
    // context.moveTo(canvas.width - 250, 0);
    // context.lineTo(canvas.width - 250, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(1029, (i * quadradosGuia), 40, quadradosGuia);
        }
    }

    // context.lineWidth = 1;
    // context.strokeStyle = 'red';

    // context.stroke();

    //Desenhando na rua as faixas
    // context.fillStyle = "white";
    // var centro = canvas.width / 2;
    // var faixas = canvas.height / 6;
    // for (var i = 0; i < 20; i++) {
    //     context.fillRect(centro, (i * faixas), 20, faixas - 15);
    // }
    //movimentção da rua
    var aux = 5;
    var ey = 5;
    var div = 2;
    function movimentaCenario() {
        // if (ey > canvas.height) {
        //     aux = 0;
        // }
        // // context.fillStyle = "white";
        // // context.fillRect(centro,ey - 45, 20, faixas - 15);  
        // for (var i = 0; i < 6; i++) {
        //     context.fillStyle = "#313237";
        //     context.fillRect(centro, ey - 5, 20, faixas - 15);
        //     context.fillStyle = "white";
        //     context.fillRect(centro, ey, 20, faixas - 15);
        //     context.fillRect(centro, ey - canvas.height, 20, faixas - 15);
        //     context.fillStyle = "#313237";
        //     context.fillRect(centro, ey - (canvas.height + 5), 20, 5);
        //     ey += faixas;
        // }
        // aux += 5;
        // ey = aux;
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
        setTimeout(movimentaCenario, velocidade);
    }
    setTimeout(movimentaCenario, velocidade);

    //Elementos do jogo
    // var carro = new Image();
    // carro.src = "img/car_black.svg";
    // carro.onload = function () {
    //     context.drawImage(this, posicaoCarro.x, posicaoCarro.y, 140, 140);
    // };
    carro = new Carro(carroEscolhido, 600, 500);
    inimigos();
    document.addEventListener("keydown", function (e) {
        var mv = e.which || e.KeyCode;
        gameStart();
        switch (mv) {
            //Esquerda
            case 37, 97, 65:
                carro.moveLeft(10);
                desenhaImg(carro.getImg(), { x: carro.getX() , y: carro.getY() }  , 140, 140);
                break;
            //Direita
            case 39, 100, 68:
                carro.moveRigth(10);
                desenhaImg(carro.getImg(), { x: carro.getX() , y: carro.getY() } , 140, 140);
                break;
            //Cima
            case 38, 119, 87:
                carro.moveUp(10);
                desenhaImg(carro.getImg(), { x: carro.getX() , y: carro.getY() } , 140, 140);
                break;
            //Baixo
            case 40, 115, 83:
                carro.moveDown(10);
                desenhaImg(carro.getImg(), { x: carro.getX() , y: carro.getY() } , 140, 140);
                break;
            default:
                break;
        }
    });
    //requestAnimationFrame(movimentaRua(faixas, quadradosGuia, centro, ey));
}

// function movimentaRua(faixas, quadradosGuia, centro, ey) {
//     var aux = 5;
//     for (var i = 0; i < 6; i++) {
//         context.fillStyle = "#313237";
//         context.fillRect(centro, ey - 5, 20, faixas - 15);
//         context.fillStyle = "white";
//         context.fillRect(centro, ey, 20, faixas - 15);
//         ey += faixas;
//     }
//     aux += 5;
//     ey = aux;
//     context.fillStyle = "white";
//     context.fillRect(centro, ey, 20, faixas - 15);
//     requestAnimationFrame(movimentaRua(faixas, quadradosGuia, centro, ey + 5));
// }

function desenhaImg(img, cords, w, h) {
    context.fillStyle = "#313237";
    context.fillRect(cords.x, cords.y - 10, w, h + 20);
    desenhaGrama();
    context.drawImage(img, cords.x, cords.y, w, h);
}

function desenhaGrama() {
    context.beginPath();
    context.fillStyle = "#63ca00";
    context.fillRect(0, 0, 175, canvas.height);
    context.fillRect(1069, 0, 175, canvas.height);
}

function inimigos() {
    var enemys = [
        new Inimigo("img/obs-domador.svg", canvas.width / 2, 0),
        new Inimigo("img/obs-galinha.svg", canvas.width / 2, 0),
        new Inimigo("img/obs-pinguin.svg", canvas.width / 2, 0),
        new Inimigo("img/onikero.svg", canvas.width / 2, 0)
    ];
    var p = 0;
    function loop() {
        if (enemys[p].getY() > canvas.height) {
            enemys[p].setY(0);
            p = Math.floor(Math.random() * (4));
            enemys[p].setX(Math.floor(Math.random() * (1025 - 280) + 220));
        }
            //do {
            desenhaImg(enemys[p].getImg(), { x: enemys[p].getX(), y: enemys[p].getY() }, 80, 80);
            enemys[p].setY(enemys[p].getY() + 10);
            // } while (enemys[p].getY() < canvas.height);
            if (!enemys[p].bateu(carro)) {
                setTimeout(loop, velocidade);
            } else {
                
            }
                

    }
    setTimeout(loop, velocidade);
}


function gameStart() {
    var acelera = setInterval(() => {
            if (velocidade == 250) {
                velocidade = 50;
                stop();
            }
            velocidade -= 250;
        }, 5000)
    function stop() {
        clearInterval(acelera);      
    }
}