<?php
// Prepare
header("Content-Type: text/html; charset=utf-8");
set_time_limit(600);
$mtime = microtime(true);

// Create a stream
$opts = array(
	'http'=>array(
		'method'=>"GET",
		'header'=>"Accept-language: en\r\n" .
		"Cookie: ci%2Dnm=habarovsk; ci%2Dix=680000; cooked=1; updates=1; _ym_isad=0\r\n"
		)
	);
$context = stream_context_create($opts);

echo '<pre><h1>Закешированы RSS XML!</h1>' . date("Ymd-His", time()+14400) . '<br /><br />';

// Array to json convert
$arrayOut = array (
	"news" => array (
		"all" => array (
			"posts" => array (
				array(
				"id" => "1",
				"vendor" => "Площадь",
				"model"  => "Ленина"
				),
				array(
				"id" => "2",
				"vendor" => "Карла",
				"model"  => "Маркса"
				),
				array(
				"id" => "1",
				"vendor" => "Роза",
				"model"  => "Люхембурк"
				)
			)
		)
	),
	"sale" => array (
		"all" => array (
			"posts" => array (
				array(
				"id" => "1",
				"vendor" => "Выставка",
				"model"  => "Ван Гога"
				),
				array(
				"id" => "2",
				"vendor" => "Обувь",
				"model"  => "Лабутены"
				),
				array(
				"id" => "1",
				"vendor" => "Штаны",
				"model"  => "Охуительные"
				)
			)
		)
	),
	"cinema" => array (
		"all" => array (
			"posts" => array (
				array(
				"id" => "1",
				"vendor" => "Выставка",
				"model"  => "Ван Гога"
				),
				array(
				"id" => "2",
				"vendor" => "Обувь",
				"model"  => "Лабутены"
				),
				array(
				"id" => "1",
				"vendor" => "Штаны",
				"model"  => "Охуительные"
				)
			)
		)
	),
	"events" => array (
		"all" => array (
			"posts" => array (
				array(
				"id" => "1",
				"vendor" => "Выставка",
				"model"  => "Ван Гога"
				),
				array(
				"id" => "2",
				"vendor" => "Обувь",
				"model"  => "Лабутены"
				),
				array(
				"id" => "1",
				"vendor" => "Штаны",
				"model"  => "Охуительные"
				)
			)
		)
	),
	"currency" => array (
		"all" => array (
			"posts" => array (
				array(
				"id" => "1",
				"vendor" => "Выставка",
				"model"  => "Ван Гога"
				),
				array(
				"id" => "2",
				"vendor" => "Обувь",
				"model"  => "Лабутены"
				),
				array(
				"id" => "1",
				"vendor" => "Штаны",
				"model"  => "Охуительные"
				)
			)
		)
	),
);


// =====================================================================================
// =============== Parsing XML RSS Channels and Save content to HTML Cache =============
// =====================================================================================

// all news
// $arrXmlNews = objectsIntoArray(simplexml_load_string(file_get_contents('http://www.moigorod.ru/uploads/rss/_headlines/680000/news-main.xml', false, $context))); // replace Category in URL
$arrXmlNews = objectsIntoArray(simplexml_load_string(file_get_contents('news-main.xml', false, $context)));															// replace Category in URL
echo '<hr />' . round((microtime(true) - $mtime) * 1, 4) . "\t<strong>Parsing News RSS... " . count($arrXmlNews['channel']['item']) . " elements</strong>"; flush(); // replace Category in echo




foreach ($arrXmlNews['channel']['item'] as $item) {
	if (file_exists("stop.txt")) {exit("<br />stop.txt!");}
	$filename = str_ireplace("http://habarovsk.MoiGorod.Ru/m/news/?n=", "", $item["pdalink"]); 														// replace URL in str_ireplace
	echo '<br />' . round((microtime(true) - $mtime) * 1, 4) . "\tChecking news/" . $filename . ".html"; flush(); 									// replace Category in "checking "
	$path = "news/$filename.html"; 																													// replace folder in path variable
	if (file_exists($path)) {
		echo "\tCached ok"; flush();
	} else {
	$contentHTML = file_get_contents($item["pdalink"], false, $context);
	echo "\tDownload " . strlen($contentHTML) ." bytes\tFrom: " . $item["pdalink"] . "\tTo: " .$path; flush();
	file_put_contents($path, $contentHTML);
	}
	
	// Add data to array
	$arrayOut['news']['all']['posts'][] = array(
		"id" => $filename,
		"title" => $item["title"],
		"link" => $item["link"],
		"pdalink" => $item["pdalink"],
		"description" => $item["description"],
		"pubDate" => $item["pubDate"],
		
		
		"vendor" => $item["title"],
		"model" => $item["pubDate"],
		
		
		"content"  => $localContent
	);
}
echo '<br />' . round((microtime(true) - $mtime) * 1, 4) . "\t<strong>Done!</strong>"; flush();

