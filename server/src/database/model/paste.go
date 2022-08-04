package model

import (
	"database/sql"
	"time"
)

type Paste struct {
	Id          string
	EditKey     string
	Editable    bool
	CreatedAt   time.Time
	Expiry      sql.NullTime
	Headers     string
	ContentBody string
}
