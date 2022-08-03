package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

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
