<?php
    require("conexionBD.php");

    $consulta = "SELECT * from usuario
                where correo = '" . $_POST['correo']."'";
    $saida = array();

    if ($datos = $conexion->query($consulta)){   		    
        while ($usurio = $datos->fetch_object()) {    
            $saida[] = $usurio;    
        }    
        $datos->close();    
    }

    if(count($saida)>0){
        echo 'No se pueden insertar los datos';
    }else{
        $consulta = "INSERT into usuario (nombre, contrasena, correo)
                VALUES ('" . $_POST['nombre'] . "', '" . $_POST['contrasena'] . "',
                '" . $_POST['correo'] . "')";

        $conexion->query($consulta);
        echo 'Se insertaron los datos correctamente';
    }

    $conexion->close();
    

?>