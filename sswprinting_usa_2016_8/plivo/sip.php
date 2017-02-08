<?php
    require_once 'plivo.php';
date_default_timezone_set("America/New_York");
try {
    /*     * * connect to database ** */
    /*     * * mysql hostname ** */
    $mysql_hostname = 'localhost';

    /*     * * mysql username ** */
    $mysql_username = 'plivo';

    /*     * * mysql password ** */
    $mysql_password = 'pLvGtway';

    /*     * * database name ** */
    $mysql_dbname = 'plivo';

    /*     * * select the users name from the database ** */
    $dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);
    /*     * * $message = a message saying we have connected ** */

    /*     * * set the error mode to excptions ** */
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*     * * prepare the insert ** */
    $stmt = $dbh->prepare("SELECT * FROM voicemail WHERE `Read` = 0 ORDER BY `id` DESC");

    /*     * * execute the prepared statement ** */
    $stmt->execute();

    /*     * * check for a result ** */
    $messages = $stmt->fetchAll();

    /*     * * if we have no something is wrong ** */
    if ($messages == false) {
        $message = 'Access Error';
    }
} catch (Exception $e) {
  //  /*     * * if we are here, something is wrong in the database ** */
    $message = 'We are unable to process your request. Please try again later';
}
    if('18009505563' != $_POST['From']){
//    if('19173499625' != $_POST['From']){
//if(true){
// if((date('H') < 9 || date('H') > 18)  || (date('N') == 6 || date('N') == 7)){
   if((date('H') >= 9 && date('H') < 18)  && (date('N') != 6 && date('N') != 7)){
	    $body = 'http://dev.sswprinting.com/plivo/audio/Main.mp3';
	    $getdigitattributes = array (
                'action'=> 'http://dev.sswprinting.com/plivo/extension.php',
            ); // This is the url where 'Digits' parameter would be sent after user's digit press event
            $r = new Response();
            $g = $r->addGetDigits($getdigitattributes);
            $g->addPlay($body);
        }
        else{
            $body = 'http://dev.sswprinting.com/plivo/audio/SSWClosed.mp3';
            $getdigitattributes = array (
                'action'=> 'http://dev.sswprinting.com/plivo/vm_extension.php',
            ); // This is the url where 'Digits' parameter would be sent after user's digit press ev
            $r = new Response();
            $r->addWait();
            $g = $r->addGetDigits($getdigitattributes);
            $g->addPlay($body);
//            $r->addRecord(array('action' => 'http://dev.sswprinting.com/plivo/voicemail.php','fileFormat' => 'wav', 'maxLength' => '3600', 'playBeep' => 'true', 'finishOnKey' => '#'));
        }
    }
    else {
        $num_messages = '';
        $cm = count($messages);
        if($cm > 0){
            if($cm == 1){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm1.wav';
            }
            elseif($cm == 2){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm2.wav';
            }     
       	    elseif($cm == 3){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm3.wav';
            }     
       	    elseif($cm == 4){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm4.wav';
            }     
       	    elseif($cm == 5){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm5.wav';
            }     
       	    elseif($cm == 6){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm6.wav';
            }     
       	    elseif($cm == 7){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm7.wav';
            }     
       	    elseif($cm == 8){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm8.wav';
            }     
       	    elseif($cm == 9){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm9.wav';
            }     
       	    elseif($cm == 10){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm10.wav';
            }     
       	    elseif($cm > 10){
                $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm10p.wav';
            }
        } else{
            $num_messages = 'http://dev.sswprinting.com/plivo/audio/cm0.wav';
        }
        $r = new Response();
for($i=0;$i<2;$i++){
        $r-> addWait();
        $r->addPlay($num_messages);
        $r-> addWait();
        $stiff = count($messages) - 1;
        foreach($messages as $vm=>$val){
            if($vm == 0){
                $r->addPlay('http://dev.sswprinting.com/plivo/audio/fm.wav');
            }
            elseif($vm == $stiff){
                $r->addPlay('http://dev.sswprinting.com/plivo/audio/lm.wav');
            }
            else {
                $r->addPlay('http://dev.sswprinting.com/plivo/audio/nm.wav');
            }
            $g = $r->addGetDigits(array('action' => 'http://dev.sswprinting.com/plivo/delete_vm.php?id='.$val['id'], 'numDigits' => '1', 'method' => 'GET', 'redirect' => 'false', 'timeout' => '2'));
            $g->addPlay($val['RecordFile']);
            $g->addSpeak('To delete this message, press 1.');
            $g->addWait(array('length' => '1'));
}
        }
    }
    error_log($r->toXML());
    echo($r->toXML());
?>
