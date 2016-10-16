<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
if(!isset($_GET['url'])){
    exit('url is required');
}
$c = curl_init($_GET['url']);
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
$html = curl_exec($c);

if (curl_error($c)){
    die(curl_error($c));
}

$status = curl_getinfo($c, CURLINFO_HTTP_CODE);
curl_close($c);

print json_encode(['status'=>$status]);