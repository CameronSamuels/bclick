<?php
define('DB_NAME', 'playbclick_com');
define('DB_USER', 'playbclick_com');
define('DB_PASSWORD', 'Dylan123');
define('DB_HOST', 'playbclick.com.mysql');
$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
if (!$link) { die('Could not connect: ' . mysql_error()); }
$db_selected = mysql_select_db(DB_NAME, $link);
if (!$db_selected) { die('Can\'t use ' . DB_NAME . ': ' . mysql_error()); }
$sql=mysql_query("SELECT Dislikes FROM TrumpDislikes WHERE name = 'game'");
echo "<script>localStorage.total_clicks = " . mysql_fetch_assoc($sql)['Dislikes'] . "</script>";
mysql_close();
?>