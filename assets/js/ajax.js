var ctt_name = $('#contact-input-name');
var ctt_email = $('#contact-input-email');
var ctt_message = $('#contact-input-message');
$('#name-msg').removeClass('error').removeClass('sucess').html('');
$('#email-msg').removeClass('error').removeClass('sucess').html('');

$('#form-send-button').on('click', function(){
    if ( !$(this).hasClass('disabled') )
    {
        if( $(ctt_name).val().length < 1 || $(ctt_email).val().length < 1 || $(ctt_message).val().length < 1 )
        {
            $('#name-msg').removeClass('success').removeClass('error').html('');
            $('#email-msg').removeClass('success').removeClass('error').html('');
            $('#message-msg').removeClass('success').removeClass('error').html('');
            if ( $(ctt_name).val().length < 1 ) $('#name-msg').addClass('error').html('Este campo é obrigatório e deve ter pelo menos 4 letras.');
            if ( $(ctt_email).val().length < 1 ) $('#email-msg').addClass('error').html('Este campo é obrigatório e deve ser um endereço de e-mail válido.');
            if ( $(ctt_message).val().length < 1 ) $('#message-msg').addClass('error').html('Este campo é obrigatório.')
        
        }else{
            var hash = $('.ricardoamb-form').data('hash');
            var ra_url = $('.ricardoamb-form').data('environment');
            $(this).html('<i class="fa fa-spinner fa-spin"></i> enviando...');
            sendContact( $(ctt_name).val() , $(ctt_email).val() , $(ctt_message).val() , ra_url , hash );
        }
    }
});

$('#contact-input-name').on('keyup',function(){
    if ( $(this).val().length > 4 ){
        $('#name-msg').removeClass('error').addClass('success').html('<i class="fa fa-check"></i>');
    }
}).on('blur',function(){
    if ( $(this).val().length < 4 ){
        $('#name-msg').removeClass('success').addClass('error').html('Este campo é obrigatório e deve ter pelo menos 4 letras.');
    }
});

$('#contact-input-email').on('keyup',function(){
    if ( $(this).val().length > 1 && isValidEmailAddress( $(this).val() ) ){
        $('#email-msg').removeClass('error').addClass('success').html('<i class="fa fa-check"></i>');
    }
}).on('blur', function(){
    if ( $(this).val().length < 1 || isValidEmailAddress( $(this).val() ) === false ){
        $('#email-msg').removeClass('success').addClass('error').html('Este campo é obrigatório e deve ser um endereço de e-mail válido.');
    }
});

$('#contact-input-message').on('keyup',function(){
    if ( $(this).val().length > 1 ){
        $('#message-msg').removeClass('error').addClass('success').html('<i class="fa fa-check"></i>');
    }
}).on('blur', function(){
    if ( $(this).val().length < 1 ){
        $('#message-msg').removeClass('success').addClass('error').html('Este campo é obrigatório.');
    }
});

function sendContact( ra_name = '' , ra_email = '' , ra_message = '' , url = '', ra_hash = '' ){
    
    var ra_url = url + "ricardoamb.send.message.php";

    if ( ra_name !== '' && ra_email !== '' && ra_message !== '' && ra_url !== '' && ra_hash !== '' )
    {
        $.ajax({
            method: "POST",
            url: ra_url,
            data: { 
                name: ra_name,
                email: ra_email,
                message: ra_message,
                hash: ra_hash
            }
        })
        .done(function( data ) {
            if ( data == 'ok' ){
                $('.form-button-msg').addClass('success').html('Mensagem Enviada. Aguarde a resposta!');
                $('#form-send-button').html('<i class="icon ion-md-checkmark"></i> pronto! ').removeClass('btn-default').addClass('disabled').css('background','green');
            }else{
                $('.form-button-msg').addClass('error').html('Houve um erro ao enviar a mensagem. Tente Novamente!');
                $('#form-send-button').html('<i class="icon ion-md-close"></i> Oops ').removeClass('btn-default').addClass('disabled').css('background','red');
            }
        }).fail(function(er){
            $('.form-button-msg').addClass('error').html(er).css('display','block');
            $('#form-send-button').html('<i class="icon ion-md-close"></i> Oops ').removeClass('btn-default').addClass('disabled').css('background','red');
        });
    }else{
        $('.form-button-msg').addClass('error').html('Houve um erro ao enviar a mensagem. Tente Novamente!');
        $('#form-send-button').html('<i class="icon ion-md-close"></i> Oops ').removeClass('btn-default').addClass('disabled').css('background','red');
    }

}


