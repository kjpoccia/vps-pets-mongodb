DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	varchar,
	`type`	varchar
);

DELETE FROM PETS;

DELETE FROM sqlite_sequence WHERE name="PETS";

INSERT INTO PETS (name, type) VALUES
('Eric', 'Cat'),
('Spock', 'Cat'),
('Kyle', 'Cat'),
('Lucy', 'Dog');