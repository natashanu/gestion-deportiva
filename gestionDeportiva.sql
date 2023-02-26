-- Creamos la BD
create database if not exists gestionDeportiva
	default character set utf8mb4
    default collate utf8mb4_general_ci;
    
use gestionDeportiva;

-- Creamos la tabla usuario
create table if not exists usuario(
    idUsuario smallint auto_increment,
    nombre varchar(30) not null,
    contrasena varchar(30) not null,
    correo varchar(40) not null,
    rol enum('usuario','administrador','gestor') not null default('usuario'),
        constraint pk_usuario primary key (idUsuario)
);

-- Añadimos nustro usuario administrador
insert into usuario (nombre, contrasena,correo, rol) values ('alumno', 'abc123.','alumno@gmail.com', 'administrador');
insert into usuario (nombre, contrasena,correo, rol) values ('alumnx', 'abc123.','alumnx@gmail.com', 'gestor');

-- Creamos la tabla socio
create table if not exists socio(
idSocio smallint(5),
numero varchar(3) not null,
nombre varchar(20),
apelidos varchar(50),
cota smallint(5),
ccc varchar(20),
comentarios varchar(50),
responsable varchar(20),
foto varchar(50),
entregado varchar(2),
cobrado varchar(2),
	constraint pk_socio primary key (idSocio)
)engine=InnoDB;

-- Creamos la tabla jugador
create table if not exists jugador(
idJugador varchar(9),
nombre varchar(20),
apellido1 varchar(20),
apellido2 varchar(20),
fechaNac date,
apodo varchar(20),
casa varchar(9),
movil varchar(9),
	constraint pk_jugador primary key (idJugador)
)engine=InnoDB;

-- Creamos la tabla acta_jugador
create table if not exists acta_jugador(
idPartido smallint(5),
idJugador varchar(9),
goles tinyint,
amarilla tinyint,
exclusion1 tinyint,
exclusion2 tinyint,
descalificacion tinyint,
expulsion tinyint,
	constraint pk_acta_jugador primary key (idPartido, idJugador)
)engine=InnoDB;

-- Cramos la tabla acta_partido
create table if not exists acta_partido(
idPartido smallint(5),
fecha date,
golesLocal1 tinyint,
golesLocal2 tinyint,
golesLocal3 tinyint,
golesLocal4 tinyint,
golesVisitante1 tinyint,
golesVisitante2 tinyint,
golesVisitante3 tinyint,
golesVisitante4 tinyint,
	constraint pk_acta_partido primary key (idPartido)
)engine=InnoDB;

-- Creamos la tabla partido
create table if not exists partido(
idPartido smallint(5),
equipo smallint(5),
rival smallint(5),
competicion varchar(3),
jornada tinyint,
onde varchar (1),
	constraint pk_partido primary key (idPartido)
)engine=InnoDB;

 -- Creamos la tabla competición
create table if not exists competicion(
idCompeticion varchar(3),
nombre varchar(40),
	constraint pk_competicion primary key (idCompeticion)
)engine=InnoDB;

-- Creamos la tabla rivales
create table if not exists rival(
idRival smallint(5),
nombre varchar(30),
equipo smallint(5),
abreviatura varchar(10),
	constraint pk_rival primary key (idRival)
)engine=InnoDB;

-- Tabla equipos
create table if not exists equipo(
idEquipo smallint(5),
nombre varchar(20),
categoria varchar(3),
temporada varchar(4),
foto varchar(50),
logo varchar(50),
web varchar(50),
	constraint pk_equipo primary key (idEquipo)
)engine=InnoDB;

-- Tabla categorías
create table if not exists categoria(
idCategoria varchar(3),
nombre varchar(40),
nombreCorto varchar(8),
	constraint pk_categoria primary key (idCategoria)
)engine=InnoDB;

-- Tabla temporada
create table if not exists temporada(
idJugador varchar(9),
idEquipo smallint(5),
dorsal smallint(5),
peso varchar(4),
estatura varchar(3),
posicion varchar(2),
	constraint pk_temporada primary key (idJugador, idEquipo)
)engine=InnoDB;

