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
  $(document).on('click', '#botonS',function() {
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
  $("a #registro").on('click',function(){
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
  
  $("#registro").on('click',function(){
    
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
      // mostrar publicidad para todos por si cierra sesion el administrador
      $('.bdereita').show();
      $('#principal').width('65%');

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
            '<h1>Informacion</h1>'+
            '<ul>'+
                '<li class="dxogadores">Datos dos xogadores</li>'+
                '<li class="dencontros">Xogadores en encontros</li>'+
                '<li class="dequipos">Visualizacion dos equipos</li>'+
                '<li class="dxequipos">Visualizacion xeral de equipos</li>'+
                '<li class="destadisticas">Estadisticas dos xogadores</li>'+
                
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

        cargarPaginaprincipal();


        $('footer').html(
          '<div class="facebook redes separacion"><a href="https://www.facebook.com/balonman.lalin/?locale=es_ES" target="_blank"></a></div>'+
          '<div class="instagram redes separacion"><a href="https://www.instagram.com/balonmanlalin/?hl=es" target="_blank"></a></div>'+
          '<div class="twitter redes"><a href="https://twitter.com/balonmanlalin?lang=es" target="_blank"></a></div>'
        )
      break;
      case 'usuario':
        // mostrar publicidad para todos por si cierra sesion el administrador
        $('.bdereita').show();
        $('#principal').width('65%');
  
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
              '<h1>Informacion</h1>'+
              '<ul>'+
                  '<li class="dxogadores">Datos dos xogadores</li>'+
                  '<li class="dencontros">Xogadores en encontros</li>'+
                  '<li class="dequipos">Visualizacion dos equipos</li>'+
                  '<li class="dxequipos">Visualizacion xeral de equipos</li>'+
                  '<li class="destadisticas">Estadisticas dos xogadores</li>'+
                  
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
  
          cargarPaginaprincipal();
  
  
          $('footer').html(
            '<div class="facebook redes separacion"><a href="https://www.facebook.com/balonman.lalin/?locale=es_ES" target="_blank"></a></div>'+
            '<div class="instagram redes separacion"><a href="https://www.instagram.com/balonmanlalin/?hl=es" target="_blank"></a></div>'+
            '<div class="twitter redes"><a href="https://twitter.com/balonmanlalin?lang=es" target="_blank"></a></div>'
          )
        break;
      case 'administrador':
      case 'gestor':
        // ocultar publicidad para el administrador
            $('.bdereita').hide();
            $('#principal').width('80%');

            
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
              '<h1>Informacion</h1>'+
                '<ul>'+
                    '<li class="dxogadores">Datos dos xogadores</li>'+
                    '<li class="dencontros">Xogadores en encontros</li>'+
                    '<li class="dequipos">Visualizacion dos equipos</li>'+
                    '<li class="dxequipos">Visualizacion xeral de equipos</li>'+
                    '<li class="destadisticas">Estadisticas dos xogadores</li>'+
                    
                '</ul>'+
                '<h1>Xestion</h1>'+
                  '<ul>'+
                  '<li class="xcompeticions">Competicións</li>'+
                  '<li class="xcategorias">Categorias</li>'+
                  '<li class="xequipos">Equipos</li>'+
                  '<li class="xrivais">Rivais</li>'+
                  '<li class="xcalendarios">Calendarios</li>'+
                  '<li class="xencontros">Encontros</li>'+
                  '<li class="xpostos">Postos</li>'+
                  '<li class="xxogadores">Datos dos xogadores</li>'+
                  '<li class="xsocios">Socios</li>'+
                  '<li class="xpublicidad">Publicidad</li>'+
                  '<li class="xusuarios">Usuarios</li>'+
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
  /*PAGINA DE COMPETICIONS*/
  $('.xcompeticions').on('click',function(){
    $('li').removeClass('selected');
    $(this).addClass('selected');
    $('#principal').html("<h1>Competiciones</h1><div id='contenido'>")
    cargarCompeticiones();

  })

  function cargarCompeticiones(){
    let texto='';
    $.getJSON('php/listarCompeticiones.php')
    .done(function(datos){
      texto+='<select id="competicion">'+
              '<option id="0">Seleccione una competición</option>';
      $.each(datos, function(){
        if(this.idCompeticion !=0){
          texto+='<option value="'+ this.idCompeticion+'" data-nombre="'+this.nombre+'">'+this.nombre+'</option>';
        }
      })
      texto+='</select>'+
              '<div class="elemento1"></div>'+
              '<div class="elemento2"></div>'+
              '<button class="botoncito" id="crearComp">Crear Competición</button>'+
              '<button class="botoncito" id="modComp">Modificar Competicion</button>'+
              '<button class="botoncito" id="eliminarComp">Eliminar Competicion</button>'+
              '<div class="modificacion"></div>';
      $('#contenido').html(texto)

      $('#competicion').on('change', function(){
        $('.elemento1').text('Abreviatura: ' + $(this).val())
        $('.elemento2').text('Nombre: ' + $('select option:selected').attr('data-nombre'))
      })

      $('#crearComp').on('click', function(){
        crearCompeticion();
      })

      $('#modComp').on('click', function(){
        modificarCompeticion();
      })
  
      $('#eliminarComp').on('click', function(){
        eliminarCompeticion();
      })


    })
    .fail(function(){
      alert('No se pudieron listar las competiciones')
    })
  }

  /*PAGINA DE CATEGORIAS*/
  $('.xcategorias').on('click',function(){
    $('li').removeClass('selected');
    $(this).addClass('selected');
    $('#principal').html("<h1>Categorías</h1><div id='contenido'>")
    cargarCategorias();

  })


  function cargarCategorias(){
    let texto='';
    $.getJSON('php/listarCategoria.php')
    .done(function(datos){
      texto+='<select id="categoria">'+
              '<option id="0">Seleccione una categoría</option>';
      $.each(datos, function(){
        if(this.idCategoria !=0){
          texto+='<option value="'+ this.idCategoria+'" data-nombre="'+this.nombre+'" data-nombreCorto="'+this.nombreCorto+'">'+this.nombre+'</option>';
        }
      })
      texto+='</select>'+
              '<div class="elemento1"></div>'+
              '<div class="elemento2"></div>'+
              '<div class="elemento3"></div>'+
              '<button class="botoncito" id="crearCat">Crear Categoría</button>'+
              '<button class="botoncito" id="modCat">Modificar Categoría</button>'+
              '<button class="botoncito" id="eliminarCat">Eliminar Categoría</button>'+
              '<div class="modificacion"></div>';
      $('#contenido').html(texto)

      $('#categoria').on('change', function(){
        $('.elemento1').text('Abreviatura: ' + $(this).val())
        $('.elemento2').text('Nombre: ' + $('select option:selected').attr('data-nombre'))
        $('.elemento3').text('Nombre Corto: ' + $('select option:selected').attr('data-nombreCorto'))
      })

      $('#crearCat').on('click', function(){
        crearCategoria();
      })

      $('#modCat').on('click', function(){
        modificarCategoria();
      })
  
      $('#eliminarCat').on('click', function(){
        eliminarCategoria();
      })


    })
    .fail(function(){
      alert('No se pudieron listar las competiciones')
    })
  }
  

  // cargar paginas en el div central
      function cargarPaginaprincipal() {
        // ofertas tienda
        $('#principal').html("");
        $('#principal').html('<div class="ofertas">'+
        '<div class="venta">'+
        '<h1>Ofertas</h1>'+
          '<div class="contenedor">'+
          
            '<div class="producto"><img src="imagenes/ventas/imagen1.png"><span class="texto-oculto">Comprar</span></div>'+
            '<div class="producto"><img src="imagenes/ventas/imagen2.png"><span class="texto-oculto">Comprar</span></div>'+
            '<div class="producto"><img src="imagenes/ventas/imagen3.jpg"><span class="texto-oculto">Comprar</span></div>'+
            '<div class="producto"><img src="imagenes/ventas/imagen4.jpg"><span class="texto-oculto">Comprar</span></div>'+
            '<div class="producto"><img src="imagenes/ventas/imagen5.png"><span class="texto-oculto">Comprar</span></div>'+
            '<div class="producto"><img src="imagenes/ventas/imagen6.png"><span class="texto-oculto">Comprar</span></div>'+
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
    }

    // volver hacer pagina iinicial al tocar el logo
    $('.logo h1').click(function(){
      $('li').removeClass('selected');
      cargarPaginaprincipal();
    });


    /*CREAR COMPETICIÓN*/
    function crearCompeticion(){
      $('#contenido').html('<h2>Crear Competición</h2>'+
      'Abreviatura: <input id="idComp">'+
      'Nombre de la Competición<input id="nombreComp">'+
      '<button id="crear" class="botoncito">Crear</button>'+
      '<button id="volver" class="botoncito">Volver</button>')
      $('#volver').on('click', function(){
        cargarCompeticiones();
      })
      $('#crear').on('click', function(){
        if($('#idComp').val()!="" || $('#nombreComp').val()!=""){
          $.post('php/crearCompeticion.php', {idCompeticion: $('#idComp').val(), nombre: $('#nombreComp').val()})
          .done(function(){
            alert('Se creo correctamente la competición')
            cargarCompeticiones();
          })
          .fail(function(){
            alert('No se pudo crear la competición')
          })
        }else alert('No se pudo crear la competición')
      })
    }

     /*MODIFICAR COMPETICIÓN*/
     function modificarCompeticion(){
      $('.modificacion').html('<h2>Modificar Competición</h2>'+
      'Abreviatura: <div id="idComp"></div>'+
      'Nombre de la Competición<input id="nombreComp">'+
      '<button id="update" class="botoncito">Modificar</button>'+
      '<button id="volver" class="botoncito">Volver</button>')

      $('#idComp').text( $('select option:selected').val())
      $('#nombreComp').val( $('select option:selected').attr('data-nombre'))
      $('#volver').on('click', function(){
        cargarCompeticiones();
      })
      $('#update').on('click', function(){
        if($('#nombreComp').val()!=""){
          $.post('php/modificarCompeticion.php', {idCompeticion: $('#idComp').text(), nombre: $('#nombreComp').val()})
          .done(function(){
            alert('Se modificó correctamente la competición')
            cargarCompeticiones();
          })
          .fail(function(){
            alert('No se pudo modificar la competición')
          })
        }else alert('No se pudo modificar la competición')
      })
    }


    /*ELIMINAR COMPETICIÓN*/
    function eliminarCompeticion(){
      $.post('php/eliminarCompeticion.php', {idCompeticion: $('#competicion').val()})
      .done(function(){
        alert('Se elimino correctamente la competición')
        cargarCompeticiones();
      })
      .fail(function(){
        alert('No se pudo eliminar la competición')
      })
    }


    /*CREAR CATEGORÍA*/
    function crearCategoria(){
      $('#contenido').html('<h2>Crear Categoría</h2>'+
      'Abreviatura: <input id="idCat">'+
      'Nombre de la Categoría<input id="nombreCat">'+
      'Nombre corto de la Categoría<input id="nombreCortCat">'+
      '<button id="crear" class="botoncito">Crear</button>'+
      '<button id="volver" class="botoncito">Volver</button>')
      $('#volver').on('click', function(){
        cargarCategorias();
      })

      $('#crear').on('click', function(){
        if($('#idCat').val()!="" || $('#nombreCat').val()!="" || $('#nombreCortCat').val()!=""){
          $.post('php/crearCategoria.php', {idCategoria: $('#idCat').val(), nombre: $('#nombreCat').val(), nombreCorto: $('#nombreCortCat').val()})
          .done(function(){
            alert('Se creo correctamente la categoría')
            cargarCategorias();
          })
          .fail(function(){
            alert('No se pudo crear la categoría')
          })
        }else alert('No se pudo crear la categoría')
      })
    }

     /*MODIFICAR CATEGORÍA*/
     function modificarCategoria(){
      $('.modificacion').html('<h2>Modificar Categoría</h2>'+
      'Abreviatura: <div id="idCat"></div>'+
      'Nombre de la Categoría<input id="nombreCat">'+
      'Nombre corto de la Categoría<input id="nombreCortoCat">'+
      '<button id="update" class="botoncito">Modificar</button>'+
      '<button id="volver" class="botoncito">Volver</button>')

      $('#idCat').text( $('select option:selected').val())
      $('#nombreCat').val( $('select option:selected').attr('data-nombre'))
      $('#nombreCortoCat').val($('select option:selected').attr('data-nombreCorto'))
      $('#volver').on('click', function(){
        cargarCategorias();
      })
      $('#update').on('click', function(){
        if($('#nombreComp').val()!="" || $('#nombreCortoCat').val()!=""){
          $.post('php/modificarCategoria.php', {idCategoria: $('#idCat').text(), nombre: $('#nombreCat').val(), nombreCorto: $('#nombreCortoCat').val()})
          .done(function(){
            alert('Se modificó correctamente la categoría')
            cargarCategorias();
          })
          .fail(function(){
            alert('No se pudo modificar la categoría')
          })
        }else alert('No se pudo modificar la categoría')
      })
    }


    /*ELIMINAR CATEGORÍA*/
    function eliminarCategoria(){
      console.log($('.elemento1').text())
      $.post('php/eliminarCategoria.php', {idCategoria: $('#categoria').val()})
      .done(function(){
        alert('Se elimino correctamente la categoría')
        cargarCategorias();
      })
      .fail(function(){
        alert('No se pudo eliminar la categoría')
      })
    }
    
    

}