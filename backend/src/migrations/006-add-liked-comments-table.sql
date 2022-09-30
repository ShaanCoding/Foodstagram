CREATE TABLE if NOT EXISTS liked_comments (
	comment_id INT NOT NULL,
	account_id INT NOT NULL,
	PRIMARY Key (comment_id, account_id),
	CONSTRAINT fk_liked_comments_comment_id FOREIGN Key(comment_id) REFERENCES comments(comment_id),
	CONSTRAINT fk_liked_comments_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id)
)