-- Tabla posición
create table if not exists posicion(
idPosicion varchar(2),
nombre varchar(20),
	constraint pk_posicion primary key (idPosicion)
)engine=InnoDB;

/* -------------------------------------------*/
-- Añadimos las claves foraneas a cada tabla
-- Añadimos a la tabla acta-jugador
alter table acta_jugador
	add constraint fk_acta_jug_partido foreign key (idPartido) references partido(idPartido),
	add constraint fk_acta_jug_jugador foreign key (idJugador) references jugador(idJugador);
	
-- Añadimos a la tabla temporada
alter table temporada
	add constraint fk_temporada_jugador foreign key (idJugador) references jugador(idJugador),
	add constraint fk_temporada_equipo foreign key (idEquipo) references equipo(idEquipo),
	add constraint fk_temporada_posicion foreign key (posicion) references posicion(idPosicion);
	
-- Añadimos a la tabla acta-partido
alter table acta_partido
	add constraint fk_acta_part_partido foreign key (idPartido) references partido(idPartido);
	
-- Añadimos a la tabla partido
alter table partido
	add constraint fk_partido_equipo foreign key (equipo) references equipo(idEquipo),
	add constraint fk_partido_rival foreign key (rival) references rival(idRival),
	add constraint fk_partido_competicion foreign key (competicion) references competicion(idCompeticion);
	
-- Añadimos a la tabla rivales
alter table rival
	add constraint fk_rival_equipo foreign key (equipo) references equipo(idEquipo);
	
-- Añadimos a la tabla equipo
alter table equipo
	add constraint fk_equipo_categoria foreign key (categoria) references categoria(idCategoria);



-- Añadimos socio
INSERT INTO socio (idSocio, numero, nombre, apelidos, cota, ccc, comentarios, responsable, foto, entregado, cobrado)
VALUES (1, 9999, "José Manuel", "Sierra González", 99, '?', "Pai de Roi", "alumno", "/images/JoseMGonzalez.png", "SI", "SI"),
(2, 9998, "Iago ", "Pereiro Troitiño", 99, '?', "Irmán de Almudena", "alumno", "/images/IagoPereiro.png", "SI", "NO"),
(3, 9997, "Javier", "Vázquez Cruz", 99, '?', "Pai de Brais", "alumno", "/images/JavierVazquez.png", "NO", "SI"),
(4, 9996, "Natasha", "Núñez Salán", 99, '?', "Nai de Diego", "alumno", "/images/NatashaNuñez.png", "NO", "NO");

-- Añadimos categoria
INSERT INTO categoria (idCategoria, nombre, nombreCorto)
VALUES ("1EM", "Primera Estatal Masculina", "1EM"),
("1AF", "Primera Autonomica Femenina", "1AF"),
("XHM", "DH Xuvenil Masculina", "XHM"),
("XHF", "DH Xuvenil Femenina", "XHF"),
("0", "eliminado", "0");


-- Añadimos equipo
INSERT INTO equipo (idEquipo, nombre, categoria, temporada, foto, logo, web)
VALUES (1, "Embutidos lalinense", "1EM", "2016", "/images/embutidosLalilense.png", "/images/logoLalilense.png", "www.embutidoslalinense.com"),
(2, "Coreti", "1EM", "2016", "/images/coreti.png", "/images/coreti.png", "www.coreti.com"),
(3, "Academia Octavio", "1EM", "2016","/images/academiaOctavio.png", "/images/academiaOctavio.png", "www.academiaOctavio.com"),
(4, "Clínica Deza", "1EM", "2016", "/images/clinicaDeza.png", "/images/clinicaDeza.png", "www.clinicadeza.es"),
(5, "Clínica Deza", "XHM", "2016", "/images/clinicaDeza.png", "/images/clinicaDeza.png", "www.clinicadeza.es"),
(6, "Coreti", "1AF", "2016", "/images/coreti.png", "/images/coreti.png", "www.coreti.com"),
(7, "Academia Octavio", "1AF", "2016","/images/academiaOctavio.png", "/images/academiaOctavio.png", "www.academiaOctavio.com"),
(8, "Embutidos lalinense", "1AF", "2016", "/images/embutidosLalilense.png", "/images/logoLalilense.png", "www.embutidoslalinense.com"),
(9, "IES Ramón Ulloa", "1AF", "2016", "/images/ramonUlloa.png", "/images/logoLalilense.png", "www.edu.xunta.gal/centros/iesallerulloa/"),
(10, "IES Ramón Ulloa", "1EM", "2016", "/images/ramonUlloa.png", "/images/logoLalilense.png", "www.edu.xunta.gal/centros/iesallerulloa/");

