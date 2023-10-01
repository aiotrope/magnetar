CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  UNIQUE(title)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  user_id INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(title)
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  user_id INTEGER REFERENCES users(id),
  details TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_to_questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  question_id INTEGER NOT NULL REFERENCES questions(id),
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_to_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  answer_id INTEGER NOT NULL REFERENCES answers(id),
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_votes (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
);

CREATE TABLE answer_votes (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
);

CREATE INDEX idx_courses_id ON courses (id)

CREATE INDEX idx_users_id ON users (id)

CREATE INDEX idx_users_uuid ON users (uuid)



/* CREATE INDEX idx_question_upvotes_user ON question_upvotes (user_uuid);
 
CREATE INDEX idx_answer_upvotes_user ON answer_upvotes (user_uuid);

CREATE INDEX idx_user_timetable_user ON user_timetable (user_uuid); */