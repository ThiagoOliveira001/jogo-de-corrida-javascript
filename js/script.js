var context;
var canvas;
$(document).ready(function () {
    $("#corrida").css("border", 0).css("padding", 0).css("margin", 0);
    $("#corrida").attr("width", $(window).width()).attr("height", $(window).height());
    canvas = document.getElementById("corrida");
    criaJogo();


});
$(window).bind("resize", function () {
    $("#corrida").attr("width", $(window).width()).attr("height", $(window).height());
    canvas.width = $("#corrida").width();
    canvas.height = $("#corrida").height();
    console.log(canvas);
    criaJogo();
});

function criaJogo() {
    context = canvas.getContext('2d');
    var quadradosGuia = canvas.height / 8;
    //Desenhando grama
    context.beginPath();
    context.fillStyle = "#63ca00";
    context.fillRect(0, 0, canvas.width / 6.8, canvas.height);
    context.fillRect(canvas.width - (canvas.width / 6.8), 0, (canvas.width / 6.8), canvas.height);

    //Desenhando guias

    //Esquerda
    // context.beginPath();
    // context.moveTo(canvas.width / 5.45,0);
    // context.lineTo(canvas.width / 5.45, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(canvas.width / 6.8, (i * quadradosGuia), canvas.width / 27, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(canvas.width / 6.8, (i * quadradosGuia), canvas.width / 27, quadradosGuia);
        }
    }


    //Direita
    // context.moveTo(canvas.width - 250, 0);
    // context.lineTo(canvas.width - 250, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(canvas.width - (canvas.width / 6.8), (i * quadradosGuia), canvas.width / 27, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(canvas.width - (canvas.width / 6.8), (i * quadradosGuia), canvas.width / 27, quadradosGuia);
        }
    }

    // context.lineWidth = 1;
    // context.strokeStyle = 'red';

    // context.stroke();

    //Desenhando na rua as faixas
    context.fillStyle = "white";
    var centro = canvas.width / 2;
    var faixas = canvas.height / 6;
    for (var i = 0; i < 20; i++) {
        context.fillRect(centro, (i * faixas), 20, faixas - 15);
    }
    var aux = 5;
    var ey = 5;
    var velocidade = 50;
    setInterval(() => {

        if (ey > canvas.height) {
            aux = 0;
        }
        // context.fillStyle = "white";
        // context.fillRect(centro,ey - 45, 20, faixas - 15);  
        for (var i = 0; i < 6; i++) {
            context.fillStyle = "#313237";
            context.fillRect(centro, ey - 5, 20, faixas - 15);
            context.fillStyle = "white";
            context.fillRect(centro, ey, 20, faixas - 15);
            context.fillRect(centro, ey - canvas.height, 20, faixas - 15);
            context.fillStyle = "#313237";
            context.fillRect(centro, ey - (canvas.height + 5), 20, 5);
            ey += faixas;
        }
        aux += 5;
        ey = aux;
    }, velocidade);
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