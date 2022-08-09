package pastehandler

import (
	"net/http"
	"server/src/routes/model"
	"server/src/server"
)

func Register(s *server.Runtime) {
	r := s.Router.PathPrefix("/api/paste").Subrouter()
	r.Handle("/{id}", handleReadPaste(s)).Methods("GET")
	r.Handle("", handleCreatePaste(s)).Methods("POST")
	r.Handle("/{id}", handleUpdatePaste(s)).Methods("POST")
	r.Handle("/{id}", handleDeletePaste(s)).Methods("DELETE")
}

func handleReadPaste(s *server.Runtime) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRef model.PasteIdentifier
		err := pasteRef.Parse(r)
		if err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		response, err := s.PasteRepo.GetPaste(pasteRef)
		if err != nil {
			RespondFail(w, http.StatusInternalServerError, err.Error())
			return
		}
		if response == nil {
			RespondFail(w, http.StatusNotFound, "paste not found")
			return
		}
		RespondSuccess(w, response)
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

func handleUpdatePaste(s *server.Runtime) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}

func handleDeletePaste(s *server.Runtime) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}
