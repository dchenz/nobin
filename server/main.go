package main

import (
	router "server/src"

	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	port, err := strconv.Atoi(os.Getenv("GO_PORT"))
	if err != nil {
		port = 5000
	}
	dbString := os.Getenv("GO_SQLITE_PATH")
	if dbString == "" {
		panic("missing database connection string")
	}
	s := router.New(dbString)
	s.StartServer(port)
}
