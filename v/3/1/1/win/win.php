<?php

define('DB_NAME', 'gaftop_com');
define('DB_USER', 'gaftop_com');
define('DB_PASSWORD', 'Dylan123');
define('DB_HOST', 'gaftop.com.mysql');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if (!$link) {
    die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if (!$db_selected) {
    die('Can\'t use ' . DB_NAME . ': ' . mysql_error());
}

$username = $_GET['username'];
$points = $_GET['points'];

$sql = "INSERT INTO Leaderboards (Username, Score) VALUES ('$username', '$points')";

if (!mysql_query($sql)) {
    die('Error: ' . mysql_error());
}

mysql_close();

echo "<script>window.close()</script>";

?>