print_r($arrayOut);

$result = _json_encode($arrayOut);
file_put_contents('jsontest.txt', $result);
echo $result;

/* 
// all city events
// $arrXmlEvents = objectsIntoArray(simplexml_load_string(file_get_contents('http://www.moigorod.ru/uploads/rss/_headlines/680000/events-all.xml', false, $context)));	// replace Category in URL
$arrXmlEvents = objectsIntoArray(simplexml_load_string(file_get_contents('events-all.xml', false, $context)));															// replace Category in URL
 echo '<hr />' . round((microtime(true) - $mtime) * 1, 4) . "\t<strong>Parsing Events RSS... " . count($arrXmlEvents['channel']['item']) . " elements</strong>"; flush(); // replace Category in echo
foreach ($arrXmlEvents['channel']['item'] as $item) {
	if (file_exists("stop.txt")) {exit("<br />stop.txt!");}
	$filename = str_ireplace("http://habarovsk.MoiGorod.Ru/m/events/?id=", "", $item["pdalink"]); 													// replace URL in str_ireplace
	echo '<br />' . round((microtime(true) - $mtime) * 1, 4) . "\tChecking events/" . $filename . ".html"; flush(); 								// replace Category in "checking "
	$path = "events/$filename.html"; 																												// replace folder in path variable
	if (file_exists($path)) {
		echo "\tCached ok"; flush();
	} else {
	$contentHTML = file_get_contents($item["pdalink"], false, $context);
	echo "\tDownload " . strlen($contentHTML) ." bytes\tFrom: " . $item["pdalink"] . "\tTo: " .$path; flush();
	file_put_contents($path, $contentHTML);
	}
}
echo '<br />' . round((microtime(true) - $mtime) * 1, 4) . "\t<strong>Done!</strong>"; flush();
 */

/* 
// cinema today
// $arrXmlCinema = objectsIntoArray(simplexml_load_string(file_get_contents('http://www.moigorod.ru/uploads/rss/_headlines/680000/cinema-newfilms.xml', false, $context)));// replace Category in URL
$arrXmlCinema = objectsIntoArray(simplexml_load_string(file_get_contents('cinema-newfilms.xml', false, $context))); 														// replace Category in URL
echo '<hr />' . round((microtime(true) - $mtime) * 1, 4) . "\t<strong>Parsing Cinema RSS... " . count($arrXmlCinema['channel']['item']) . " elements</strong>"; flush(); 	// replace Category in echo
foreach ($arrXmlCinema['channel']['item'] as $item) {
	if (file_exists("stop.txt")) {exit("<br />stop.txt!");}
	$filename = str_ireplace("http://habarovsk.MoiGorod.Ru/m/kino/movie.asp?m=", "", $item["pdalink"]); 											// replace URL in str_ireplace
	echo '<br />' . round((microtime(true) - $mtime) * 1, 4) . "\tChecking cinema/" . $filename . ".html"; flush(); 								// replace Category in "checking "
	$path = "cinema/$filename.html"; 																												// replace folder in path variable
	if (file_exists($path)) {
		echo "\tCached ok"; flush();
	} else {
	$contentHTML = file_get_contents($item["pdalink"], false, $context);
	echo "\tDownload " . strlen($contentHTML) ." bytes\tFrom: " . $item["pdalink"] . "\tTo: " .$path; flush();
	file_put_contents($path, $contentHTML);
	}
}
echo '<br />' . round((microtime(true) - $mtime) * 1, 4) . "\t<strong>Done!</strong>"; flush();
 */



// =====================================================================================
// ========================== Get Currency Information =================================
// =====================================================================================

/* 
// currency
$content = file_get_contents('http://www.moigorod.ru/m/info/currency.asp', false, $context);
 */


// =====================================================================================
// ======================= Parsing HTML Content into JSON ==============================
// =====================================================================================




echo '<br /><br />Exec time: ' . round((microtime(true) - $mtime) * 1, 4) . ' s.</pre>';


// =====================================================================================
// ================================= Functions =========================================
// =====================================================================================


