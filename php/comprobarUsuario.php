<?php
    require("conexionBD.php");

    $consulta = "SELECT rol, contrasena from usuario
                where correo = '" . $_POST['correo']."'";

    $saida = array();

    if ($datos = $conexion->query($consulta)) {   		
        while ($aula = $datos->fetch_object()) {
            $saida[] = $aula;
        }

        $datos->close();
    }

    $conexion->close();

    echo json_encode($saida);
?>