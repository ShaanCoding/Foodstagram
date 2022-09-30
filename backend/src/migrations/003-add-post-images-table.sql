CREATE TABLE if NOT EXISTS post_images (
	image_id INT NOT NULL auto_increment,
	post_id INT NOT NULL,
	image_url VARCHAR(200) NOT NULL,
	PRIMARY Key (image_id),
	CONSTRAINT fk_images_post_id FOREIGN Key(post_id) REFERENCES posts(post_id)
)