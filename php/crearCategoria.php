<?php
	// Conectamos coa base de datos
	require("conexionBD.php");
	
	$consulta = "INSERT INTO categoria
				 VALUES ('".$_POST['idCategoria']."','".$_POST['nombre']."','".$_POST['nombreCorto']."')";
	$conexion->query($consulta);
	$conexion->close();
?>