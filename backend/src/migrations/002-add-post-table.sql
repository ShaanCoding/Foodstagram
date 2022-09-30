CREATE TABLE if NOT EXISTS posts (
	post_id INT NOT NULL auto_increment,
	account_id INT NOT NULL,
	location_name VARCHAR(100) NOT NULL,
	location_lat DECIMAL(10, 5) NOT NULL,
	location_long DECIMAL(10, 5) NOT NULL,
	caption VARCHAR(200) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	PRIMARY Key (post_id),
	CONSTRAINT fk_posts_account_id FOREIGN Key(account_id) REFERENCES accounts(account_id)
)