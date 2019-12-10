<?php

include_once 'ricardoamb.helpers.php';

$email = null;
$mc_api_key = '908e1c353523fabd209554c71bf68217-us3';
$mc_list_id = '516bd4f872';
if ( isset ( $_POST['email'] ) ) $email= $_POST['email'];

if ( $email != null && $mc_api_key != '' && $mc_list_id != '' )
{

    $register_email = $email;
    $api_key = '908e1c353523fabd209554c71bf68217-us3';
    $server = 'us3.';
    $list_id = '516bd4f872';

    $auth = base64_encode( 'user:'.$api_key );

    $data = array(
        'apikey'        => $api_key,
        'email_address' => $email,
        'status'        => 'subscribed'
    );
    $json_data = json_encode($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://'.$server.'api.mailchimp.com/3.0/lists/'.$list_id.'/members/');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization: Basic '.$auth));
    curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);

    $result = curl_exec($ch);

    $result_obj = json_decode($result);

    // printing the result obtained
    // echo $result_obj->status;
    if ( $result_obj->status == 400 ) {
        if ( $result_obj->title == 'Member Exists' ){
            echo 'member_exists';
        }else if ( $result_obj->title == 'Forgotten Email Not Subscribed'){
            echo 'no_register';
        }
    }else if ($result_obj->status == 'subscribed' ){
        echo 'subscribed';
    }else{
        echo 'error';
    }

//    echo '<br>';
//    echo '<pre>'; print_r($result_obj); echo '</pre>';

}else{
    echo 'error';
}