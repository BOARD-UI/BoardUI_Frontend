CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT null,
    enabled BOOLEAN DEFAULT FALSE
);

-- -----------------------------------------------------
-- Table `Rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS rooms (
    room_id SERIAL PRIMARY KEY,
    title VARCHAR(50) UNIQUE NOT NULL,
    num_members INTEGER,
    URL VARCHAR(100) UNIQUE NOT NULL
);

-- -----------------------------------------------------
-- Table `Permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS permissions (
    room_id int REFERENCES rooms(room_id),
    user_id int REFERENCES users(user_id),
    type VARCHAR(50) DEFAULT 'None',
    CONSTRAINT permissions_pkey PRIMARY KEY (room_id, user_id)
);

-- -----------------------------------------------------
-- Table `Requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS requests (
	request_id SERIAL PRIMARY KEY,
	importance VARCHAR(7) NOT NULL,
	justification VARCHAR(200) NOT NULL,
	state VARCHAR(10) DEFAULT 'Pending',
	user_id int REFERENCES users(user_id),
	room_id int REFERENCES rooms(room_id)
);

-- -----------------------------------------------------
-- Table `Files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS files (
	file_id SERIAL PRIMARY KEY,
    room_id int REFERENCES rooms(room_id),
    name VARCHAR(50) not null,
    extension VARCHAR(50) not null,
    content TEXT NOT NULL,
    request_id int REFERENCES requests(request_id),
    image bytea
);