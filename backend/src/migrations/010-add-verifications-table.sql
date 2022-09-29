CREATE TABLE if NOT EXISTS verification_codes (
	code INT,
	account_id INT NOT NULL,
	generated_at TIMESTAMP NOT NULL,
	PRIMARY Key (code, account_id),
	CONSTRAINT fk_verification_codes_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id)
)