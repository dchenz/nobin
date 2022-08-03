package model

import "database/sql"

type Paste struct {
	Id          string
	EditKey     string
	Editable    bool
	CreatedAt   int64
	Expiry      sql.NullInt64
	Headers     string
	ContentBody string
}
