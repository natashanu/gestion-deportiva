<?php
	// Conectamos coa base de datos
	require("conexionBD.php");

	$consulta = "UPDATE categoria
					SET nombre='".$_POST['nombre']."',
						nombreCorto='".$_POST['nombreCorto']."'
				  WHERE idCategoria='".$_POST['idCategoria']."'"; 

	$conexion->query($consulta);
	$conexion->close(); 
?>