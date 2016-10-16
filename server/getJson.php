<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if(!isset($_GET['url'])){
    print json_encode(['error'=>'url is required']);
    die;
}

print file_get_contents($_GET['url']);