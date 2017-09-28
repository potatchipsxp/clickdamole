function saveform(form) {
    var dataString;
    for (i = 0; i < form.length; i++) {
      	dataString += form.elements[i].value + " " + form.elements[i].checked + ", ";
    }
    console.log(dataString);
    $.ajax({
        url: 'savedemographicQs.php',
        data: dataString,
        type: 'POST'
    });
}

function update(value, slider) {
    document.getElementById(slider).innerHTML=value;
}