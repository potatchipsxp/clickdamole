function saveform(form) {
	console.log(form.input_device.value);
    if ((form.consent.checked == true) && ((form.input_device.value == "mouse") || (form.input_device.value == "trackpad") || (form.input_device.value == "other"))) {
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
    } else {
        console.log(form.input_device.value);
        console.log("didnt consent");
        location.reload(true);
        alert("To continue you must select a device and check the consent box");
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