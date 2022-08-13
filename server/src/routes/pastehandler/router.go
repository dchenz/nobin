package pastehandler

import (
	"server/src/database"

	"github.com/gorilla/mux"
)

type PasteRouter struct {
	Router     *mux.Router
	DataSource database.PasteRepository
}

func (r *PasteRouter) Register() {
	r.Router.Handle("/{id}", handleReadPaste(r)).Methods("GET")
	r.Router.Handle("", handleCreatePaste(r)).Methods("POST")
	r.Router.Handle("/{id}", handleUpdatePaste(r)).Methods("POST")
	r.Router.Handle("/{id}", handleDeletePaste(r)).Methods("DELETE")
}
