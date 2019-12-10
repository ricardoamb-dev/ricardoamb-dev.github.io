$(document).ready(function(){

    $("#menu > #mobile-button").on("click", function() {
       $("#menu > .menu-container").addClass("active"); 
       $("#menu > .menu-container > .close-button").addClass('active');
    });
    $("#menu > .menu-container > .close-button").on("click", function(){
        $("#menu > .menu-container").removeClass("active");
        $("#menu > .menu-container > .close-button").removeClass('active');
    });

    if ( $('body').hasClass('post') )
    {
        $(".share-links").jsSocials({
            shares: [
                "email",
                "facebook",
                "twitter", 
                "linkedin",
                "pinterest",
                "stumbleupon",
                "whatsapp"
            ],
            showLabel: false,
            showCount: false,
            shareIn: "popup"
        }).prepend('<span>Compartilhe</span>');
    }
});

$("#form-send-button").on('click', function(){
    $("#modal").addClass('active');
});
$("#modal-close-button").on('click', function(){
    $("#modal").removeClass('active');
});

/**
 * Support Functions
 */

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}