DROP TABLE IF EXISTS `pets`;
CREATE TABLE IF NOT EXISTS `pets` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	varchar,
	`type`	varchar,
);
