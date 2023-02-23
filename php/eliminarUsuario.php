<?php
	// Conectamos coa base de datos
	require("conexionBD.php");

	$consulta = "DELETE *
				   FROM usuario
				  WHERE correo = '".$_POST['correo']."'";

	$conexion->query($consulta);
	$conexion->close();
?>