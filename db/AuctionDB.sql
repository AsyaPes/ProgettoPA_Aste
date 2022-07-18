CREATE TABLE auction(
  auction_id int(11) NOT NULL,
  title varchar(100) NOT NULL,
  FKcreator_id varchar(100) NOT NULL,
  datetimestart varchar(100) NOT NULL,
  datetimefinish varchar(100) NOT NULL,
  type int(1) NOT NULL,
  status int(1) NOT NULL DEFAULT 1
);


CREATE TABLE enter (
  enter_id varchar(100) NOT NULL,
  FKauction_id int(11) NOT NULL,
  FKuser_id varchar(11) NOT NULL,
  min_price int(11),
  quote int(11),
  n_rilanci int(100) NOT NULL DEFAULT 0,
  win BOOLEAN DEFAULT FALSE,
  bet bigint (100),
  betHashed bigint (100)

);

CREATE TABLE user (
  user_id varchar(50) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  email varchar(100) NOT NULL,
  role varchar(15) NOT NULL,
  token int(11) NOT NULL,
  bet int(11)
);

ALTER TABLE auction
  ADD PRIMARY KEY (auction_id);

ALTER TABLE user
  ADD PRIMARY KEY (user_id);

ALTER TABLE enter
  ADD PRIMARY KEY (enter_id);

ALTER TABLE auction
 ADD CONSTRAINT FKcreator FOREIGN KEY (FKcreator_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE enter
  ADD CONSTRAINT FKauction FOREIGN KEY (FKauction_id) REFERENCES auction (auction_id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE enter
  ADD CONSTRAINT FKuser FOREIGN KEY (FKuser_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO user (user_id,email, name, surname,  role, token) VALUES 
  ('T06x323aWb', 'asya@gmail.com', 'Asya', 'Pesaresi', 'bip_creator', 0),
  ('Wos78BnB09', 'chiara@gmail.com', 'Chiara', 'Cucchi', 'bip_creator', 0),
  ('4p0KF0xkOi', 'francesco@gmail.com', 'Francesco', 'Rossi', 'bip_partecipant', 200),
  ('2Zbo_lX4d5', 'alessandro@gmail.com', 'Alessandro', 'Passarini', 'bip_partecipant', 300),
  ('nzRH41T5sz', 'natalia@gmail.com', 'Natalia', 'Miccini', 'admin', 0);

INSERT INTO auction (auction_id, title, FKcreator_id, type, datetimestart, datetimefinish, status) VALUES
  (1,'Antiquariato', 'T06x323aWb', 1, '2022-08-01T14:00:00+01:00' , '2022-08-01T15:00:00+01:00', 0),
  (2,'Opere d arte', 'T06x323aWb', 2, '2022-04-20T09:00:00+01:00', '2022-04-20T10:00:00+01:00', 1),
  (3,'Immobiliare', 'T06x323aWb', 3, '2022-11-07T21:00:00+01:00', '2022-11-07T22:00:00+01:00', 0),
  (4,'Immobili enti ecclesiastici', 'Wos78BnB09', 1, '2022-07-05T15:00:00+01:00', '2022-08-05T15:00:00+01:00', 2),
  (5,'Container', 'Wos78BnB09', 1, '2022-09-02T20:00:00+01:00', '2022-09-03T20:00:00+01:00', 0),
  (6,'NFT', 'Wos78BnB09', 3, '2022-08-15T22:00:00+01:00', '2022-08-24T22:00:00+01:00', 0);

INSERT INTO enter (enter_id, FKauction_id, FKuser_id, min_price, quote,n_rilanci,win,bet) VALUES
  ('ak3',1, "4p0KF0xkOi", 20, 10,0,FALSE,NULL),
  ('b2q',2, "4p0KF0xkOi", NULL, NULL,1,TRUE,100),
  ('n8p',3, "4p0KF0xkOi", NULL, NULL,1,FALSE,0),
  ('i7u',3, "2Zbo_lX4d5", NULL, NULL,1,FALSE,0),
  ('h5k',4, "4p0KF0xkOi", 30, 20,2,FALSE,NULL),
  ('px2',4, "2Zbo_lX4d5", 30, 20,3,FALSE,NULL),
  ('g6q',5, "2Zbo_lX4d5", 50, 20,0,FALSE,NULL),
  ('1h3',6, "2Zbo_lX4d5", NULL, NULL,1,FALSE,0),
  ('a3e',6, "4p0KF0xkOi", NULL, NULL,1,FALSE,0);
