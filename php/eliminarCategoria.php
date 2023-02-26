<?php
	// Conectamos coa base de datos
	require("conexionBD.php");

	$consulta = "UPDATE equipo
				SET categoria='0'
				WHERE categoria='".$_POST['idCategoria']."'"; 
	$conexion->query($consulta);

	$consulta = "DELETE
				   FROM categoria
				  WHERE idCategoria = '".$_POST['idCategoria']."'";

	$conexion->query($consulta);
	$conexion->close();
?>