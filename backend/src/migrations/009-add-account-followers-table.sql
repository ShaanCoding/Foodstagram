CREATE TABLE if NOT EXISTS account_followers (
	account_id INT NOT NULL,
	followed_account_id INT NOT NULL,
	PRIMARY Key (account_id, followed_account_id),
	CONSTRAINT fk_account_followers_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id),
	CONSTRAINT fk_account_followers_followed_account_id FOREIGN Key(followed_account_id) REFERENCES accounts(account_id)
)