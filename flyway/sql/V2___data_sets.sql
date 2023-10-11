INSERT INTO courses (title, details, img) VALUES ('Fortran CS-5758', 'Course section for posting questions and answers in Fortran CS-5758', 'https://craftypixels.com/placeholder-image/500x150/703594/FFFFFF&text=Fortran+CS-5758');
INSERT INTO courses (title, details, img) VALUES ('Java CS-3456', 'Course section for posting questions and answers in Java CS-3456', 'https://craftypixels.com/placeholder-image/500x150/ff8c1a/ffffff&text=Java+CS-3456');
INSERT INTO courses (title, details, img) VALUES ('CPP CS-2345', 'Course section for posting questions and answers in CPP CS-2345', 'https://craftypixels.com/placeholder-image/500x150/002699/ffffff&text=CPP+CS-2345');
INSERT INTO courses (title, details, img) VALUES ('Swift CS-0123', 'Course section for posting questions and answers in Swift CS-0123', 'https://craftypixels.com/placeholder-image/500x150/ff531a/ffffff&text=Swift+CS-0123');
INSERT INTO courses (title, details, img) VALUES ('Javascript CS-1234', 'Course section for posting questions and answers in Javascript CS-1234', 'https://craftypixels.com/placeholder-image/500x150/ffff00/595959&text=Javascript+CS-1234');
INSERT INTO courses (title, details, img) VALUES ('Rust CS-7890', 'Course section for posting questions and answers in Rust CS-7890', 'https://craftypixels.com/placeholder-image/500x150/595959/ffffff&text=Rust+CS-7890');
INSERT INTO courses (title, details, img) VALUES ('Go CS-9012', 'Course section for posting questions and answers in Go CS-9012', 'https://craftypixels.com/placeholder-image/500x150/00ccff/ffffff&text=Go+CS-9012');
INSERT INTO courses (title, details, img) VALUES ('Python CS-5678', 'Course section for posting questions and answers in Python CS-5678', 'https://craftypixels.com/placeholder-image/500x150/0099cc/ffffff&text=Python+CS-5678');
INSERT INTO courses (title, details, img) VALUES ('CSharp CS-6789', 'Course section for posting questions and answers in CSharp CS-6789', 'https://craftypixels.com/placeholder-image/500x150/2d862d/ffffff&text=CSharp+CS-6789');
INSERT INTO courses (title, details, img) VALUES ('SQL CS-6634', 'Course section for posting questions and answers in SQL CS-6634', 'https://craftypixels.com/placeholder-image/500x150/b3cbcb/595959&text=SQL+CS-6634');

INSERT INTO questions (course_id, user_uuid, title, details) VALUES (1, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Hello Fortran', 'How to write Hello, world! in Fortran?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (2, '16a398f4-853e-48c9-a9f2-77b6c315ed82', 'Hello Java', 'How to write Hello, world! in Java?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (3, '952a0674-be85-4f48-a458-fdf81e6185d8', 'Hello CPP', 'How to write Hello, world! in CPP?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (4, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Hello Swift', 'How to write Hello, world! in Swift?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (5, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Hello Javascript', 'How to write Hello, world! in Javascript?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (6, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Hello Rust', 'How to write Hello, world! in Rust?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (7, 'e566e100-05c7-4d67-ab82-703c7f1eb764', 'Hello Go', 'How to write Hello, world! in Golang?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (8, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Hello Python', 'How to write Hello, world! in Python?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (9, 'cb4fb37d-69a5-4cf1-9a7d-4007e80794af', 'Hello CSharp', 'How to write Hello, world! in CSharp?');
INSERT INTO questions (course_id, user_uuid, title, details) VALUES (10, 'e566e100-05c7-4d67-ab82-703c7f1eb764', 'Hello SQL', 'How to write Hello, world! in SQL?');

INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (1, 1, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Placeholder answer Fortran');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (2, 2, '16a398f4-853e-48c9-a9f2-77b6c315ed82', 'Placeholder answer Java');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (3, 3, '952a0674-be85-4f48-a458-fdf81e6185d8', 'Placeholder answer CPP');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (4,4, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Placeholder answer Swift');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (5, 5, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Placeholder answer Javascript');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (6, 6, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Placeholder answer Rust');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (7, 7, 'e566e100-05c7-4d67-ab82-703c7f1eb764', 'Placeholder answer Golang');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (8, 8, '6a45ba57-b461-4a2c-a150-b8cfc136abbe', 'Placeholder answer Python');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (9, 9, 'cb4fb37d-69a5-4cf1-9a7d-4007e80794af', 'Placeholder answer CSharp');
INSERT INTO answers (course_id, question_id, user_uuid, details) VALUES (10, 10, 'e566e100-05c7-4d67-ab82-703c7f1eb764', 'Placeholder answer SQL');