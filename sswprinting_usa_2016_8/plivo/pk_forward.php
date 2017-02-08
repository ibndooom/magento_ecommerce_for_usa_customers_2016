<?php
      require_once 'plivo.php';

      $response = new Response();

      //    $response->addHangup(array('schedule'=>'20','reason'=>'busy'));
            $g = $response->addDial(array('timeout'=>'20'));
            $g->addNumber('17189646400');
      header("Content-Type: text/xml");
      echo($response->toXML());
?>
