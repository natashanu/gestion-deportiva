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
