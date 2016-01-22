$(document).ready(function(){
    site = 'http://sentapuadesign.com/webservice/index.php';
    $.ajax({
        url: site,
        type: 'GET',
        success: function(data) {
            var content = data.responseText;
            var catalog = $(content).find('catalogo')
            alert(catalogo);
        }
    }).done(function(){
        alert('finalizado');
    });
});