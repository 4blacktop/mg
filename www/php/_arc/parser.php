<?php
// готовимся
header("Content-Type: text/html; charset=utf-8");
set_time_limit(60);
$mtime = microtime(true);
echo '<pre><h1>Старт!</h1>' . date("Ymd-His", time()+14400) . '<br /><br />';

// http://www.moigorod.ru/m/news/ - GOOD!!!!!!!
// $arrayNewsURLs = getCatURLs('http://www.moigorod.ru/m/news/', '#\<div.class\=\"mainnews\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $mtime);

// http://www.moigorod.ru/m/kino/
$arrayCinemaURLs = getCatURLs('http://www.moigorod.ru/m/kino/', '#\<\/h1\>\<ul.class\=\"list\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $mtime);
// $arrayCinemaURLs = getCatURLs('content-cinema.txt', '#\<\/h1\>\<ul.class\=\"list\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $mtime);


echo '<br /><br />Exec time: ' . round((microtime(true) - $mtime) * 1, 4) . ' s.</pre>';

// получаем ссылки для разделов: новости, афиша
function getCatURLs($catURL, $regexp, $mtime)
	{
	echo '<hr />' . round((microtime(true) - $mtime) * 1, 4) . "\tParsing URLs from $catURL..." . '<br />'; flush();
	$content = file_get_contents($catURL);
	echo $content;
	echo round((microtime(true) - $mtime) * 1, 4) . "\tDone " . strlen($content) . ' bytes!<br />'; flush();
	preg_match($regexp, $content, $arrayContent);
	// print_r($arrayContent);
	// file_put_contents('out.html', $arrayContent[1]);
	preg_match_all('#href\=\"(.*?)\"#sim', $arrayContent[1], $shortURLs);
	$shortURLs[1] = optimizeArray($shortURLs[1]);
	foreach ($shortURLs[1] as $url) {
		$longURLs[] = "http://www.moigorod.ru" . $url;
		}
	echo round((microtime(true) - $mtime) * 1, 4) . "\tURLs found: " . sizeof($longURLs) . '<br />'; flush();
	print_r($longURLs);
	echo '<hr />';
	return($longURLs);		
	}

// оптимизирует массив
function optimizeArray($array)
	{
	$array = array_unique($array);
	$array = array_map('trim', $array);
	$array = array_filter($array);
	return $array;
	}	

// пауза случайной длительности	
function rndSleep($pauseMin,$pauseMax) {
	$pause = rand ($pauseMin,$pauseMax); 
	echo "<br />Pause $pause s.";
	flush();
	sleep($pause);
	}
?>