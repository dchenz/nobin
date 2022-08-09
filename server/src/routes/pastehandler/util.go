package pastehandler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/src/routes/model"
)

func RespondSuccess(w http.ResponseWriter, data interface{}) {
	w.Header().Add("Content-Type", "application/json")
	err := json.NewEncoder(w).Encode(model.Response{
		Success: true,
		Data:    data,
	})
	if err != nil {
		fmt.Println("could not encode", data)
	}
}

func RespondFail(w http.ResponseWriter, status int, errMsg string) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	// if status == http.StatusInternalServerError {
	// 	errMsg = "Something went wrong on the server..."
	// }
	json.NewEncoder(w).Encode(model.Response{
		Success: false,
		Data:    errMsg,
	})
}
