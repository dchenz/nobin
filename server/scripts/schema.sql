CREATE TABLE nobin_paste (
    -- UUID v4 stored as lowercase hexadecimal.
    id  VARCHAR(32) PRIMARY KEY,
    -- UUID v4 stored as lowercase hexadecimal.
    edit_key VARCHAR(32) NOT NULL DEFAULT "",
    can_edit BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    expiry DATE,
    -- JSON object stored as plain-text.
    headers TEXT NOT NULL,
    -- Encrypted data stored as Base64.
    content_body TEXT NOT NULL
)