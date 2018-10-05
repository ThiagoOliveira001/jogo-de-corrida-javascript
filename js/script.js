var context;
var canvas;
$(document).ready(function() {
    $("#corrida").css("border",0).css("padding", 0).css("margin", 0);
    $("#corrida").attr("width",$(window).width()).attr("height",$(window).height());
    canvas = document.getElementById("corrida");
    criaJogo();    
    
    
});
$(window).bind("resize",function() {
    $("#corrida").attr("width",$(window).width()).attr("height",$(window).height());
    canvas.width = $("#corrida").width();
    canvas.height = $("#corrida").height();
    console.log(canvas);
    criaJogo();
});

function criaJogo() {
    context = canvas.getContext('2d');
    var quadradosGuia = canvas.height / 8;
    //Desenhando grama
    // context.beginPath();
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
            context.fillRect(canvas.width / 6.8,(i * quadradosGuia), canvas.width / 27, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(canvas.width / 6.8,(i * quadradosGuia), canvas.width / 27, quadradosGuia);
        }
    }
    

    //Direita
    // context.moveTo(canvas.width - 250, 0);
    // context.lineTo(canvas.width - 250, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(canvas.width - (canvas.width / 6.8),(i * quadradosGuia), canvas.width / 27, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(canvas.width - (canvas.width / 6.8),(i * quadradosGuia), canvas.width / 27, quadradosGuia);
        }
    }

    // context.lineWidth = 1;
    // context.strokeStyle = 'red';

    // context.stroke();

    //Desenhando na rua as faixas
    context.fillStyle = "white";
    var centro = canvas.width / 2;
    var faixas = canvas.height / 6;
    for (var i = 0; i < 6; i++) {
        context.fillRect(centro,(i * faixas), 20, faixas - 15);
    }
}