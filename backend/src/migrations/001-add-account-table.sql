CREATE TABLE if NOT EXISTS accounts (
	account_id INT NOT NULL auto_increment,
	name VARCHAR(100) NOT NULL,
	username VARCHAR(100) NOT NULL,
	bio Text,
	password_hash VARCHAR(255) NOT NULL,
	email VARCHAR(120) NOT NULL UNIQUE,
	verified BOOLEAN DEFAULT false,
	profile_picture_url VARCHAR(120),
	PRIMARY Key (account_id)
)