let running = false;
let waiting=false;
var timerobj;
var timeSwitch;
var reactiontime;
var nonvalid=true;
const gametext=document.getElementById("gametext");
const finaltimetext=document.getElementById("finaltime");
const successbox=document.getElementById("successbox");
const mainbutton=document.getElementById("mainbutton");
const inputnamebox=document.getElementById("inputname");
const errorinput=document.getElementById("errorinput");
const serverresponse=document.getElementById("serverresponse");
successbox.classList.add("invisible");
function buttonclick(){
    if(!running){
        startgame()
    }else{
        if(waiting){
            failedtimer();
        }else{
            successreaction();
        }
    }
}

function startgame(){
    document.body.id="wait";
    successbox.classList.add("invisible");
    timerobj=setTimeout(switchgame,Math.random()*5000);
    gametext.innerText="WAIT FOR IT";
    mainbutton.innerText="WAIT";
    running=true;
    waiting=true;

    
}
function failedtimer(){
    clearTimeout(timerobj);
    waiting=false;
    running=false;
    gametext.innerText="TOO EARLY";
    document.body.id="Restart";
}
function switchgame(){
    gametext.innerText="CLICK THE BUTTON";
    mainbutton.innerText="CLICK ME";
    waiting=false;
    document.body.id="ready";
    timeSwitch=(new Date()).getTime();
}
function checkName(){
    //why does this work
    let regex=/^[a-zA-Z]{3}$/;
    let str = inputnamebox.value;
    console.log(str);
    console.log(str.match(regex));
    if(str.match(regex)==null){
        errorinput.classList.remove("invisible");
        nonvalid=true;
    }else{
        errorinput.classList.add("invisible");
        nonvalid=false;
    }
}
function successreaction(){
    let currentTime=(new Date()).getTime();
    reactiontime=currentTime-timeSwitch;
    document.body.id="success";
    if(reactiontime<300){
        gametext.innerText="NICE SPEED";
    }else if(reactiontime<700){
        gametext.innerText="GETTING THERE";
    }else{
        gametext.innerText="UHHHHH";
    }
    running=false;
    waiting=false;
    successbox.classList.remove("invisible");
    mainbutton.innerText="Restart";
    finaltimetext.innerText="YOUR TIME WAS: "+reactiontime+" ms";
    serverresponse.innerText="";
}
function submitscore(){
    if(!nonvalid){
        let request= new XMLHttpRequest();
        request.open("POST","posttimes.php",true);
        var name = inputnamebox.value;
        //by default Apache may process the input, so we are forcing it not to
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send("rtime="+reactiontime+"&name="+name);
        request.onreadystatechange=function(){
           // console.log(this.readyState);
            switch(this.readyState){
                case 0:
                    serverresponse.innerText="Not initialized connection";
                    break;
                case 1:
                    serverresponse.innerText="Server connection established";
                    break;
                case 2:
                    serverresponse.innerText="Server recieved the request";
                    break;
                case 3:
                    serverresponse.innerText="Server is processing the request";
                    break;
                case 4:
                    //console.log(request.status);
                    //console.log(request.responseText);
                    if(request.status!=200){
                        serverresponse.innerText="Server gave the error "+request.status+": "+this.responseText;
                    }else{
                        serverresponse.innerText="Successfully added "+ name;
                    }
                    break;
            }
        };
    }
   
}