// Parsing XML into Array source code from xml_parse page php.chm
function objectsIntoArray($arrObjData, $arrSkipIndices = array())
{
$arrData = array();
if (is_object($arrObjData)) { // if input is object, convert into array
	$arrObjData = get_object_vars($arrObjData);
}
if (is_array($arrObjData)) {
	foreach ($arrObjData as $index => $value) {
		if (is_object($value) || is_array($value)) {
			$value = objectsIntoArray($value, $arrSkipIndices); // recursive call
		}
		if (in_array($index, $arrSkipIndices)) {
			continue;
		}
		$arrData[$index] = $value;
	}
}
return $arrData;
}

// optimize array
function optimizeArray($array)
	{
	$array = array_unique($array);
	$array = array_map('trim', $array);
	$array = array_filter($array);
	return $array;
	}	

// pause rnd seconds
function rndSleep($pauseMin,$pauseMax) {
	$pause = rand ($pauseMin,$pauseMax); 
	echo "<br />Pause $pause s.";
	flush();
	sleep($pause);
	}

// alternative json_encode
function _json_encode($val)
 {
     if (is_string($val)) return '"'.addslashes($val).'"';
     if (is_numeric($val)) return $val;
     if ($val === null) return 'null';
     if ($val === true) return 'true';
     if ($val === false) return 'false';

     $assoc = false;
     $i = 0;
     foreach ($val as $k=>$v){
         if ($k !== $i++){
             $assoc = true;
             break;
         }
     }
     $res = array();
     foreach ($val as $k=>$v){
         $v = _json_encode($v);
         if ($assoc){
             $k = '"'.addslashes($k).'"';
             $v = $k.':'.$v;
         }
         $res[] = $v;
     }
     $res = implode(',', $res);
     return ($assoc)? '{'.$res.'}' : '['.$res.']';
 }

echo '<br /><br />Exec time: ' . round((microtime(true) - $mtime) * 1, 4) . ' s.</pre>';








































/* 
// suspended function due to rss parsing version improved and cookie support!
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
 */
// Новости основные http://www.moigorod.ru/uploads/rss/_headlines/680000/news-main.xml
// Новости спорта http://www.moigorod.ru/uploads/rss/_headlines/680000/news-sport.xml
// Объявления http://www.moigorod.ru/uploads/rss/_headlines/680000/board-main.xml
// Работа - Вакансии http://www.moigorod.ru/uploads/rss/_headlines/680000/board-vac.xml
// Работа - Резюме http://www.moigorod.ru/uploads/rss/_headlines/680000/board-res.xml
// Знакомства - парни http://www.moigorod.ru/uploads/rss/_headlines/680000/board-lovm.xml
// Знакомства - девушки http://www.moigorod.ru/uploads/rss/_headlines/680000/board-lovf.xml
// Городская афиша http://www.moigorod.ru/uploads/rss/_headlines/680000/events-all.xml
// Каталог фирм и заведений http://www.moigorod.ru/uploads/rss/_headlines/680000/catalog-all.xml
// Призовой клуб - Новые конкурсы http://www.moigorod.ru/uploads/rss/_headlines/680000/prizeclub-newcompet.xml
// Новости кино http://www.moigorod.ru/uploads/rss/_headlines/0/news-cinema.xml
// Форум - Новые темы http://www.moigorod.ru/uploads/rss/_headlines/680000/board-forum.xml
// Кино - Сегодня в кино http://www.moigorod.ru/uploads/rss/_headlines/680000/cinema-newfilms.xml
// Конференции с известными людьми http://www.moigorod.ru/uploads/rss/_headlines/680000/f2f-newconf.xml
// Домашние странички http://www.moigorod.ru/uploads/rss/_headlines/0/hp-newpages.xml
// Валюты http://www.moigorod.ru/m/info/currency.asp

// http://www.moigorod.ru/m/news/ - GOOD!!!!!!!
// $arrayNewsURLs = getCatURLs('http://www.moigorod.ru/m/news/', '#\<div.class\=\"mainnews\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $mtime);

// http://www.moigorod.ru/m/kino/
// $arrayCinemaURLs = getCatURLs('http://www.moigorod.ru/m/kino/', '#\<\/h1\>\<ul.class\=\"list\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $mtime);
// $arrayCinemaURLs = getCatURLs('content-cinema.txt', '#\<\/h1\>\<ul.class\=\"list\"\>(.*)\<div.id\=\"footMenu\"\>#sim', $mtime);


?>