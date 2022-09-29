CREATE TABLE if NOT EXISTS post_comments (
	comment_id INT NOT NULL,
	post_id INT NOT NULL,
	PRIMARY Key (comment_id, post_id),
	CONSTRAINT fk_post_comments_comment_id FOREIGN Key(comment_id) REFERENCES comments(comment_id),
	CONSTRAINT fk_post_comments_post_id FOREIGN Key(post_id) REFERENCES posts(post_id)
)