<?php
      require_once 'plivo.php';

      $clip = 'http://dev.sswprinting.com/plivo/audio/Away.mp3';
      $clip402 = 'http://dev.sswprinting.com/plivo/audio/AwayMannu.mp3';
      $body = 'After the beep, please leave a message followed by the pound sign. We will get back to you shortly.';
      $body_speak = 'You just entered a wrong input! Have a good day!';

      $attributes = array (
        'loop' => 2,
      );
      $digits = $_REQUEST['Digits'];
      $response = new Response();

      if ($digits == '1') {
            $response->addRecord(array('action' => 'http://dev.sswprinting.com/plivo/voicemail.php','fileFormat' => 'wav', 'maxLength' => '3600', 'playBeep' => 'true', 'finishOnKey' => '#'));
      } elseif ($digits == '402') {
            $response->addRecord(array('redirect' => 'false', 'recordSession' => 'true', 'fileFormat' => 'wav', 'maxLength' => '3600', 'playBeep' => 'false'));
            $g = $response->addDial(array('timeout'=>'20','dialMusic' => 'http://voteparhar.com/holdmusic.php','callerName' => 'Extension [402]'));
            $g->addUser('sip:ssw150818084453@phone.plivo.com');
            $g->addUser('sip:ssw150922215851@phone.plivo.com');
            $response->addPlay($clip402);
            $response->addRecord(array('action' => 'http://dev.sswprinting.com/plivo/voicemail.php','fileFormat' => 'wav', 'maxLength' => '3600', 'playBeep' => 'true', 'finishOnKey' => '#'));
      } else {
            $response->addSpeak($body_speak,$attributes);
      }

      header("Content-Type: text/xml");
      echo($response->toXML());
?>
