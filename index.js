function saveform(form) {
    if (form.consent.checked != true) {
        location.reload(true);    
    } else {
        var dataString;
        for (i = 0; i < form.length; i++) {
          	dataString += form.elements[i].value + " " + form.elements[i].checked + ", ";
        }
        var fname = form.id.value;
        dataString = JSON.stringify(dataString);
        $.ajax({
            url: 'savedemographicQs.php',
            data: { 'dataString': dataString, 'fname': fname },
            type: 'POST'
        });
        window.location.href = "./click.html";
    }
}

function update(value, slider) {
    document.getElementById(slider).innerHTML=value;
}