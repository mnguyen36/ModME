// creating a new websocket
var socket = io.connect('http://localhost:3000');
// on every message recived we print the new datas inside the #container div
socket.on('notification', function (data) {
    var plays = data.bsgame.plays;
    var innings = plays[0].inning;
    var tableContent = "";
    console.log(data.bsgame);
    for (var i =0; i<2; i++){
        var score = 0;
        tableContent+="<tr>";

        tableContent += "<td>" +data.bsgame.team[i].$.code+"</td>";
        for (var inning in innings){
            var battings = innings[inning].batting;
            tableContent += "<td>" +battings[i].innsummary[0].$.r + "</td>";
            score = score+Number(battings[i].innsummary[0].$.r);
        }
        tableContent += "<td>"+ score +"</td>;"
        tableContent+="</tr>";
    }
    $('#stats-table tbody').html(tableContent);


    // convert the json string into a valid javascript object
});