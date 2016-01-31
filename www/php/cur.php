<?php

// Create a stream
$opts = array(
	'http'=>array(
		'method'=>"GET",
		'header'=>"Accept-language: en\r\n" .
		"Cookie: ci%2Dnm=habarovsk; ci%2Dix=680000; cooked=1; updates=1; _ym_isad=0\r\n"
		)
	);
$context = stream_context_create($opts);

// Get currency
$content = file_get_contents('http://www.moigorod.ru/m/info/currency.asp', false, $context);
preg_match('#\<ul.class\=\"curr\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $content, $arrayContent);
$currencyContent = $arrayContent[1];
$currencyContent = str_ireplace("</li><li>", "<br />", $currencyContent);
$currencyContent = str_ireplace("<b>", "<h3>", $currencyContent);
$currencyContent = str_ireplace("</b>", "</h3>", $currencyContent);
$currencyContent = strip_tags($currencyContent, '<br><h1><h2><h3><h4><h5><h6>');
$currencyContent = str_ireplace("</h3><br />", "</h3>", $currencyContent);
print_r($currencyContent);


?>