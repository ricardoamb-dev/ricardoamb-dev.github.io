// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {

    //
    // Função para interação do navbar com o scroll
    //
    var MQL = 1170;
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll',{
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                if (currentTop < this.previousTop) {
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else {
                    if (currentTop > 30 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible');
                        if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                    }
                }
                this.previousTop = currentTop;
            }
        );
    }

    //
    // Função para validação do formulario de contato.
    //
    $('#contactForm').submit(function(){return false;})
    $('#btnContact').click(function(){
        var err = 0;
        var nome = $('#nome');
        var email = $('#email');
        var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if(nome.val() == ""){
            nome.addClass('input-error');
            err++;
        }else if(nome.hasClass('input-error')){
            nome.removeClass('input-error');
        }
        if(email.val() == ""){
            email.addClass('input-error');
            err++;
        }else{
            if(filter.test(email.val()) && email.hasClass('input-error')){
                email.removeClass('input-error');
            }else{
                email.addClass('input-error');
                err++;            }
        }
    });
});
