<?php
ini_set("log_errors", 1);
date_default_timezone_set("America/New_York");
    require_once 'plivo.php';
    require_once 'vendor/mandrill/mandrill/src/Mandrill.php';
    $auth_id = "MAMMQ0YTHJOGRLOGFHNJ";
    $auth_token = "ODA0Y2JmYjc4MjUyOTYxMDk1YWJmYWEzYTAzZDE1";
$vars = $_POST;

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

    /*     * * prepare the insert ** */
    $stmt = "INSERT INTO voicemail (Digits,Direction,RecordUrl,CallFrom,CallerName,RecordingID,RecordFile,RecordingEndMs,BillRate,CallTo,RecordingDurationMs,CallUUID,CallStatus,Event,RecordingDuration,RecordingStartMs) VALUES 
(:Digits,:Direction,:RecordUrl,:CallFrom,:CallerName,:RecordingID,:RecordFile,:RecordingEndMs,:BillRate,:CallTo,:RecordingDurationMs,:CallUUID,:CallStatus,:Event,:RecordingDuration,:RecordingStartMs)";

    $t = $dbh->prepare($stmt);

    /*     * * execute the prepared statement ** */
    $t->execute(array(':Digits' => $vars['Digits'],':Direction' => $vars['Direction'],':RecordUrl' => $vars['RecordUrl'],':CallFrom' => $vars['From'],':CallerName'=> $vars['CallerName'],':RecordingID' => $vars['RecordingID'],':RecordFile' => 
$vars['RecordFile'],':RecordingEndMs' => $vars['RecordingEndMs'],':BillRate' => $vars['BillRate'],':CallTo' => $vars['To'],':RecordingDurationMs' => $vars['RecordingDurationMs'],':CallUUID' => $vars['CallUUID'],':CallStatus' => $vars['CallStatus'],':Event' => 
$vars['Event'],':RecordingDuration' => $vars['RecordingDuration'],':RecordingStartMs' => $vars['RecordingStartMs']));

    /*     * * RESET ** */
    unset($t);

    /*     * * if we have no something is wrong ** */
    if ($username == false) {
        $message = 'Access Error';
    }
} catch (Exception $e) {
    /*     * * if we are here, something is wrong in the database ** */
    error_log(print_r($e,TRUE));
}
    function make_bitly_url($url, $login, $appkey, $format = 'xml', $version = '2.0.1') {
        //create the URL
        $bitly = 'http://api.bit.ly/shorten?version=' . $version . '&longUrl=' . urlencode($url) . '&login=' . $login . '&apiKey=' . $appkey . '&format=' . $format;

        //get the url
        //could also use cURL here
        $response = file_get_contents($bitly);

        //parse depending on desired format
        if (strtolower($format) == 'json') {
            $json = @json_decode($response, true);
            return $json['results'][$url]['shortUrl'];
        } else { //xml
            $xml = simplexml_load_string($response);
            return 'http://bit.ly/' . $xml->results->nodeKeyVal->hash;
        }
    }
$short = make_bitly_url($vars['RecordUrl'], 'sswprinting', 'R_64bacee785754c988dbcaabd43a4cad3', 'json');
$short = ltrim ($short, 'http://');
$input = $vars['RecordingDuration'];
$seconds = $input % 60;
$seconds2 = sprintf("%02d", $seconds);
$input = floor($input / 60);

$minutes = $input % 60;
$input = floor($input / 60);
$units = ($minutes>0)?'min':'sec';

    $p = new RestAPI($auth_id, $auth_token);
    // Send a message
    $params = array(
            'src' => '17188742833',
            'dst' => '12122036160',
            'text' => 'New voicemail from '.$vars['From'].': '.$short.' ('.$minutes.':'.$seconds2.').',
            'type' => 'sms',
        );
    $response = $p->send_message($params);
$mandrill = new Mandrill("fSyt10wVdNXq79pVjps6wA");
$message = array(
    'subject' => 'New Voicemail From '.$vars['From'].' ('.$minutes.':'.$seconds2.')',
    'from_email' => 'noreply@sswprinting.com',
    'from_name' => 'SSW Printing',
    'to' => array(array('email' => 'mannu@sswprinting.com', 'name' => 'Abhijit S. Rikhy')),
    'merge_vars' => array(array(
        'rcpt' => 'mannu@sswprinting.com',
        'vars' =>
        array(
            array(
                'name' => 'FIRSTNAME',
                'content' => str_replace('\' ', '\'', ucwords(str_replace('\'', '\' ', strtolower(""))))),
            array(
                'name' => 'CALLERNAME',
                'content' => (substr($vars['CallerName'],0,1)=='+')?'':$vars['CallerName']),
            array(
                'name' => 'CALLERNUMBER',
                'content' => $vars['From']),
            array(
                'name' => 'MSGLENGTH',
                'content' => $minutes.':'.$seconds2.' '.$units),
            array(
                'name' => 'TONUMBER',
                'content' => $vars['To']),
            array(
                'name' => 'CALLDATE',
                'content' => date("F jS, Y h:i:s A")),
            array(
                'name' => 'CALLREC',
                'content' => $vars['RecordUrl']),
            array(
                'name' => 'TITLE',
                'content' => (substr($vars['CallerName'],0,1)=='+')?'Call from '.$vars['CallerName']:'Call from '.$vars['CallerName'].' (+'.$vars['From'].')')
    ))));

$template_name = 'voicemail';

$template_content = array(
    array(
	'name' => 'main',
        'content' => 'Hi *|FIRSTNAME|* *|LASTNAME|*, thanks for signing up.'),
    array(
        'name' => 'footer',
        'content' => 'Copyright 2015.')

);
$mandrill->messages->sendTemplate($template_name, $template_content, $message);
?>
