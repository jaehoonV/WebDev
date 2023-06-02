function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault(); // 기본 엔터 동작 방지
        getInputValue();
    }
}

function getInputValue() {
    let value = $('#chat').val().split(' ');
    let command = value[0];
    console.log(value);
    console.log(command);
    switch(command){
        case 'command' : lookup_command(value); break;
        case 'dice' : rollDice(value); break;

        default : $('#chat_box').append("<p>command error : " + command + "</p>");
    }
    empty_input();
    $('#chat_box').scrollTop($('#chat_box')[0].scrollHeight);
}

function lookup_command(value) {
    let chat = "<p>command : Look up command ";
    chat += "<br>dice 200 : Dice betting game, Enter the amount to bet after the 'dice' command";
    chat += "</p>";
    $('#chat_box').append(chat);
}

function rollDice(value) {
    let bet = value[1];
    if(isNaN(bet)){
        $('#chat_box').append("<p>bat error : " + bet + "</p>");
        return;
    }

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let player1Sum = dice1 + dice2;

    let dice3 = Math.floor(Math.random() * 6) + 1;
    let dice4 = Math.floor(Math.random() * 6) + 1;
    let player2Sum = dice3 + dice4;

    let status = 0;
    let chat = "<p>user bets " + bet + " and throws their dice... ";
    chat += "<br>user gets " + dice1 + " and " + dice2 + "";
    chat += "<br>your opponent throws their dice...and gets " + dice3 + " and " + dice4 + "";

    if (player1Sum > player2Sum) {
        chat += "<br>you won " + bet + "</p>";
        status = 1;
    } else if (player1Sum < player2Sum) {
        chat += "<br>you lost " + bet + "</p>";
        status = -1;
    } else {
        chat += "<br>draw</p>";
    }

    $('#chat_box').append(chat);
    $('#wallet').val(calculate(status, bet));
}

function calculate(status, bet){
    let current = Number($('#wallet').val());
    let result;
    if(status == 1){
        result = current + Number(bet);
    }else{
        result = current - Number(bet);
    }

    console.log("result = " + result);
    return result;
}

function empty_input(){
    $('#chat').val("");
}