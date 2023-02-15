$(document).ready(function(){
  //------------------------------//
  //Añadimos estilos a los botones
  $('#botonS').click(function() {
    if($.trim($('#botonS').text())=="Iniciar sesion"){
      anadirventana();
      
      $('#botonS').text('Volver');
    }else{
      pecharXanela();
      $('#botonS').text('Iniciar sesion');
    }
    
  });

  // color idiomas
  $('.f1').css("filter", "grayscale(1)");
  $('.f3').css("filter", "grayscale(1)");

  $('.f1').click(function() {
    $(this).css("filter", "grayscale(0)");
    $('.f2').css("filter", "grayscale(1)");
    $('.f3').css("filter", "grayscale(1)");
  });
  $('.f2').click(function() {
    $(this).css("filter", "grayscale(0)");
    $('.f1').css("filter", "grayscale(1)");
    $('.f3').css("filter", "grayscale(1)");
  });
  $('.f3').click(function() {
    $(this).css("filter", "grayscale(0)");
    $('.f2').css("filter", "grayscale(1)");
    $('.f1').css("filter", "grayscale(1)");
  });

  //Ventana registro
  $("a #registro").click(function(){
    console.log('Hola');
    $("#login").empty();
  })

  
//  Inicio sesion
function pecharXanela() {
  ventana.innerHTML = '';	
}
  
//Ventana de incio de sesión
function anadirventana() {
  let codigo =  
 '<div id="contenedor">'+
    '<div id="central">'+
      '<div id="login">'+
        '<div class="titulo">'+
          'Bienvenido'+
        '</div>'+
        '<form id="loginform">'+
          '<label for="usuario">Usuario - Correo Electronico</label>' +
          ' <input type="text" id="usuario" name="usuario" placeholder="Usuario" required>'+
          '<label for="password">Contraseña</label>' + 
          '<input id="contrasena" type="password" placeholder="Contraseña" name="password" required>'+
          '<button title="Ingresar" id="ingresar" name="ingresar">Login</button>'+
          '<div id="mensaje"></div>'+
        '</form>'+
        '<div class="pie-form">'+
          '<a href="#" id="registro">¿No tienes Cuenta? Registrate</a>'+
        '</div>'+
      '</div>'+             
    '</div>'+
  '</div>';
    
  ventana.innerHTML = codigo;	
  registrar();
}
  
function pecharXanela() {
  ventana.innerHTML = '';	
}

// Variable para el registro (aparece al darle a registrarse)
  let registro =   
  '<div class="titulo">'+
    'Registrese!'+
  '</div>'+
  '<form id="loginform">'+
    '<label for="usuario">Nombre</label>' +
      ' <input type="text" id="usuario" placeholder="Usuario" required>' +
    '<label for="password">Contraseña</label>' +
      '<input type="password" placeholder="Contraseña" id="password" required>' +
    '<label for="rPassword">Repetir contraseña</label>' +
      '<input type="password" placeholder="Contraseña" id="rPassword" required>' +
    '<label for="correo">Correo electrónico</label>' +
      '<input type="email" placeholder="Email" id="correo" required>' +
    '<button id="confirmar" title="Confirmar" name="confirmar">Confirmar</button>'+
  '</form>' +
  '<div class="inferior">'+
    '<div id="mensaje"></div>'+
    '<div id="volver">Volver</div>'+
  '</div>';

// ---------------------------------- //
//Función para que cada usuario se registre y se inserte en la BD
function registrar() {
  
  $("#registro").click(function(){
    
    $("#login").empty().append(registro);
    $("#volver").css("cursor", "pointer");

    $('#confirmar').on('click',function(){
      let mensaje = '';
      let valido = true;
      if ($('#usuario').val() == '') {
        mensaje += 'No se indica ningún nombre de usuario';
        valido=false;
      }

      if ($('#password').val() == '' ) {
        mensaje += 'Tiene que introducir una contraseña válida';
        valido=false;
      }

      if ($('#password').val() != $('#rPassword').val()) {
        mensaje += 'Las contraseñas no coinciden!';
        valido=false;
      }

      if ($('#correo').val() == '') {
        mensaje += 'Tiene que introducir un correo válido (formato texto@correo.com)';
        valido=false;
      }

      if (valido) {
        $.post('./php/crearUsuario.php', {nombre:$('#usuario').val(),
        contrasena:$('#password').val(), correo:$('#correo').val()}).done( function(texto) {
          $(".titulo").fadeOut(500, function() {
            // salida = "<div><font color=red size=3.8em><strong>Los datos fueron almacenados de forma correcta!</strong></font><div>";
            salida = "<div><font color=red size=3.8em><strong>"+ texto+"</strong></font><div>";
          $("#mensaje").html(salida).fadeIn(2000);
          });
      }, "json").fail(function(error) {
        alert('Los datos no pudieron ser introducidos en la base de datos: ' + error);
      });
        
    } else {
      alert(mensaje);
    }  
  });


    $("#volver").on('click', function() {
        anadirventana();
    })

});

// ---------------------//
// Comprobacion usuarios
//Se activará cuando enviemos el formulario de inicion de sesión
  $('#ingresar').on('click',function(event){
    event.preventDefault();
    $.post('./php/comprobarUsuario.php', {correo: $('#usuario').val()})
    .done(function(datos){
      datos = jQuery.parseJSON(datos)
      $.each(datos, function(){
        if(this.contrasena!=$('#contrasena').val()) 
          $('#mensaje').text("La contraseña es invalida, vuela a intentar")
      })

    })
  })
  
};



});


