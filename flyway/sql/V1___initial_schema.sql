CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  img TEXT NOT Null,
  UNIQUE(title)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uuid TEXT NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  created_by INTEGER REFERENCES users(id),
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(title)
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  question_id INTEGER REFERENCES questions(id),
  created_by INTEGER REFERENCES users(id),
  details TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_votes (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  voted_by INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE answer_votes (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  voted_by INTEGER NOT NULL REFERENCES users(id)
);

CREATE INDEX idx_courses_id ON courses (id);

CREATE INDEX idx_users_id ON users (id);

CREATE INDEX idx_users_uuid ON users (uuid);

CREATE INDEX idx_questions_id ON questions (id);

CREATE INDEX idx_questions_user ON questions (created_by);

CREATE INDEX idx_questions_course ON questions (course_id);

CREATE INDEX idx_questions_course_user ON questions (course_id, created_by);

CREATE INDEX idx_answers_id ON answers (id);

CREATE INDEX idx_answers_user ON answers (created_by);

CREATE INDEX idx_answers_course ON answers (course_id);

CREATE INDEX idx_answers_question ON answers (question_id);

CREATE INDEX idx_answers_question_user ON answers (question_id, created_by);

CREATE INDEX idx_answers_course_question_user ON answers (course_id, question_id, created_by);

CREATE INDEX idx_question_votes_user ON question_votes (voted_by);
 
CREATE INDEX idx_answer_upvotes_user ON answer_votes (voted_by);


/* CREATE TABLE users_to_questions (
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
); */