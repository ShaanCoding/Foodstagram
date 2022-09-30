CREATE TABLE if NOT EXISTS liked_posts (
	account_id INT NOT NULL,
	post_id INT NOT NULL,
	PRIMARY Key (account_id, post_id),
	CONSTRAINT fk_liked_posts_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id),
	CONSTRAINT fk_liked_posts_post_id FOREIGN Key(post_id) REFERENCES posts(post_id)
)