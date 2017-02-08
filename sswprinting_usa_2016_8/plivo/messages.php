<?php
require_once 'plivo.php';
    $auth_id = "MAMMQ0YTHJOGRLOGFHNJ";
    $auth_token = "ODA0Y2JmYjc4MjUyOTYxMDk1YWJmYWEzYTAzZDE1";
$vars = $_POST;

    $p = new RestAPI($auth_id, $auth_token);

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

    /*     * * set the error mode to excptions ** */
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*     * * if we have no something is wrong ** */
    if ($username == false) {
        $message = 'Access Error';
    }
} catch (Exception $e) {
    /*     * * if we are here, something is wrong in the database ** */
}

$to = $_REQUEST['To'];
$from = $_REQUEST['From'];
$type = $_REQUEST['Type'];
$text = $_REQUEST['Text'];
$msg_id = $_REQUEST['MessageUUID'];

if(isset($_REQUEST['MessageUUID'])){

/*     * * prepare the insert ** */
    $stmt = "INSERT INTO messages (MessageTo,MessageFrom,MessageType,MessageText,MessageID) VALUES
(:MessageTo,:MessageFrom,:MessageType,:MessageText,:MessageID)";

    $t = $dbh->prepare($stmt);

    /*     * * execute the prepared statement ** */
    $t->execute(array(':MessageTo' => $vars['To'],':MessageFrom' => $vars['From'],':MessageType' => $vars['Type'],':MessageText' => $vars['Text'],':MessageID'=> $vars['MessageUUID']));

    /*     * * RESET ** */
    unset($t);

$params = array(
            'src' => '13309385278', // Sender's phone number with country code
            'dst' => '19173499625', // Receiver's phone number with country code
            'text' => "Message from $from:\n$text", // Your SMS text message
            'method' => 'POST', // The method used to call the url
            'type' => 'sms',
        );
    // Send message
    $response = $p->send_message($params);
}
else{
echo ':D';
}
?>
