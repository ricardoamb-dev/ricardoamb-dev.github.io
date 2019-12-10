<?php

include_once 'ricardoamb.helpers.php';

$nome = null;
$email = null;
$mensagem =  null;

if ( isset ( $_POST['name'] ) ) $nome = $_POST['name'];
if ( isset ( $_POST['email'] ) ) $email= $_POST['email'];
if ( isset ( $_POST['message'] ) ) $mensagem = $_POST['message'];
if ( isset ( $_POST['hash'] ) ) $hash = $_POST['hash'];

if ( $nome !== null && $email !== null && $mensagem !== null && $hash === 'zz$QeJn#tV#H?Yv$&HEFL5ffNMysL327Gm+KAeWjT%Ek@NfZb?DuV2ayW*%5Kkx#27xzLG!RcnL-BxB*x%bVakVV&y6T_5fx9ZZ--NJL9QFSFP!PHGP&&k=U_HpE_LSm' )
{

    $from = $nome . '<' . $email . '>';
    $to = "eu@ricardoamb.com";
    $subject = 'Mensagem de ' . $nome . ' - ricardoamb.com';

    setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
    date_default_timezone_set('America/Sao_Paulo');

    $message = '<div class="email-container" style="padding-top:30px;border-top:5px solid #336699;max-width:600px;">';
    $message .= '<div style="display:block;text-align:center;"><img src="https://ricardoamb.com/assets/images/brand-dark.svg" style="width:240px;height:auto;"></div>';
    $message .= '<div style="display:block;width:100%;text-align:center;margin-bottom:30px;font-family:sans-serif;margin-top:20px;"><h1 style="color:#336699;">Mensagem do Site</h1></div>';
    $message .= '<div style="font-family:sans-serif;display:block;color:#6f6f6f;">Mensagem enviada em:' . strftime('%A, %d de %B de %Y', strtotime('today')) . '</div>';
    $message .= '<div style="font-family:sans-serif;display:block;">Mensagem de : <strong>' . $nome . '</strong></div>';
    $message .= '<div><span style="display:block;margin-top:10px;font-family:sans-serif;">Mensagem:</span><p>' . $mensagem . '</p></div>';
    $message .= '<div class="footer"><p style="font-size:10px;font-family:sans-serif;color:#336699;">Mensagem enviada pelo formulário de contato do site.</p></div>';
    $message .= '</div>';

    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'From: ' . $nome . '<' . $email . '>' . "\r\n";

    if ( mail ( $to , $subject , $message , $headers ) )
    {
        echo 'ok';
    } else {
        echo 'error';
    }

}else{
    echo 'error';
}

