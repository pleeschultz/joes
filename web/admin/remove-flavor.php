<?php

$store = $_POST['store'];

$str_data = file_get_contents("../data/" . $store . ".json");
$data = json_decode($str_data,true);


$removeId = $_POST['flavorId'];

$data["flavorIds"] =  array_merge(array_diff($data["flavorIds"], array($removeId)));

$fh = fopen("../data/" . $store . ".json", 'w')
      or die("Error opening output file");
fwrite($fh, json_encode($data, JSON_UNESCAPED_UNICODE));
fclose($fh);

echo json_encode($data, JSON_UNESCAPED_UNICODE);

?>
