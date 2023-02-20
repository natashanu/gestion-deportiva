rol_usuario = 'ninguno';
$(document).ready(function(){
  //Creamos los contenedores para el header, el main y el footer
  $('body').html(
    '<header class="flex"></header>' +
    '<main class="flex"></main>'+
    '<footer class="flex centrar pie"></footer>'
  )

  //Llamamos a la función que rellenará el cuerpo de la página principal de acuerdo al rol del usuario logueado
  cargarPagina(rol_usuario);

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
      if(datos.length == 0) $('#mensaje').text("No existe un usuario con los datos aportados")
      $.each(datos, function(){
        if(this.contrasena!=$('#contrasena').val()) $('#mensaje').text("La contraseña es invalida, vuela a intentar")
        else {
          rol_usuario = this.rol;
          cargarPagina(rol_usuario);
        }
      })

    })
  })
  
};



});

function cargarPagina(rol){
  switch(rol){
    case 'ninguno':
      $('header').html(
        '<div class="flex logo evenly ">'+
        '<img src="./imagenes/logo.jpg" alt="Imagen">'+ 
        '<h1>Club Balomano Lalin</h1>'+
        '<div class="gallego fijo idiomas f1"></div>'+ 
        '<div class="español fijo idiomas f2"></div>'+
        '<div class="ingles fijo idiomas f3"> </div>'+
        '</div>'+
        '<div class="sesion grid">'+
          '<button type="button" name="iniciar" id="botonS" >Iniciar sesion</button>'+
        '</div>'
        )
        $('main').html(
        '<div id="ventana"></div>'+
        '<div class="bizquierda flex columnas ">'+
            '<div class="eventos"></div>'+
            '<div class="enlaces">'+
                '<ul>'+
                    '<li>Enlace</li>'+
                    '<li>Enlace</li>'+
                    '<li>Enlace</li>'+
                    '<li>Enlace</li>'+
                    '<li>Enlace</li>'+
                '</ul>'+
            '</div>'+
        '</div>'+
        '<div id="principal" class="central"></div>'+
        '<div class="bdereita columnas">'+
            '<div class="informa"></div>'+
        '</div>')
        $('footer').html(
          '<div class="facebook redes separacion"><a href="http://google.es" target="_blank"></a></div>'+
          '<div class="instagram redes separacion"><a href="http://google.es" target="_blank"></a></div>'+
          '<div class="twitter redes"><a href="http://google.es" target="_blank"></a></div>'
        )
      break;
      case 'administrador':
        $('header').html(
          '<div class="flex logo evenly ">'+
          '<img src="./imagenes/logo.jpg" alt="Imagen">'+ 
          '<h1>Club Balomano Lalin</h1>'+
          '<div class="gallego fijo idiomas f1"></div>'+ 
          '<div class="español fijo idiomas f2"></div>'+
          '<div class="ingles fijo idiomas f3"> </div>'+
          '</div>'+
          '<div class="sesion grid">'+
            '<button type="button" name="salir" id="salir" onclick="cargarPagina(\'ninguno\')">Salir</button>'+
          '</div>'
          )
          $('main').html(
          '<div id="ventana"></div>'+
          '<div class="bizquierda flex columnas ">'+
              '<div class="eventos"></div>'+
              '<div class="enlaces">'+
                  '<ul>'+
                      '<li>Enlace</li>'+
                      '<li>Enlace</li>'+
                      '<li>Enlace</li>'+
                      '<li>Enlace</li>'+
                      '<li>Enlace</li>'+
                  '</ul>'+
              '</div>'+
          '</div>'+
          '<div id="principal" class="central"></div>'+
          '<div class="bdereita columnas">'+
              '<div class="informa"></div>'+
          '</div>')
          $('footer').html(
            '<div class="facebook redes separacion"><a href="http://google.es" target="_blank"></a></div>'+
            '<div class="instagram redes separacion"><a href="http://google.es" target="_blank"></a></div>'+
            '<div class="twitter redes"><a href="http://google.es" target="_blank"></a></div>'
          )
      break;
  }
}