<?php
if(!empty($_GET)){
    echo "Bruh not here fool";
    exit();
}
print_r($_POST);
if(!empty($_POST)){
    if(empty($_POST['rtime'])||empty($_POST['name'])){
        http_response_code(400);
        echo "Incomplete request";
        exit();
    }else if (!(is_string($_POST['name'])&&strlen($_POST['name'])==3)){
        http_response_code(400);
        echo "The name is not valid";
        exit();
    }else if(!is_numeric($_POST['rtime'])){
        http_response_code(400);
        echo "The time is not valid";
        exit();
    }else{
        $rtime=$_POST['rtime'];
        $name=$_POST['name'];
        $connection=mysqli_connect("localhost","root","","JSScores");
        if(!$connection){
            http_response_code(503);
            echo mysqli_connect_error();
            exit();
        }else{
            $result=$connection->query("INSERT INTO scores (rtime,uname) VALUES ($rtime,\"$name\");");
            if(!$result){
                http_response_code(500);
                echo $connection->error;
                exit();
            }else{
                echo "Success";
            }
        
        }

    }
}