package pastehandler

import (
	"net/http"
	"server/src/routes/model"
)

func handleReadPaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRef model.PasteIdentifier
		err := pasteRef.Parse(r)
		if err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		response, err := px.DataSource.GetPaste(pasteRef)
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

func handleCreatePaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRequest model.PasteCreateRequest
		err := pasteRequest.Parse(r)
		if err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		response, err := px.DataSource.CreatePaste(pasteRequest)
		if err != nil {
			RespondFail(w, http.StatusInternalServerError, err.Error())
			return
		}
		RespondSuccess(w, response)
	})
}

func handleUpdatePaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}

func handleDeletePaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	})
}
