<?php define('DB_NAME','playbclick_com');define('DB_USER','playbclick_com');define('DB_PASSWORD','Gaft0p');define('DB_HOST','playbclick.com.mysql');$link=mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);if (!$link){ die('Could not connect: ' . mysql_error());}$db_selected=mysql_select_db(DB_NAME, $link);if (!$db_selected){die('Can\'t use ' . DB_NAME . ': ' . mysql_error());}$username=$_GET['username'];$points=$_GET['points'];$sql1="DELETE FROM bLeaderboards WHERE Username = '$username'";$sql2 = "INSERT INTO `playbclick_com`.`bLeaderboards` (`Username`, `Score`) VALUES ('$username', '$points')";if (!mysql_query($sql1)){die('Error: ' . mysql_error());}if (!mysql_query($sql2)){die('Error: ' . mysql_error());}mysql_close(); ?>