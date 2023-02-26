<?php
	// Conectamos coa base de datos
	require("conexionBD.php");

	$consulta = "UPDATE competicion
					SET nombre='".$_POST['nombre']."'
				  WHERE idCompeticion='".$_POST['idCompeticion']."'"; 

	$conexion->query($consulta);
	$conexion->close(); 
?>