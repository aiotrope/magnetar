INSERT INTO courses (title, slug, details, img) VALUES ('Fortran CS-5758', 'fortran-cs-5758', 'Fortran CS-5758 Course Section', 'https://craftypixels.com/placeholder-image/200x80/703594/FFFFFF&text=Fortran+CS-5758');
INSERT INTO courses (title, slug, details, img) VALUES ('Java CS-3456', 'java-cs-3456', 'Java CS-3456 Course Section', 'https://craftypixels.com/placeholder-image/200x80/ff8c1a/ffffff&text=Java+CS-3456');
INSERT INTO courses (title, slug, details, img) VALUES ('Go CS-9012', 'go-cs-9012', 'Go CS-9012 Course Section', 'https://craftypixels.com/placeholder-image/200x80/00ccff/ffffff&text=Go+CS-9012');
INSERT INTO courses (title, slug, details, img) VALUES ('Python CS-5678', 'python-cs-5678', 'Python CS-5678 Course Section', 'https://craftypixels.com/placeholder-image/200x80/0099cc/ffffff&text=Python+CS-5678');
INSERT INTO courses (title, slug, details, img) VALUES ('SQL CS-6634', 'sql-cs-6634', 'SQL CS-6634 Course Section', 'https://craftypixels.com/placeholder-image/200x80/b3cbcb/595959&text=SQL+CS-6634');
INSERT INTO courses (title, slug, details, img) VALUES ('Javascript CS-1234', 'javascript-cs-1234', 'Javascript CS-1234 Course Section', 'https://craftypixels.com/placeholder-image/200x80/ffff00/595959&text=Javascript+CS-1234');

INSERT INTO questions (course_id, user_uuid, title, details) VALUES (1, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Hello Fortran', 'How to write Hello, world! in Fortran?');

INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (1, 1, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Placeholder answer Fortran');
