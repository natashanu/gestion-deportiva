<?php
	// Conectamos coa base de datos
	require("conexionBD.php");

	$consulta = "UPDATE usuario
					SET nombre='".$_POST['usuario']."',
						contrasena='".$_POST['contrasena']."',
						correo='".$_POST['correo']."'
				  WHERE correo='".$_POST['correo']."'"; 

	$conexion->query($consulta);
	$conexion->close(); 
?>