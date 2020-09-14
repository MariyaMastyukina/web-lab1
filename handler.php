<?php
date_default_timezone_set("Europe/Moscow");
$CURRENT_TIME=date("l jS \of F Y H:i:s");
$START=microtime(true);
$X=(int)$_POST["X"];
$Y=(double)$_POST["Y"];
$R=(int)$_POST["R"];
if(check($X,$Y,$R)){
    $RESULT="IN";
}
else{
    $RESULT="OUT";
}
$WORKING_TIME=microtime(true)-$START;
$message="<tr><td>$X</td><td>$Y</td><td>$R</td><td>$RESULT</td><td>$CURRENT_TIME</td><td>$WORKING_TIME</td></tr>";
echo $message;
function check($X,$Y,$R){
    if ($Y<=($R/2) && $Y>=($X/2)-($R/2) && $X>=0 && $X<=$R){
        return true;
    }
    else if ($X<=0 && $Y<=0 && $X*$X+$Y*$Y<=$R*$R){
        return true;
    }
    else{
        return false;
    }
}

