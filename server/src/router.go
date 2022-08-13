package src

import (
	"fmt"
	"net/http"
	"server/src/database/sqlite"
	"server/src/logging"
	"server/src/middleware"
	"server/src/routes/pastehandler"

	"github.com/gorilla/mux"
)

type Server struct {
	RootRouter   *mux.Router
	PasteService *pastehandler.PasteRouter
}

func (s *Server) StartServer(port int) {
	httpServer := http.Server{
		Handler: s.RootRouter,
		Addr:    fmt.Sprintf("127.0.0.1:%d", port),
	}
	logging.Log("server is listening at " + httpServer.Addr)
	if err := httpServer.ListenAndServe(); err != nil {
		logging.Error(err.Error())
	}
}

func NewServer() *Server {
	root := mux.NewRouter()
	root.Use(middleware.LoggerMiddleware)
	pasteRouter := pastehandler.PasteRouter{
		Router:     root.PathPrefix("/api/paste").Subrouter(),
		DataSource: sqlite.NewPastesDBConnection(),
	}
	pasteRouter.Register()
	return &Server{
		RootRouter:   root,
		PasteService: &pasteRouter,
	}
}
