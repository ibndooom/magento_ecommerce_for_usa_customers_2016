<?php
/*
    $rest_json = file_get_contents("php://input");
    $values = json_decode($rest_json, TRUE);
    error_log(print_r($values, TRUE)."\n",3,"/var/www/sswprinting/plivo/plivo_log.log");
    if($values['from_number'] != '+17189646400'){
        $code = strtolower(trim($values['interaction']));
        if ($code == 'apple'){
            $code_response = 'fruit';
        } elseif ($code == 'carrot'){
            $code_response = 'vegetable';
        } elseif ($code == 'jordan'){
            $code_response = 'basketball player';
        } elseif ($code == 'new york'){
            $code_response = 'knicks';
        } elseif ($code == 'tom-cruise'){
            $code_response = 'actor';
        } elseif($code == 'mike-tyson'){
            $code_response = 'boxer';
        } elseif($code == 'michael-jackson'){
            $code_response = 'singer';
        } elseif($code == 'jay-z'){
            $code_response = 'rapper';
        } elseif($code == 'gurjot'){
            $code_response = 'ASSHOLE!!';
        } else{
            $code_response = 'That is not an acceptable keyword. Try again.';
        }
        $url = 'https://api.bettervoice.com/api/v3/sms/send/?username=mannu&token=ec4879945701fefdf582265bd98d2576c4';
        $data = array('to_number' => $values['from_number'], 'from_number' => '+17189646400', 'body' => $code_response);
        $options = array(
            'http' => array(
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
    }
*/
?>
