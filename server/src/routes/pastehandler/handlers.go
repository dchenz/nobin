package pastehandler

import (
	"net/http"
	"server/src/routes/model"
	"server/src/server"
)

func Register(s *server.Runtime) {
	r := s.Router.PathPrefix("/paste").Subrouter()
	r.Handle("/{id}", handleReadPaste(s)).Methods("GET")
	r.Handle("", handleCreatePaste(s)).Methods("POST")
	r.Handle("/{id}", handleDeletePaste(s)).Methods("DELETE")
}

func handleReadPaste(s *server.Runtime) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}

func handleCreatePaste(s *server.Runtime) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRequest model.PasteCreateRequest
		err := pasteRequest.Parse(r)
		if err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		response, err := s.PasteRepo.CreatePaste(pasteRequest)
		if err != nil {
			RespondFail(w, http.StatusInternalServerError, err.Error())
			return
		}
		RespondSuccess(w, response)
	})
}

func handleDeletePaste(s *server.Runtime) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}
