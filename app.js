let h2Obj = document.querySelector("h2");
let h3Obj = document.querySelector("h3");
let divObjs = document.querySelectorAll(".container>div");
let body = document.querySelector("body");

let actual_seq=[];
let user_seq=[];
let started = false;
let level = 0;


function levelUp(){
    level++;
    h2Obj.innerText = `LEVEL-${level}`;
    setTimeout( glow_box , 1000 );
    h3Obj.innerText = "Select the sequence...";
}

function check_sequence(){
    let match=true;
    for( let i=actual_seq.length-1 ; i>=0 ; i-- ) {
        if( user_seq[i]!=actual_seq[i] ) {
             match = false;
             break;
        }
    }

    if( match==true ) {
        body.classList.add("success");
        setTimeout( function(){
            body.classList.remove("success");
        },200); 
       levelUp();
    }
    else{
        body.classList.add("fail");
        setTimeout( function(){
            body.classList.remove("fail");
        },200); 

        h2Obj.innerHTML = `Game Over!! Your total Score is <b>${level-1}</b> !!`;
        h3Obj.innerText = `Press any key to start Game `;
        user_seq=[];
        actual_seq=[];
        level = 0;
        started = false;
    }
}


for( let i=0 ; i<divObjs.length ; i++ ) {
    divObjs[i].addEventListener("click",function(){

        if( user_seq.length<actual_seq.length ) {
            divObjs[i].classList.add("clicker");
            setTimeout( function(){
                divObjs[i].classList.remove("clicker");
            },250); 
            user_seq.push(i);
            
            if( user_seq.length==actual_seq.length )
                setTimeout( check_sequence , 1000 );
        }
    });
}


function glow_box(){
    let rand_div = Math.floor( 0+Math.random()*(3-0+1) );
    divObjs[ rand_div ].classList.add("glower");
    setTimeout(function(){
       divObjs[ rand_div ].classList.remove("glower");
    },250);
    actual_seq.push( rand_div );
    user_seq = [];
}

document.addEventListener( "keydown" , function(){
    h3Obj.innerText = "Press any key to start...";
    if( started==false ) {
        started = true;

        levelUp();
    }
});

