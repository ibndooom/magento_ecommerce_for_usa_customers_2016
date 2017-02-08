<?php

      require_once 'plivo.php';

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
} catch (Exception $e) {
}
$digits = $_REQUEST['Digits'];
$response = new Response();
      if ($digits == '1') {
            $tsql = "UPDATE voicemail SET `Read` = 1 WHERE id = \"" . $_REQUEST['id'] . "\" LIMIT 1";
$t = $dbh->prepare($tsql);
$t->execute();
$t->closeCursor();
      }
      header("Content-Type: text/xml");
      echo($response->toXML());
?>
