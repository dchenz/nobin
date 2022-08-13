package main

import (
	"os"
	server "server/src"
	"strconv"
)

func main() {
	port, err := strconv.Atoi(os.Getenv("GO_PORT"))
	if err != nil {
		port = 5000
	}
	s := server.NewServer()
	s.StartServer(port)
}
