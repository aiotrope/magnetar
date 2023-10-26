# Database

## Tables

### courses

properties/attributes: id, title, slug, details, img

unique constraints: title

references: none

### questions

properties/attributes: id, course_id, user_uuid, title, details, votes, withautomatedanswer, timestamp 

unique constraints: title

references: course_id from courses table

### answers

properties/attributes: id, course_id, question_id, user_uuid, details, votes, timestamp 

references: course_id from courses table, question_id from questions table

### question_votes

properties/attributes: id, question_id, user_uuid, created

references: question_id from questions table

### answer_votes

properties/attributes: id, answer_id, user_uuid, created

references: answer_id from answers table

## Indixes

```bash
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

CREATE INDEX idx_answers_id_question ON answers (id, question_id);

CREATE INDEX idx_question_votes_question_user ON question_votes (question_id, user_uuid);
 
CREATE INDEX idx_answer_votes_answer_user ON answer_votes (answer_id, user_uuid);

```
