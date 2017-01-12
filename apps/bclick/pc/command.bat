@echo off
set /a Points=0
set /a Value=0
title The Letter B Game PC Command
prompt Game\
goto mainmenu

:mainmenu
echo Thanks For Playing The Letter B Game PC Command!
echo Type Help for a list of Commands.
goto Main

:Main
echo You Have %Points% Points!
set /p input=Game\
if %input%==help goto help
if %input%==upgrade set /a Value=%Value%+2
if %input%==b set /a Points=%Points%+%Value%
if %input%==exit exit
if %input%==0907327 goto 0907327
goto Main

:help
echo List Of Commands:
echo B - Gives You Points
echo EXIT - Closes The Game
echo HELP - Shows this menu
echo UPGRADE - Increases The Value Of The B
pause
goto Main

:0907327
echo You Just Got 25000 Points
set /a Points=%Points%+25000
pause
goto Main


