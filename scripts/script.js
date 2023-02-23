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
                    '<li>Datos dos xogadores</li>'+
                    '<li>Xogadores en encontros</li>'+
                    '<li>visualizacion dos equipos</li>'+
                    '<liVisualizacion xeral de equipos</li>'+
                    '<li>Estadisticas dos xogadores</li>'+
                    
                '</ul>'+
            '</div>'+
        '</div>'+
        '<div id="principal" class="central"></div>'+
        '<div class="bdereita columnas">'+
            '<div class="informa">'+
            '<div class="carousel">'+
              '<div class="carousel-item active">'+
                '<a href="https://www.sitio3.com"><img src="imagenes/publicidad/imagen1.jfif"></a>'+
              '</div>'+
              '<div class="carousel-item">'+
                '<a href="https://www.sitio3.com"><img src="imagenes/publicidad/imagen2.png"></a>'+
              '</div>'+
              '<div class="carousel-item">'+
                '<a href="https://www.sitio3.com"><img src="imagenes/publicidad/imagen3.png"></a>'+
              '</div>'+
                '<button class="carousel-toggle">Ocultar</button>'+
              '</div>'+
            '</div>'+

            '</div>'+
        '</div>')
        var carouselItems = document.querySelectorAll('.carousel-item');
        var currentSlide = 0;
        
        setInterval(() => {
          carouselItems[currentSlide].className = 'carousel-item';
          currentSlide = (currentSlide + 1) % carouselItems.length;
          carouselItems[currentSlide].className = 'carousel-item active';
        
      }, 5000);

        var carouselToggle = document.querySelector('.carousel-toggle');
        var carouselVisible = true;

        carouselToggle.addEventListener('click', function() {
          if (carouselVisible) {
            $('.carousel-toggle').css("padding", "0");
            $('.carousel-item').hide();
            $('.bdereita').width('20px');
            $('#principal').width('80%');
            $('.carousel-toggle').height('100%');
            $('.carousel-toggle').width('100%');
            
            $('.carousel-toggle').text('Mostrar');
            $('.carousel-toggle').css("transform", "rotate(90deg)");
            carouselVisible = false;
          } else {
            $('.carousel-item').show();
            $('.bdereita').width('16%');
            $('#principal').width('65%');
            $('.carousel-toggle').height('20px');
            $('.carousel-toggle').text('Ocultar');
            $('.carousel-toggle').css("transform", "rotate(0deg)");
            carouselVisible = true;
          }
        });

        
        $(".carousel-item").hover(function() {
          $(".carousel-item").addClass('filtro');
        }, function() {
          $(".carousel-item").removeClass('filtro');
        });

        // ofertas tienda
        $('#principal').html('<div class="ofertas">'+
          '<div class="venta">'+
          '<h1>Ofertas</h1>'+
            '<div class="contenedor">'+
            
              '<div class="producto"><img src="imagenes/ventas/imagen1.jpg"></div>'+
              '<div class="producto"><img src="imagenes/ventas/imagen2.jpg"></div>'+
              '<div class="producto"><img src="imagenes/ventas/imagen3.jpg"></div>'+
              '<div class="producto"><img src="imagenes/ventas/imagen4.jpg"></div>'+
              '<div class="producto"><img src="imagenes/ventas/imagen5.jpg"></div>'+
              '<div class="producto"><img src="imagenes/ventas/imagen6.jpg"></div>'+
            '</div>'+
            '<div class="botones">'+
           ' <button class="btn-izquierda">&lt;</button>'+
            '<button class="btn-derecha">&gt;</button>'+
          '</div>'+
        '</div>');
        
        var movimiento = 0;
        var distancia = $('.producto').outerWidth(true);
        var productosTotales = $('.producto').length;
        // productosTotales++;
        var productosEnVista = Math.round($('.venta').width() / distancia);
        var movimientoTotal = (productosTotales - productosEnVista) * distancia;
        
        $('.btn-izquierda').click(function() {
          if (movimiento < 0) {
            movimiento += distancia;
            $('.contenedor').css('transform', 'translateX(' + movimiento + 'px)');
          }
        });
        
        $('.btn-derecha').click(function() {
          if (movimiento > -movimientoTotal) {
            movimiento -= distancia;
            $('.contenedor').css('transform', 'translateX(' + movimiento + 'px)');
          }
        });


        $('footer').html(
          '<div class="facebook redes separacion"><a href="https://www.facebook.com/balonman.lalin/?locale=es_ES" target="_blank"></a></div>'+
          '<div class="instagram redes separacion"><a href="https://www.instagram.com/balonmanlalin/?hl=es" target="_blank"></a></div>'+
          '<div class="twitter redes"><a href="https://twitter.com/balonmanlalin?lang=es" target="_blank"></a></div>'
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
                  '<li>Xestion das competicións</li>'+
                  '<li>Xestion das categorias</li>'+
                  '<li>Xestion dos equipos</li>'+
                  '<li>xestion dos rivais</li>'+
                  '<li>xestion dos calendarios</li>'+
                  '<li>xestion dos encontros</li>'+
                  '<li>xestion dos postos</li>'+
                  '<li>xestion dos datos dos xogadores</li>'+
                  '<li>Datos dos xogadores</li>'+
                  '<li>Xogadores en encontros</li>'+
                  '<li>visualizacion dos equipos</li>'+
                  '<liVisualizacion xeral de equipos</li>'+
                  '<li>Estadisticas dos xogadores</li>'+
                  '<li>xestion dos socios</li>'+
                  '</ul>'+
              '</div>'+
          '</div>'+
          '<div id="principal" class="central"></div>'+
          '<div class="bdereita columnas">'+
              '<div class="informa"></div>'+
          '</div>')
          $('footer').html(
            '<div class="facebook redes separacion"><a href="https://www.facebook.com/balonman.lalin/?locale=es_ES" target="_blank"></a></div>'+
            '<div class="instagram redes separacion"><a href="https://www.instagram.com/balonmanlalin/?hl=es" target="_blank"></a></div>'+
            '<div class="twitter redes"><a href="https://twitter.com/balonmanlalin?lang=es" target="_blank"></a></div>'
          )
      break;
  }
}