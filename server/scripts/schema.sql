CREATE TABLE nobin_paste (
    id  VARCHAR(32) PRIMARY KEY,   -- UUID v4 stored as lowercase hexadecimal.
    edit_key VARCHAR(32) NOT NULL, -- UUID v4 stored as lowercase hexadecimal.
    created_at DATE NOT NULL,
    expiry DATE,
    header TEXT NOT NULL,          -- JSON object stored as plain-text.
    body TEXT NOT NULL             -- Encrypted data stored as Base64.
);