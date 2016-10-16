<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$jiraUrl = $_GET['jiraUrl'];
$project = $_GET['project'];
$login64 = $_GET['login64'];
$status = $_GET['status'];

if(preg_match('/_YOUR_JIRA_URL_/',$jiraUrl)){
    print json_encode(['total'=>0,'error'=>'please replace "_YOUR_JIRA_URL_" and "_YOUR_LOGIN64_" in the config file']);
    die;
}

$status = explode(',',$status);

$jql = 'project = '.$project.' AND  status in ("'.implode('","',$status).'")';
$url = $jiraUrl."/rest/api/2/search?fields=id,key&jql=".urlencode($jql);

$ch = curl_init();
$headers = [
    'Accept: application/json',
    'Content-Type: application/json'
];

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_URL, $url);
//curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_USERPWD, base64_decode($login64));

$result = curl_exec($ch);
$ch_error = curl_error($ch);
curl_close($ch);

echo $ch_error ? "cURL Error: $ch_error" : $result ;