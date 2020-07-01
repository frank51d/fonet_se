/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rol
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `rol` (
  `id` int(20) NOT NULL,
  `rol_nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: code_foto
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `code_foto` (
  `idcode_foto` int(11) NOT NULL AUTO_INCREMENT,
  `idorden` int(11) NOT NULL,
  `codigo_foto` varchar(45) NOT NULL,
  `imagePath` varchar(200) NOT NULL,
  PRIMARY KEY (`idcode_foto`),
  KEY `idorden_idx` (`idorden`),
  CONSTRAINT `idorden` FOREIGN KEY (`idorden`) REFERENCES `ordenes_servicio` (`idorden`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: materiales
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `materiales` (
  `idmaterial` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(25) NOT NULL,
  PRIMARY KEY (`idmaterial`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: materiales_utilizados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `materiales_utilizados` (
  `idmateriales_utilizados` int(11) NOT NULL AUTO_INCREMENT,
  `idorden` int(11) NOT NULL,
  `idmaterial` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`idmateriales_utilizados`),
  KEY `idorden_idx` (`idorden`),
  KEY `idorden_foto_idx` (`idorden`),
  KEY `idmaterial_material_idx` (`idmaterial`),
  CONSTRAINT `idmaterial_material` FOREIGN KEY (`idmaterial`) REFERENCES `materiales` (`idmaterial`),
  CONSTRAINT `idorden_material` FOREIGN KEY (`idorden`) REFERENCES `ordenes_servicio` (`idorden`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ordenes_servicio
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ordenes_servicio` (
  `idorden` int(11) NOT NULL AUTO_INCREMENT,
  `idestatus_orden` int(11) NOT NULL,
  `idtipo_orden` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `nombres_cliente` varchar(30) NOT NULL,
  `telefono_cliente` varchar(30) DEFAULT NULL,
  `movil_cliente` varchar(30) DEFAULT NULL,
  `direccion_cliente` varchar(150) DEFAULT NULL,
  `ppp_user` varchar(15) DEFAULT NULL,
  `ppp_pass` varchar(15) DEFAULT NULL,
  `fecha_reporte` date NOT NULL,
  `fecha_asig` date DEFAULT NULL,
  `fecha_ejecucion` date DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `diagnostico_inicial` varchar(45) DEFAULT NULL,
  `diagnostico_final` text,
  `calificacion` int(11) DEFAULT NULL,
  `coordenada` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idorden`),
  KEY `idestatus_orden_idx` (`idestatus_orden`),
  KEY `idtipo_orden_idx` (`idtipo_orden`),
  KEY `idusuario_idx` (`id`),
  CONSTRAINT `idestatus_orden` FOREIGN KEY (`idestatus_orden`) REFERENCES `estatus_orden` (`idestatus_orden`),
  CONSTRAINT `idtipo_orden` FOREIGN KEY (`idtipo_orden`) REFERENCES `tipo_orden` (`idtipo_orden`),
  CONSTRAINT `idusuario` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: plataforma
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `plataforma` (
  `idplataforma` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  `direccion` varchar(180) DEFAULT NULL,
  `coordenada` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`idplataforma`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: estatus_orden
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `estatus_orden` (
  `idestatus_orden` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(15) NOT NULL,
  PRIMARY KEY (`idestatus_orden`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipo_falla
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipo_falla` (
  `idtipo_falla` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(15) NOT NULL,
  PRIMARY KEY (`idtipo_falla`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipo_orden
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipo_orden` (
  `idtipo_orden` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(15) NOT NULL,
  PRIMARY KEY (`idtipo_orden`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipo_usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `idtipo_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(15) NOT NULL,
  PRIMARY KEY (`idtipo_usuario`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_5171l57faosmj8myawaucatdw` (`email`),
  UNIQUE KEY `UK_puhr3k3l7bj71hb7hk7ktpxn0` (`nombre_usuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuario_rol
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuario_rol` (
  `usuario_id` int(20) NOT NULL,
  `rol_id` int(20) NOT NULL,
  KEY `usuarios_id_idx` (`usuario_id`),
  KEY `rol_id_idx` (`rol_id`),
  CONSTRAINT `rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`),
  CONSTRAINT `usuarios_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `idtipo_usuario` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nombres_usuario` varchar(30) NOT NULL,
  `movil_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rol
# ------------------------------------------------------------

INSERT INTO
  `rol` (`id`, `rol_nombre`)
VALUES
  (1, 'ROLE_ADMIN');
INSERT INTO
  `rol` (`id`, `rol_nombre`)
VALUES
  (2, 'ROLE_USER');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: code_foto
# ------------------------------------------------------------

INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    5,
    13,
    '68631501-88a4-4870-a161-1127e3ab67de.jpg',
    'uploads\\68631501-88a4-4870-a161-1127e3ab67de.jpg'
  );
INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    6,
    9,
    '2b051963-d349-4c11-ab27-8e67cc632eeb.jpg',
    'uploads\\2b051963-d349-4c11-ab27-8e67cc632eeb.jpg'
  );
INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    7,
    9,
    '11b4c1eb-4c8c-4a4a-af9a-0627c54456c0.png',
    'uploads\\11b4c1eb-4c8c-4a4a-af9a-0627c54456c0.png'
  );
INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    8,
    9,
    '914d4189-bb5d-4617-9bb9-b00359a06855.jpg',
    'uploads\\914d4189-bb5d-4617-9bb9-b00359a06855.jpg'
  );
INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    9,
    9,
    'ce0d95b6-239b-4083-b768-e76bdb92b9e1.png',
    'uploads\\ce0d95b6-239b-4083-b768-e76bdb92b9e1.png'
  );
INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    10,
    4,
    'b6d3904f-3e5f-4801-a9b2-2d555cfde8ab.jpg',
    'uploads\\b6d3904f-3e5f-4801-a9b2-2d555cfde8ab.jpg'
  );
INSERT INTO
  `code_foto` (
    `idcode_foto`,
    `idorden`,
    `codigo_foto`,
    `imagePath`
  )
VALUES
  (
    11,
    16,
    '3628b534-5636-48ce-b5f9-1c9bb759e592.jpg',
    'uploads\\3628b534-5636-48ce-b5f9-1c9bb759e592.jpg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: materiales
# ------------------------------------------------------------

INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (1, 'Cable UTP Cat 6');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (2, 'Antena PowerBeam 6');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (4, 'Antena PowerBeam M5');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (5, 'Antena LiteBeam M5');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (6, 'Tubo de Aluminio');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (7, 'Conector RJ45');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (8, 'Perfil para Pared');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (9, 'Cable UTP Interperie');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (10, 'Router Mikrotik');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (11, 'Prueba');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (14, 'Tornillo');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (15, 'Mimosa C5c');
INSERT INTO
  `materiales` (`idmaterial`, `descripcion`)
VALUES
  (16, 'Mimosa B11');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: materiales_utilizados
# ------------------------------------------------------------

INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (1, 13, 1, 5);
INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (2, 9, 1, 5);
INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (3, 9, 2, 5);
INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (4, 7, 8, 1);
INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (5, 7, 6, 1);
INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (6, 16, 1, 3);
INSERT INTO
  `materiales_utilizados` (
    `idmateriales_utilizados`,
    `idorden`,
    `idmaterial`,
    `cantidad`
  )
VALUES
  (7, 16, 2, 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ordenes_servicio
# ------------------------------------------------------------

INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    3,
    3,
    2,
    2,
    'ADUCARGAS (AEROPUERTO)',
    '0241-6176758',
    '0424-4530024 SRA.EVELYN OJEDA',
    'Av. Luis Ernesto Branger Edificio Aeropuerto Arturo Michelena parcela P-A1 piso S/N, zona de rampa, zona industrial Valencia, Estado Carabobo, codigo ',
    'aducarga',
    'aducarga',
    '2019-11-26',
    '2019-11-29',
    '2019-12-29',
    '00:00:00',
    '00:00:00',
    'Antena mala',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    4,
    2,
    1,
    1,
    'Pedro Castillo',
    '123',
    '123',
    'Bejuma',
    'pedro.p',
    'pedro.p',
    '2019-11-26',
    '2019-11-29',
    '2019-12-05',
    '10:27:31',
    '00:00:00',
    'Antena',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    5,
    3,
    3,
    1,
    'Javier Escalona',
    '123',
    '123',
    'Valencia',
    'jhjh',
    'jhjh',
    '2019-11-30',
    '2019-12-06',
    '2019-12-05',
    '00:00:00',
    '00:00:00',
    'Prueba 1',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    6,
    3,
    2,
    1,
    'Cliente Prueba',
    '12333',
    '12333',
    'Prebo',
    'aaaa',
    'ssss',
    '2019-11-30',
    '2019-12-06',
    '2019-12-05',
    '00:00:00',
    '00:00:00',
    'ax',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    7,
    3,
    2,
    1,
    'Samuel Quintana',
    '123',
    '123',
    'Valencia',
    'asd',
    'asd',
    '2019-12-04',
    '2019-12-05',
    '2020-01-10',
    '00:00:00',
    '00:00:00',
    'Prueba',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    8,
    1,
    1,
    2,
    'Carlos Colmenares',
    '04152541',
    '014256562',
    'Michelena, calle 90, Valencia',
    'carlos.c',
    'carlos.cc',
    '2019-12-08',
    NULL,
    NULL,
    '00:00:00',
    '00:00:00',
    'Verificcar el enlace',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    9,
    2,
    2,
    1,
    'Carlos Perez',
    '123',
    '123',
    'aaaaaaaaa',
    'aaaa',
    'aaaa',
    '2019-12-08',
    '2019-12-19',
    '2020-01-09',
    '08:50:16',
    '00:00:00',
    'aaaaaa',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    10,
    3,
    1,
    2,
    'Aaron Suarez',
    '12333',
    '123333',
    'aaaaaaa',
    'gfgfgf',
    'gfgfg',
    '2019-12-08',
    NULL,
    '2020-01-11',
    '00:00:00',
    '00:00:00',
    'ssssss',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    11,
    2,
    1,
    2,
    'Freddy Sandovaal',
    '123',
    '123',
    'Aaaaaaaaaaaaaaaasdsd',
    'aaa',
    'aaa',
    '2019-12-22',
    '2019-12-22',
    '2020-01-07',
    '00:00:00',
    '00:00:00',
    'Prueba',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    12,
    2,
    2,
    2,
    'Nodo Sharanda',
    '',
    '',
    'Resd. Sharanda, El Parral',
    '',
    '',
    '2020-01-01',
    '2020-01-01',
    '2020-01-11',
    '04:04:10',
    '00:00:00',
    'Prueba',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    13,
    2,
    1,
    1,
    'Nodo Coyserca',
    '',
    '',
    'Cerro de la Cruz, Caseta 2',
    '',
    '',
    '2020-01-07',
    '2020-01-07',
    '2020-01-13',
    '10:45:24',
    '09:06:26',
    'asd',
    '',
    0,
    '10.083129,-67.908311'
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    14,
    2,
    3,
    2,
    'Nodo Coyserca',
    '',
    '',
    'Cerro de la Cruz, Caseta 2',
    '',
    '',
    '2020-01-11',
    '2020-01-11',
    '2020-01-11',
    '04:16:02',
    '00:00:00',
    'Aaaaa',
    '',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    15,
    2,
    3,
    2,
    'Dario Martinez',
    '123',
    '123',
    'Valencia',
    'aaa',
    'aa',
    '2020-01-11',
    '2020-01-16',
    '2020-01-13',
    '07:21:22',
    '07:15:19',
    'Ok',
    'Aja',
    0,
    NULL
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    16,
    3,
    2,
    3,
    'Nodo Sharanda',
    '12346',
    '123456',
    'Resd. Sharanda, El Parral',
    '',
    '',
    '2020-01-25',
    '2020-01-25',
    '2020-02-09',
    '10:43:18',
    '10:43:57',
    'Prueba',
    'Listo',
    NULL,
    '0'
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    17,
    1,
    1,
    2,
    'Samuel Perez',
    '',
    '',
    'aa',
    '',
    '',
    '2020-01-26',
    '2020-01-26',
    NULL,
    '00:00:00',
    '00:00:00',
    'aa',
    '',
    NULL,
    '0'
  );
INSERT INTO
  `ordenes_servicio` (
    `idorden`,
    `idestatus_orden`,
    `idtipo_orden`,
    `id`,
    `nombres_cliente`,
    `telefono_cliente`,
    `movil_cliente`,
    `direccion_cliente`,
    `ppp_user`,
    `ppp_pass`,
    `fecha_reporte`,
    `fecha_asig`,
    `fecha_ejecucion`,
    `hora_inicio`,
    `hora_fin`,
    `diagnostico_inicial`,
    `diagnostico_final`,
    `calificacion`,
    `coordenada`
  )
VALUES
  (
    18,
    1,
    3,
    4,
    'Nodo Prebo, Ayer',
    '123',
    '123',
    'Resd. Los Morochos, Prebo II',
    '',
    '',
    '2020-02-02',
    '2020-02-02',
    NULL,
    '00:00:00',
    '00:00:00',
    'aaaaa',
    '',
    NULL,
    '0'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: plataforma
# ------------------------------------------------------------

INSERT INTO
  `plataforma` (
    `idplataforma`,
    `descripcion`,
    `direccion`,
    `coordenada`
  )
VALUES
  (
    1,
    'Nodo Prebo',
    'Resd. Los Morochos, Prebo II',
    '62.236,-65.212'
  );
INSERT INTO
  `plataforma` (
    `idplataforma`,
    `descripcion`,
    `direccion`,
    `coordenada`
  )
VALUES
  (
    2,
    'Nodo Coyserca',
    'Cerro de la Cruz, Caseta 2',
    ''
  );
INSERT INTO
  `plataforma` (
    `idplataforma`,
    `descripcion`,
    `direccion`,
    `coordenada`
  )
VALUES
  (3, 'Nodo Sharanda', 'Resd. Sharanda, El Parral', '');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: estatus_orden
# ------------------------------------------------------------

INSERT INTO
  `estatus_orden` (`idestatus_orden`, `descripcion`)
VALUES
  (1, 'ASIGNADA');
INSERT INTO
  `estatus_orden` (`idestatus_orden`, `descripcion`)
VALUES
  (2, 'EN PROCESO');
INSERT INTO
  `estatus_orden` (`idestatus_orden`, `descripcion`)
VALUES
  (3, 'CERRADA');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipo_falla
# ------------------------------------------------------------

INSERT INTO
  `tipo_falla` (`idtipo_falla`, `descripcion`)
VALUES
  (1, 'Antena Dañada');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipo_orden
# ------------------------------------------------------------

INSERT INTO
  `tipo_orden` (`idtipo_orden`, `descripcion`)
VALUES
  (1, 'Inspección');
INSERT INTO
  `tipo_orden` (`idtipo_orden`, `descripcion`)
VALUES
  (2, 'Instalación');
INSERT INTO
  `tipo_orden` (`idtipo_orden`, `descripcion`)
VALUES
  (3, 'Soporte');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipo_usuario
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuario
# ------------------------------------------------------------

INSERT INTO
  `usuario` (
    `id`,
    `email`,
    `nombre`,
    `nombre_usuario`,
    `password`
  )
VALUES
  (1, 'prueba@hot.com', 'Técnico 1', 'user', 'user');
INSERT INTO
  `usuario` (
    `id`,
    `email`,
    `nombre`,
    `nombre_usuario`,
    `password`
  )
VALUES
  (2, 'pru@hot.com', 'Técnico 2', 'admin', '1Qazxsw2.');
INSERT INTO
  `usuario` (
    `id`,
    `email`,
    `nombre`,
    `nombre_usuario`,
    `password`
  )
VALUES
  (3, 'asd@ad', 'Anibal Delpino', 'anibal', '1Qazxsw2.');
INSERT INTO
  `usuario` (
    `id`,
    `email`,
    `nombre`,
    `nombre_usuario`,
    `password`
  )
VALUES
  (4, 'roger@aaa', 'Roger Pinto', 'roger', '1234');
INSERT INTO
  `usuario` (
    `id`,
    `email`,
    `nombre`,
    `nombre_usuario`,
    `password`
  )
VALUES
  (6, 'admin@a', 'test', 'test1', '1111');
INSERT INTO
  `usuario` (
    `id`,
    `email`,
    `nombre`,
    `nombre_usuario`,
    `password`
  )
VALUES
  (7, 'dali@hot', 'Dali', 'dali', '123456df');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuario_rol
# ------------------------------------------------------------

INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (1, 2);
INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (2, 1);
INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (2, 2);
INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (3, 2);
INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (4, 2);
INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (6, 2);
INSERT INTO
  `usuario_rol` (`usuario_id`, `rol_id`)
VALUES
  (7, 2);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (
    `idusuario`,
    `idtipo_usuario`,
    `username`,
    `password`,
    `nombres_usuario`,
    `movil_usuario`
  )
VALUES
  (
    1,
    2,
    'Francisco',
    '1234',
    'FRANCISCO P.',
    '04244240242'
  );
INSERT INTO
  `usuarios` (
    `idusuario`,
    `idtipo_usuario`,
    `username`,
    `password`,
    `nombres_usuario`,
    `movil_usuario`
  )
VALUES
  (2, 2, 'Jairo', '1234', 'JAIRO WILCHEZ', '04244240242');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
