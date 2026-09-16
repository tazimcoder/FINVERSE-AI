/* ==========================================================
   FINVERSE AI
   Chat Tables
========================================================== */

CREATE TABLE chats (

    id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    title VARCHAR(255) DEFAULT 'New Chat',

    is_favorite BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE

);

CREATE TABLE chat_messages (

    id INT PRIMARY KEY AUTO_INCREMENT,

    chat_id INT NOT NULL,

    role ENUM(
        'user',
        'assistant'
    ) NOT NULL,

    content LONGTEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (chat_id)
    REFERENCES chats(id)
    ON DELETE CASCADE

);