package model

import (
	"database/sql"
	"time"
)

type Paste struct {
	Id        string
	EditKey   string
	CreatedAt time.Time
	Expiry    sql.NullTime
	Header    string
	Body      string
}
