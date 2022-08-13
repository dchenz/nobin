package sqlite

import (
	"database/sql"
	"os"
	"server/src/logging"

	_ "github.com/mattn/go-sqlite3"
)

type PastesDB struct {
	Conn *sql.DB
}

func NewPastesDBConnection() *PastesDB {
	s := os.Getenv("GO_SQLITE_PATH")
	if s == "" {
		logging.Panic("database not found in environment (GO_SQLITE_PATH)")
	}
	return connect(s)
}

func testPasteDBConnection() *PastesDB {
	s := os.Getenv("GO_SQLITE_TEST_PATH")
	if s == "" {
		logging.Panic("test database not found in environment (GO_SQLITE_TEST_PATH)")
	}
	return connect(s)
}

func connect(connectionString string) *PastesDB {
	conn, err := sql.Open("sqlite3", connectionString)
	if err != nil {
		logging.Panic("could not open database: " + connectionString)
	}
	return &PastesDB{
		Conn: conn,
	}
}
