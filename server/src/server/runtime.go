package server

import (
	"fmt"
	"net/http"

	"server/src/database"

	"github.com/gorilla/mux"
)

type Runtime struct {
	Router    *mux.Router
	PasteRepo database.PasteRepository
}

func (rt *Runtime) StartServer(port int) {
	httpServer := http.Server{
		Handler: rt.Router,
		Addr:    fmt.Sprintf("127.0.0.1:%d", port),
	}
	fmt.Println("server is listening at " + httpServer.Addr)
	httpServer.ListenAndServe()
}

func NewServer(dbString string) *Runtime {
	r := mux.NewRouter()
	return &Runtime{
		Router:    r,
		PasteRepo: database.NewPastesDBConnection(dbString),
	}
}
