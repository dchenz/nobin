package pastehandler

import (
	"database/sql"
	"errors"
	"net/http"
	"server/src/routes/model"
)

func handleReadPaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRef model.PasteIdentifier
		if err := pasteRef.Parse(r); err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		response, err := px.DataSource.GetPaste(pasteRef)
		if errors.Is(err, sql.ErrNoRows) {
			RespondFail(w, http.StatusNotFound, "Paste not found")
			return
		}
		if err != nil {
			RespondFail(w, http.StatusInternalServerError, err.Error())
			return
		}
		RespondSuccess(w, response)
	})
}

func handleCreatePaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRequest model.PasteCreateRequest
		if err := pasteRequest.Parse(r); err != nil {
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
		var pasteRef model.PasteIdentifier
		if err := pasteRef.Parse(r); err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		var pasteRequest model.PasteUpdateRequest
		if err := pasteRequest.Parse(r); err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		canEdit, err := px.DataSource.UpdatePaste(pasteRef, pasteRequest)
		if errors.Is(err, sql.ErrNoRows) {
			RespondFail(w, http.StatusNotFound, "Paste not found")
			return
		}
		if err != nil {
			RespondFail(w, http.StatusInternalServerError, err.Error())
			return
		}
		if !canEdit {
			RespondFail(w, http.StatusForbidden, "Invalid authorization key")
			return
		}
		RespondSuccess(w, "Updated "+pasteRef.ID)
	})
}

func handleDeletePaste(px *PasteRouter) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var pasteRef model.PasteIdentifier
		if err := pasteRef.Parse(r); err != nil {
			RespondFail(w, http.StatusBadRequest, err.Error())
			return
		}
		canDelete, err := px.DataSource.DeletePaste(pasteRef)
		if errors.Is(err, sql.ErrNoRows) {
			RespondFail(w, http.StatusNotFound, "Paste not found")
			return
		}
		if err != nil {
			RespondFail(w, http.StatusInternalServerError, err.Error())
			return
		}
		if !canDelete {
			RespondFail(w, http.StatusForbidden, "Invalid authorization key")
			return
		}
		RespondSuccess(w, "Deleted "+pasteRef.ID)
	})
}
