var nombre = document.getElementById("txtNombre");
var curp = document.getElementById("txtCurp");
var tel = document.getElementById("txtTelefono");
var ec = document.getElementById("txtEC");
var edad = document.getElementById("txtEdad");
var img = document.getElementById("txtImg");
var buscar = document.getElementById("txtBuscar");
var clave = document.getElementById("txtID");
var n = 0;
var url = "http://localhost:3000/apidir";

var Consultar = function () {
    var count = 0
    datos = null
    $("#tarjeta").empty()
    fetch(url + "/getAllUsers")
        .then((response) => {
            return response.json();
        }).then((data) => {
            datos = data[0]
            console.log(datos);
            for (var i = 0; i < datos.length; i++) {
                $("#tarjeta").append('<br>') //onclick="Selected()" 
                $("#tarjeta").append('<div onclick="Selected(' + datos[i].id + ')" class="bg-secondary text-white mx-auto row" ><img src="' + datos[i].Imagen + '"id="imgPrin" class="col-3" style="margin: 4px; height: 100%; width:100%"><div class="col-5"><img  src="img/man-user.png"><p id="Nom">Nombre: ' + datos[i].Nombre + ' </p><img src="img/tag.png"><p id="CURP">CURP: ' + datos[i].curp + '</p><img src="img/users-relation.png"><p id="EC">Estado Civil: ' + datos[i].EdoCivil + '</p></div><div class="col"><img src="img/call-answer.png"><p id="Tel">Teléfono: ' + datos[i].Telefono + '</p><img src="img/plus-18-movie.png"><p id="Edad">Edad: ' + datos[i].Edad + '</p></div></div>')
                count++
            }
        }).catch((error) => {
            console.log("Error: " + error)
        })
}

var Subir = function () {
    $("#tarjeta").empty()
    var fd = new FormData();
    fd.append("nombre", txtNombre.value)
    fd.append("curp", txtCurp.value)
    fd.append("telefono", txtTelefono.value)
    fd.append("edocivil", txtEC.value)
    fd.append("edad", txtEdad.value)
    fd.append("image", txtImg.files[0])
    console.log(fd)
    fetch(url + "/createUser", {
            method: "POST",
            body: fd
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log("Error al subir: " + error)
        })
    setTimeout(Consultar, 2000)
}

var buscar = function () {
    if (txtBuscar.value != '') {
        $("#tarjeta").empty()

        fetch(url + "/ByName/" + txtBuscar.value)
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data)
                for (var i = 0; i <= datos.length; i++) {
                    //$("#tarjeta").append('<div class="bg-secondary text-white mx-auto row" ><img src="'+datos[i].Imagen+'"id="imgPrin" class="col-3" style="margin: 4px; height: 100%; width:100%"><div class="col-5"><img  src="img/man-user.png"><p id="Nom">Nombre: '+datos[i].Nombre+' </p><img src="img/tag.png"><p id="CURP">CURP: '+datos[i].curp+'</p><img src="img/users-relation.png"><p id="EC">Estado Civil: '+datos[i].EdoCivil+'</p></div><div class="col"><img src="img/call-answer.png"><p id="Tel">Teléfono: '+datos[i].Telefono+'</p><img src="img/plus-18-movie.png"><p id="Edad">Edad: '+datos[i].Edad+'</p></div></div>')
                }
                data.forEach(element => {
                    console.log(element)
                    $("#tarjeta").append('<div class="bg-secondary text-white mx-auto row" ><img src="' + element.Imagen + '"id="imgPrin" class="col-3" style="margin: 4px; height: 100%; width:100%"><div class="col-5"><img  src="img/man-user.png"><p id="Nom">Nombre: ' + element.Nombre + ' </p><img src="img/tag.png"><p id="CURP">CURP: ' + element.curp + '</p><img src="img/users-relation.png"><p id="EC">Estado Civil: ' + element.EdoCivil + '</p></div><div class="col"><img src="img/call-answer.png"><p id="Tel">Teléfono: ' + element.Telefono + '</p><img src="img/plus-18-movie.png"><p id="Edad">Edad: ' + element.Edad + '</p></div></div>')
                });
            }).catch((error) => {
                console.log("Error al subir: " + error)
            })
    }else{
        Consultar();
    }
}

var Actualizar = function () {
    var fd = new FormData();
    fd.append("id", txtID.value)
    fd.append("nombre", txtNombre.value)
    fd.append("curp", txtCurp.value)
    fd.append("telefono", txtTelefono.value)
    fd.append("edocivil", txtEC.value)
    fd.append("edad", txtEdad.value)
    fd.append("image", txtImg.files[0])
    fetch(url + "/updateUser", {
            method: "PUT",
            body: fd
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            alert(data)
        }).catch((error) => {
            console.log("Error al subir: " + error)
        })
    setTimeout(Consultar, 2000);
}

var Eliminar = function () {
    var id = txtID.value;
    var fd = new FormData();
    fd.append("id", id);
    fetch(url + "/deleteUser/"+id, {
            method: "DELETE",
            body: fd
        })
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log("Error al subir: " + error)
        });
    setTimeout(Consultar, 2000);

}

function Selected(id) {
    //var fd=new FormData();
    fetch(url + "/selectedUser/" + id)
        .then((response) => {
            return response.json();
        }).then((data) => {
            //var datos
            datos = data
            console.log(data)
            clave.value = datos.id;
            nombre.value = datos.Nombre;
            curp.value = datos.curp;
            ec.value = datos.EdoCivil;
            edad.value = datos.Edad;
            tel.value = datos.Telefono;
            //alert(data)
        }).catch((error) => {
            console.log("Error al subir: " + error)
        })
    Consultar();
}

var Vaciar = function () {
    nombre.value = null;
    curp.value = null;
    tel.value = null;
    ec.value = null;
    edad.value = null;
    img.value = null;
    clave.value = null;
}