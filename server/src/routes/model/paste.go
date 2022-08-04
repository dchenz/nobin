package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

type PasteResponse struct {
	Id          string `json:"id"`
	Editable    bool   `json:"editable"`
	CreatedAt   int64  `json:"created_at"`
	Expiry      *int64 `json:"expiry"`
	Headers     string `json:"headers"`
	ContentBody string `json:"content"`
}

type PasteCreateRequest struct {
	Headers          string `json:"headers"`
	EncryptedContent string `json:"content"`
	MinutesDuration  int64  `json:"duration"`
	Editable         bool   `json:"editable"`
}

func (m *PasteCreateRequest) Parse(r *http.Request) error {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return fmt.Errorf("expected body")
	}
	err = json.Unmarshal(body, m)
	if err != nil {
		return err
	}
	return m.Validate()
}

func (m *PasteCreateRequest) Validate() error {
	if m.Headers == "" {
		return fmt.Errorf("missing/invalid value for attribute 'headers'")
	}
	if m.EncryptedContent == "" {
		return fmt.Errorf("missing/invalid value for attribute 'content'")
	}
	if m.MinutesDuration < 0 {
		return fmt.Errorf("missing/invalid value for attribute 'duration'")
	}
	return nil
}

type PasteIdentifier struct {
	Id      string `json:"id"`
	EditKey string `json:"edit_key"`
}

func (m *PasteIdentifier) Parse(r *http.Request) error {
	pathVars := mux.Vars(r)
	if pasteId, exists := pathVars["id"]; exists && len(pasteId) > 0 {
		m.Id = pasteId
	}
	// Edit key is not used by the read handler.
	queryParams := r.URL.Query()
	if editKey, exists := queryParams["edit_key"]; exists && len(editKey) > 0 {
		m.EditKey = editKey[0]
	}
	return m.Validate()
}

func (m *PasteIdentifier) Validate() error {
	if m.Id == "" {
		return fmt.Errorf("missing/invalid value for path variable 'id'")
	}
	return nil
}
