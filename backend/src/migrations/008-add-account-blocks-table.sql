CREATE TABLE if NOT EXISTS account_blocks (
	account_id INT NOT NULL,
	blocked_account_id INT NOT NULL,
	PRIMARY Key (account_id, blocked_account_id),
	CONSTRAINT fk_account_blocks_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id),
	CONSTRAINT fk_account_blocks_blocked_account_id FOREIGN Key(blocked_account_id) REFERENCES accounts(account_id)
)