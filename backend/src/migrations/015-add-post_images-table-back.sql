START TRANSACTION;

-- create the post_images table to hold the image urls
CREATE TABLE if NOT EXISTS post_images (
	image_id INT NOT NULL auto_increment,
	post_id INT NOT NULL,
	image_url VARCHAR(200) NOT NULL,
	PRIMARY Key (image_id)
);

-- create the on delete cascade trigger
ALTER TABLE post_images 
ADD CONSTRAINT fk_images_post_id 
FOREIGN KEY (post_id) 
REFERENCES posts(post_id) 
ON DELETE CASCADE;

-- move the existing image urls to the new table
INSERT INTO post_images (post_id, image_url)
SELECT post_id, post_image
FROM posts;

-- remove the image_url column from the posts table
ALTER TABLE posts
DROP COLUMN post_image;

COMMIT;