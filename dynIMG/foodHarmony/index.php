<?php
$cuisine = 'Miscellaneous';
$fontName = 'Capriola-Regular';
$fontsPath = '../fonts/';

	putenv('GDFONTPATH=' . realpath($fontsPath));
	
	if(isset($_GET['font'])){
		if($_GET['font'] != ""){
			$fontName = $_GET['font'];
		}
	}

	if(isset($_GET['cuisine'])){
		if($_GET['cuisine'] != ""){
			$cuisine = $_GET['cuisine'];
		}
	}
	

	$quality = 100;
	$fontSize = 72;
	$height = -330;

	function center_text($string, $font_size){
		global $fontName;
		$image_width = 800;
		$dimensions = imagettfbbox($font_size, 0, $fontName, $string);
		return ceil(($image_width / 2) - ($dimensions[2] / 2));
	}

	$im = imagecreatefromjpeg("cutlery.jpg");
	$y = imagesy($im) - $height - 365;
	$x = center_text($cuisine, $fontSize);

	$text_color = imagecolorallocate($im, 54, 56, 60);
	imagettftext($im, $fontSize, 0, $x, $y, $text_color, $fontName, $cuisine);

	// Set the content type header - in this case image/jpeg
	header('Content-Type: image/jpeg');

	// Output the image
	imagejpeg($im);

	// Free up memory
	imagedestroy($im);

?>
