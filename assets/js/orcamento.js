$(document).ready(function(){
    $('#dados').addClass('active').fadeIn();
    $('#orca-telefone').mask('(00) 0000-0000', {clearIfNotMatch: true});
    $('#orca-celular').mask('(00) 00000-0000', {clearIfNotMatch: true});
    $('.msg-nome').removeClass('error');
});


/**
 * DADOS 
 */

$('.next-tipo').on('click',function(){
    var error = false;
    $('.dados-message').html('').removeClass('error');
    $('.msg-nome').removeClass('error').html('');
    $('.msg-email').removeClass('error').html('');
    $('.msg-cidade').removeClass('error').html('');
    $('.msg-estado').removeClass('error').html('');
    $('.msg-celular').removeClass('error').html('');
    if ( $('#orca-nome').val().length < 2 ) { $('.msg-nome').addClass('error').html('Campo obrigatório'); error = true };
    if ( $('#orca-email').val().length < 2 || !isValidEmailAddress($('#orca-email').val()) ) { $('.msg-email').addClass('error').html('Deve ser um e-mail válido'); error = true };
    if ( $('#orca-cidade').val().length < 2 ) { $('.msg-cidade').addClass('error').html('Campo obrigatório'); error = true };
    if ( $('#orca-estado').val().length != 2 ) { $('.msg-estado').addClass('error').html('Campo obrigatório'); error = true };
    if ( $('#orca-celular').val().length < 2 ) { $('.msg-celular').addClass('error').html('Campo obrigatório'); error = true };
    if ( !error ) {
        $('.dados-message').html('').removeClass('error');
        $('#dados').fadeOut(function(){
            $('#tipo').fadeIn();
        });
        $('#etapa-dados').removeClass('active');
        $('#etapa-tipo').addClass('active');
    }else{
        $('.dados-message').html('<i class="fa fa-warning"></i> Confira os campos e tente novamente!').addClass('error');
    }
});

/**
 * TIPOS
 */

$('.next-projeto').on('click',function(){
    $('.tipo-message').html('').removeClass('error');
    if ( $('input[name=orca-tipo]:checked').val() ) {
        $('#tipo').fadeOut(function(){
            $('#orca-projeto-dev').removeClass('active');
            $('#orca-projeto-web').removeClass('active');
            $('#orca-projeto-design').removeClass('active');
            if ( $('input[name=orca-tipo]:checked').val() == 'web' ) {
                $('#orca-projeto-web').addClass('active');
            }else if( $('input[name=orca-tipo]:checked').val() == 'dev' ){
                $('#orca-projeto-dev').addClass('active');
            }else if ( $('input[name=orca-tipo]:checked').val() == 'design' ){
                $('#orca-projeto-design').addClass('active');
            }
            $('#projeto').fadeIn();
        });
        $('#etapa-tipo').removeClass('active');
        $('#etapa-projeto').addClass('active');
    }else{
        $('.tipo-message').html('<i class="fa fa-warning"></i> Por favor, selecione um tipo de projeto.').addClass('error');
    }
});

$('.back-dados').on('click',function(){
    $('#tipo').fadeOut(function(){
        $('#dados').fadeIn();
    });
    $('#etapa-dados').addClass('active');
    $('#etapa-tipo').removeClass('active');
});

/**
 * PROJETO
 */

$('.back-tipo').on('click',function(){
    $('#projeto').fadeOut(function(){
        $('#tipo').fadeIn();
    });
    $('#etapa-tipo').addClass('active');
    $('#etapa-projeto').removeClass('active');
});

$('#orca-ja-tem-site-sim').on('click',function(){
    $('#orca-seu-site-input-box').fadeIn();
    $('#orca-fs-dominio').fadeOut();
    $('#orca-fs-hospedagem').fadeOut();
});

$('#orca-ja-tem-site-nao').on('click',function(){
    $('#orca-seu-site-input-box').fadeOut();
    $('#orca-fs-dominio').fadeIn();
    $('#orca-fs-hospedagem').fadeIn();
});

$('#orca-ja-tem-hospedagem-sim').on('click',function(){
    $('#orca-sua-hospedagem-input-box').fadeIn();
});

$('#orca-ja-tem-hospedagem-nao').on('click',function(){
    $('#orca-sua-hospedagem-input-box').fadeOut();
});