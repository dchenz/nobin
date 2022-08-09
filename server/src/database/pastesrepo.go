package database

import (
	"database/sql"
	"server/src/routes/model"

	_ "github.com/mattn/go-sqlite3"
)

type PasteRepository interface {
	CreatePaste(p model.PasteCreateRequest) (*model.PasteIdentifier, error)
	GetPaste(ref model.PasteIdentifier) (*model.PasteResponse, error)
	// DeletePaste()
}

type PastesDB struct {
	Connection *sql.DB
}

func NewPastesDBConnection(dbString string) *PastesDB {
	conn, err := sql.Open("sqlite3", dbString)
	if err != nil {
		panic("could not open database: " + dbString)
	}
	return &PastesDB{
		Connection: conn,
	}
}