-- Añadimos Rivales
INSERT INTO rival (idRival, nombre, equipo, abreviatura)
VALUES (1, "Academia Octavio", 3, "ACO"),
(2, "Clinica Deza", 4, "CLD"),
(3, "Coreti", 2, "CRT"),
(4, "IES Ramón Ulloa", 10, "RMU"),
(5, "IES Ramón Ulloa", 9, "RMU"),
(6, "Coreti", 6, "CRT");



-- Añadimos jugador
INSERT INTO jugador (idJugador, nombre, apellido1, apellido2, fechaNac, apodo, casa, movil)
VALUES ('09548754P', "Roi", "Sierra", "González", "2000-03-01", "Tirador", "Rúa C", "678678678"),
('89546654R', "Almudena", "Pereiro", "Trotiño", "1999-07-01", "Mecha", "Rúa A", "654654654"),
('57803845S', "Brais", "Vázquez", "Cruz", "2001-08-23", "Goleador", "Rúa B", "643643643"),
('34530298B', "Diego", "Núñez", "Salán", "1996-09-02", "Pasadordor", "Rúa D", "689689689");

-- Añadimos competicion
INSERT INTO competicion (idCompeticion, nombre)
VALUES ('CDI', "Copa Deputacion"),
('CFE', "Copa Federación"),
('CXG', "Copa Xunta de Galicia"),
("0", "eliminado");


-- Añadimos partido
INSERT INTO partido (idPartido, equipo, rival, competicion, jornada, onde)
VALUES (1, 1, 2,'CDI', 1, "L"),
(2, 3, 4, 'CXG', 2, "V"),
(3, 10, 3, 'CXG', 3, "L"),
(4, 8, 6, 'CXG', 4, "L"),
(5, 7, 5, 'CFE', 5, "V");

-- Añadimos acta_partido
INSERT INTO acta_partido (idPartido, fecha, golesLocal1, golesLocal2, golesLocal3, golesLocal4, golesVisitante1, golesVisitante2, golesVisitante3, golesVisitante4)
VALUES (1, "2016-06-23", 1, 1, 1, 0, 0, 1, 1, 0),
(2, "2016-06-30", 0, 0, 0, 1, 1, 0, 0, 1),
(3, "2016-07-05", 1, 1, 1, 0, 0, 1, 1, 0),
(4, "2016-07-12", 1, 1, 0, 0, 1, 1, 0, 1),
(5, "2016-07-22", 1, 0, 1, 1, 0, 1, 1, 0);



-- Añadimos acta_jugador
INSERT INTO acta_jugador (idPartido, idJugador, goles, amarilla, exclusion1, exclusion2, descalificacion, expulsion)
VALUES (1, '09548754P', 99, 5, 1, 0, 1, 0),
(2, '89546654R', 98, 3, 0, 1, 0, 1),
(3, '57803845S', 97, 8, 0, 0, 0, 0),
(4, '34530298B', 96, 12, 1, 1, 1, 1);


-- añadimos posicion
INSERT INTO posicion (idPosicion, nombre)
VALUES (1,"Adestrador"),
(2, "Central"),
(3, "Universal");


-- Añadimos Temporada 
INSERT INTO temporada (idJugador, idEquipo, dorsal, peso, estatura, posicion)
VALUES ('09548754P',1,99, "999", "999",2),
('89546654R', 2, 98, "999", "999",2),
('57803845S', 3, 97, "999", "999",3),
('34530298B', 4, 96, "999", "999",3);

