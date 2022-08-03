package src

import (
	"server/src/routes/pastehandler"
	"server/src/server"
)

func New(dbString string) *server.Runtime {
	s := server.NewServer(dbString)
	register(s)
	return s
}

func register(s *server.Runtime) {
	pastehandler.Register(s)
}
