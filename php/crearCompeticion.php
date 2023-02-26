<?php
	// Conectamos coa base de datos
	require("conexionBD.php");
	
	$consulta = "INSERT INTO competicion
				 VALUES ('".$_POST['idCompeticion']."','".$_POST['nombre']."')";
	$conexion->query($consulta);
	$conexion->close();
?>