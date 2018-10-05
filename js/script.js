var context;

$(document).ready(function() {
    $("#corrida").css("border",0).css("padding", 0).css("margin", 0);
    $("#corrida").attr("width",$(document).width()).attr("height",$(document).height());
    var canvas = document.getElementById("corrida");
    criaJogo(canvas);    
    
    
});
$(window).bind("resize",function() {
    $("#corrida").attr("width",$(document).width()).attr("height",$(document).height());
    console.log("resize");
    criaJogo(document.getElementById("corrida"));
});

function criaJogo(canvas) {
    console.log("desenho");
    context = canvas.getContext('2d');
    var quadradosGuia = canvas.height / 8;
    //Desenhando grama
    // context.beginPath();
    context.fillStyle = "#63ca00";
    context.fillRect(0, 0, 250, canvas.height);
    context.fillRect(canvas.width - 250, 0, 250, canvas.height);

    //Desenhando guias
    
    //Esquerda
    context.beginPath();
    context.moveTo(300,0);
    context.lineTo(300, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(250,(i * quadradosGuia), 50, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(250,(i * quadradosGuia), 50, quadradosGuia);
        }
    }
    

    //Direita
    context.moveTo(canvas.width - 250, 0);
    context.lineTo(canvas.width - 250, canvas.height);
    for (var i = 0; i < 8; i++) {
        if (i % 2 == 0) {
            context.fillStyle = "red";
            context.fillRect(canvas.width - 250,(i * quadradosGuia), 50, quadradosGuia);
        } else {
            context.fillStyle = "white";
            context.fillRect(canvas.width - 250,(i * quadradosGuia), 50, quadradosGuia);
        }
    }

    context.lineWidth = 1;
    context.strokeStyle = 'red';

    context.stroke();

    //Desenhando na rua as faixas
    context.fillStyle = "white";
    var centro = canvas.width / 2;
    var faixas = canvas.height / 6;
    for (var i = 0; i < 6; i++) {
        context.fillRect(centro,(i * faixas), 20, faixas - 15);
    }
}