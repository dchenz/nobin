package pastehandler

import (
	"encoding/json"
	"net/http"
	"server/src/logging"
	"server/src/routes/model"
)

func RespondSuccess(w http.ResponseWriter, data interface{}) {
	logging.HTTPResponse(http.StatusOK, "OK")
	w.Header().Add("Content-Type", "application/json")
	response := model.Response{
		Success: true,
		Data:    data,
	}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		logging.Error("could not encode %v", response)
	}
}

func RespondFail(w http.ResponseWriter, status int, errMsg string) {
	logging.HTTPResponse(status, errMsg)
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	if status == http.StatusInternalServerError {
		errMsg = "Something went wrong on the server..."
	}
	response := model.Response{
		Success: false,
		Data:    errMsg,
	}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		logging.Error("could not encode %v", response)
	}
}
