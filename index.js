function saveform(form) {
    var dataString;
    for (i = 0; i < form.length; i++) {
      	dataString += form.elements[i].value + " " + form.elements[i].checked + ", ";
    }
    var fname = form.id.value;
    localStorage.setItem('fname', fname);
    console.log(dataString);
    dataString = JSON.stringify(dataString);
    $.ajax({
        url: 'savedemographicQs.php',
        data: { 'dataString': dataString, 'fname': fname },
        type: 'POST'
    });
}

function update(value, slider) {
    document.getElementById(slider).innerHTML=value;
}