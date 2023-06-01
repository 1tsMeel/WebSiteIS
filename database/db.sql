CREATE DATABASE db_links;

USE db_links;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

SELECT * FROM users;

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

ALTER TABLE users
  ADD COLUMN cargo VARCHAR(25) NOT NULL;

ALTER TABLE users
  ADD COLUMN correo VARCHAR(60) NOT NULL;

ALTER TABLE users
  ADD COLUMN apellido1 VARCHAR(60) NOT NULL AFTER fullname;

ALTER TABLE users
  ADD COLUMN apellido2 VARCHAR(60) NOT NULL AFTER apellido1;

--BASE DE DATOS DELITOS--
  CREATE TABLE global (
  id_global INT(11) NOT NULL,
  id_detenido INT(11) NOT NULL,
  id_datant INT(11) NOT NULL,
  id_tatuaje INT(11) NOT NULL,
  id_adiccion INT(11) NOT NULL,
  id_domicilio INT(11) NOT NULL,
  id_familiar INT(11) NOT NULL,
  id_datosdet INT(11) NOT NULL,
  id_oxxo INT(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_detenido FOREIGN KEY(id_detenido) REFERENCES datos_personales(Id_Detenido)
  CONSTRAINT fk_datant FOREIGN KEY(id_datant) REFERENCES datos_antropomorficos(Id_Datant)
  CONSTRAINT fk_tatuaje FOREIGN KEY(id_tatuaje) REFERENCES tatuajes_detenido(Id_Tatuaje)
  CONSTRAINT fk_adiccion FOREIGN KEY(id_adiccion) REFERENCES adicciones(Id_Adiccion)
  CONSTRAINT fk_domicilio FOREIGN KEY(id_domicilio) REFERENCES domicilio(Id_Domicilio)
  CONSTRAINT fk_familiar FOREIGN KEY(id_familiar) REFERENCES datos_familiares(Id_Familiar)
  CONSTRAINT fk_datosdetencion FOREIGN KEY(id_datosdet) REFERENCES datos_detencion(Id_Detencion)
  CONSTRAINT fk_oxxo FOREIGN KEY(id_oxxo) REFERENCES oxxo(Id_Oxxo)
);

ALTER TABLE global
  ADD PRIMARY KEY (id_global);

ALTER TABLE global
  MODIFY id_global INT(11) NOT NULL AUTO_INCREMENT;

