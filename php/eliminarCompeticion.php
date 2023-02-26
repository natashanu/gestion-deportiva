<?php
	// Conectamos coa base de datos
	require("conexionBD.php");

	$consulta = "UPDATE partido
	SET competicion='0'
  	WHERE competicion='".$_POST['idCompeticion']."'"; 

	$conexion->query($consulta);

	$consulta = "DELETE
				   FROM competicion
				  WHERE idCompeticion = '".$_POST['idCompeticion']."'";

	$conexion->query($consulta);
	$conexion->close();
?>