package database

import (
	"os"
)

func connectToTestDB() *PastesDB {
	path := os.Getenv("GO_SQLITE_TEST_PATH")
	if path == "" {
		panic("test database could not be read from environment (GO_SQLITE_TEST_PATH)")
	}
	return NewPastesDBConnection(path)
}
