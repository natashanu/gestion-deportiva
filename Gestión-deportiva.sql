-- Creamos la BD
create database if not exists gestionDeportiva
	default character set utf8mb4
    default collate utf8mb4_general_ci;
    
use gestionDeportiva;

-- Creamos la tabla socio
create table if not exists socio(
idSocio smallint(5) auto_increment,
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
create table if not exists lalin_acta_jugador(
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
create table if not exists lalin_acta_partido(
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
create table if not exists lalin_partido(
idPartido smallint(5),
equipo smallint(5),
rival smallint(5),
competicion varchar(3),
jornada tinyint,
onde varchar (1),
	constraint pk_partido primary key (idParido)
)engine=InnoDB;

 -- Creamos la tabla competición
create table if not exists lalin_partido(
idCompeticion varchar(3),
nombre varchar(40),
	constraint pk_competicion primary key (idCompeticion)
)engine=InnoDB;

-- Creamos la tabla rivales
create table if not exists lalin_rival(
idRival smallint(5),
nombre varchar(30),
equipo smallint(5),
abreviatura varchar(10),
	constraint pk_rival primary key (idRival)
)engine=InnoDB;

-- Tabla equipos
create table if not exists lalin_equipo(
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
create table if not exists lalin_categoria(
idCategoria varchar(3),
nombre varchar(40),
nombreCorto varchar(8),
	constraint pk_categoria primary key (idCategoria)
)engine=InnoDB;

-- Tabla temporada
create table if not exists lalin_temporada(
idJugador varchar(9),
idEquipo smallint(5),
dorsal smallint(5),
peso varchar(4),
estatura varchar(3),
posicion varchar(2),
	constraint pk_temporada primary key (idJugador, idEquipo)
)engine=InnoDB;

-- Tabla posición
create table if not exists lalin_posicion(
idPosicion varchar(2),
nombre varchar(20),
	constraint pk_posicion primary key (idPosicion)
)engine=InnoDB;


