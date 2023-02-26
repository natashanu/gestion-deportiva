<?php
    require("conexionBD.php");

    $consulta = "SELECT * from competicion";

    $saida = array();

    if ($datos = $conexion->query($consulta)) {   		
        while ($competicion = $datos->fetch_object()) {
            $saida[] = $competicion;
        }

        $datos->close();
    }

    $conexion->close();

    echo json_encode($saida);
?>