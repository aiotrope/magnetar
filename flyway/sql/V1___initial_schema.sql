CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  details TEXT NOT NULL,
  img TEXT NOT Null,
  UNIQUE(title)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  user_uuid TEXT NOT NULL,
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
  user_uuid TEXT NOT NULL,
  details TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_votes (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  user_uuid TEXT NOT NULL
);

CREATE TABLE answer_votes (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  user_uuid TEXT NOT NULL
);

CREATE INDEX idx_courses_id ON courses (id);

CREATE INDEX idx_questions_id ON questions (id);

CREATE INDEX idx_questions_user ON questions (user_uuid);

CREATE INDEX idx_questions_course ON questions (course_id);

CREATE INDEX idx_questions_course_user ON questions (course_id, user_uuid);

CREATE INDEX idx_answers_id ON answers (id);

CREATE INDEX idx_answers_user ON answers (user_uuid);

CREATE INDEX idx_answers_course ON answers (course_id);

CREATE INDEX idx_answers_question ON answers (question_id);

CREATE INDEX idx_answers_question_user ON answers (question_id, user_uuid);

CREATE INDEX idx_answers_course_question ON answers (course_id, question_id);

CREATE INDEX idx_question_votes_user ON question_votes (user_uuid);
 
CREATE INDEX idx_answer_upvotes_user ON answer_votes (user_uuid);
