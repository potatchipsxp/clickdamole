function saveform(form) {
    if (form.consent.checked == false) {
        console.log("didnt consent");
        location.reload(true);    
    } else {
        console.log("consented");
        var dataString;
        for (i = 0; i < form.length; i++) {
          	dataString += form.elements[i].value + " " + form.elements[i].checked + ", ";
        }
        var fname = makeid();
        dataString = JSON.stringify(dataString);
        $.ajax({
            url: 'savedemographicQs.php',
            data: { 'dataString': dataString, 'fname': fname },
            type: 'POST'
        });
        window.location.href = "./click.html";
        return false;
    }
}

function update(value, slider) {
    document.getElementById(slider).innerHTML=value;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}