// Botão de cadastrar newsletter
$('#register-newsletter').on('click', function (){
    if ( !$(this).hasClass('disabled') ) {
        if ( $('#newsletter-email').val().length > 1 && isValidEmailAddress( $('#newsletter-email').val() ) ){
            $(this).html('<i class="fa fa-spinner fa-spin"></i> aguarde...');
            registerNewsletter();
        }else{
            $('#newsletter-fieldset').addClass('msg');
            $('#newsletter-msg').removeClass('success').addClass('error').html('<i class="fa fa-times"></i> Este campo é obrigatório e deve ser um endereço de e-mail válido.');
        }
    }
})

// Campo de email newsletter
$('#newsletter-email').on('keyup',function(){
    if ( $('#newsletter-email').val().length > 1 && isValidEmailAddress( $('#newsletter-email').val() ) ){
        $('#newsletter-fieldset').addClass('msg');
        $('#newsletter-msg').removeClass('error').addClass('success').html('<i class="fa fa-check"></i> E-mail Válido');
    }else{
        $('#newsletter-fieldset').removeClass('msg');
        $('#newsletter-msg').removeClass('success').removeClass('error').html(''); 
    }
}).on('blur',function(){
    if ( $('#newsletter-email').val().length < 1 && isValidEmailAddress( $('#newsletter-email').val() ) == false )
    {
        $('#newsletter-fieldset').addClass('msg');
        $('#newsletter-msg').removeClass('success').addClass('error').html('<i class="fa fa-times"></i> Este campo é obrigatório e deve ser um endereço de e-mail válido.');
    }
});

// Função Newsletter
function registerNewsletter()
{
    var ra_url = $('#newsletter-form').data('environment') + 'ricardoamb.register.newsletter.php';

    $.ajax({
        method: "POST",
        url: ra_url,
        async: true,
        cache: false,
        data: { 
            email: $('#newsletter-email').val()
        }
    }).done(function(data){
        // Member Exists
        if ( data == 'subscribed' ){
            $('#newsletter-msg').removeClass('error').addClass('success').html('<i class="icon ion-md-checkmark"></i> Seu e-mail foi cadastrado. Aguarde Novidades!');
            $('#register-newsletter').removeClass('btn-default').html('<i class="icon ion-md-checkmark"></i> Cadastrado!').addClass('disabled').css('background','green');
            $('#newsletter-email').attr('disabled','disabled');
        }else if( data == 'member_exists' ){
           $('#newsletter-msg').removeClass('success').addClass('error').html('<i class="fa fa-check" style="color:green !important;"></i> Legal! Você já possui cadastro em nosso banco de dados.');
           $('#register-newsletter').removeClass('btn-default').html('<i class="icon ion-md-checkmark"></i> Cadastrado!').addClass('disabled').css('background','green');
           $('#newsletter-email').attr('disabled','disabled');
        }else if ( data == 'no_register' ){
            $('#newsletter-msg').removeClass('success').addClass('error').html('<i class="fa fa-times"></i> Não é possível cadastrar esse e-mail. Tente outro!');
            $('#register-newsletter').html('assinar <i class="icon ion-md-checkmark"></i>');
            $('#newsletter-email').val('').focus();
        }else{ // Erro desconhecido
            $('#newsletter-msg').removeClass('success').addClass('error').html('<i class="fa fa-times"></i> Ocorreu um erro desconhecido!');
            $('#register-newsletter').removeClass('btn-default').html('<i class="fa fa-times"></i> Erro!').addClass('disabled').css('background','red');
            $('#newsletter-email').attr('disabled','disabled').css('color','red');
        }
    }).fail(function(er){
        alert(er);
    });
}