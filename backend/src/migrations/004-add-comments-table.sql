CREATE TABLE if NOT EXISTS comments (
	comment_id INT NOT NULL auto_increment,
	account_id INT NOT NULL,
	comment VARCHAR(200) NOT NULL,
	PRIMARY Key (comment_id),
	CONSTRAINT fk_comments_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id)
)