<?php
// готовимся
header("Content-Type: text/html; charset=utf-8");
set_time_limit(60);
$mtime = microtime(true);
echo '<pre><h1>Старт!</h1>' . date("Ymd-His", time()+14400) . '<br /><br />';
echo round((microtime(true) - $mtime) * 1, 4) . "\tGetting Content..." . '<br />'; flush();

// $content = file_get_contents('http://www.moigorod.ru/m/news/');
$content = file_get_contents('content.txt');

echo round((microtime(true) - $mtime) * 1, 4) . "\tDone " . strlen($content) . ' bytes!<br /><br />'; flush();
// print_r($content);
// <div class="mainnews">(.*)</li></ul>(.*)<div id="footMenu">
// preg_match('#<div class="mainnews">(.*)</li></ul>(.*)<div id="footMenu">#', $content, $arrayContent);
// var stringified = JSON.stringify(json).replace( /<div role=\\\"form\\\"[\s\S]*wpcf7-display-none\\\"><\/div><\/form><\/div>/gm, "" );
// preg_match('#\<div.class\=\"mainnews\"\>(.*)\<\/div\>#iU', $content, $arrayContent);
preg_match('#\<div.class\=\"mainnews\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $content, $arrayContent);
print_r($arrayContent[1]);

echo '<br /><br />Exec time: ' . round((microtime(true) - $mtime) * 1, 4) . ' s.</pre>';


?>