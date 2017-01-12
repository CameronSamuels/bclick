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

$sql=mysql_query("SELECT Username, Score FROM Leaderboards ORDER BY Username");
    
    while ($data = mysql_fetch_assoc($sql)) {
        if ($data) {
        echo "Username: " . $data["Username"] . "  -  ";
        echo "Score: " . $data["Score"] . " <br><br>";
        }
    }


$link->close();

?>