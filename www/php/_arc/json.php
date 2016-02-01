<?php
// Prepare
header("Content-Type: text/html; charset=utf-8");
set_time_limit(10);
$mtime = microtime(true);
echo '<pre><h1>Start!</h1>' . date("Ymd-His", time()+14400) . '<br /><br />';














$arrayTest = array (
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
	)
);

$result = _json_encode($arrayTest);
file_put_contents('jsontest.txt', $result);
echo $result;

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
?>
