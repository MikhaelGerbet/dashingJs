<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

print json_encode(['value'=>rand(100,1000)]);