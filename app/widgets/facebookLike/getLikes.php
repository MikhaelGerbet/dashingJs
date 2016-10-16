<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$appId= '1687573184887715';
$appSecret= 'e078d6723561ba625d411e6610e747a2';

if(!isset($_GET['page'])){
    print json_encode(['error'=>'page is required']);
    die;
}
function fbLikeCount($pageId, $appId, $appSecret){
    $token = 'EAACEdEose0cBAN0dLFto6eZA9iY5JZCRe7ubb4QFTWZADZA0ZCui5xGgBlZBVd2Jgu29ZBi8BXEKZAGaHMYfMY7CRijFWzgyEs2ZCWi7ZAD0aQ9xKbMjkZAYwhaRFEszWZCcZB5p0FxKH8NkcmrP0tvaDjBJ71JE0nSkDbE0HwA6CEJhbNwZDZD';
    $json_url ='https://graph.facebook.com/'.$pageId.'?fields=fan_count&access_token='.$appId.'|'.$appSecret;
    $json = file_get_contents($json_url);
    $json_output = json_decode($json);
    return $json_output->fan_count ? $json : 0;
}
echo fbLikeCount($_GET['page'], $appId, $appSecret);