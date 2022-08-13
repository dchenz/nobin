package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

type PasteResponse struct {
	ID        string `json:"id"`
	Editable  bool   `json:"editable"`
	CreatedAt int64  `json:"created_at"`
	Duration  int    `json:"duration"`
	Header    string `json:"header"`
	Body      string `json:"body"`
}

type PasteCreateRequest struct {
	Header   string `json:"header"`
	Body     string `json:"body"`
	Duration int    `json:"duration"`
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
	if m.Header == "" {
		return fmt.Errorf("missing paste header")
	}
	if m.Body == "" {
		return fmt.Errorf("missing paste body")
	}
	if m.Duration != 0 && !(m.Duration >= 5 && m.Duration <= 60*24*365) {
		return fmt.Errorf("duration must be in range [5, 525600]")
	}
	return nil
}

type PasteUpdateRequest struct {
	Header string `json:"header"`
	Body   string `json:"body"`
}

func (m *PasteUpdateRequest) Parse(r *http.Request) error {
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

func (m *PasteUpdateRequest) Validate() error {
	if m.Header == "" {
		return fmt.Errorf("missing paste header")
	}
	if m.Body == "" {
		return fmt.Errorf("missing paste body")
	}
	return nil
}

type PasteIdentifier struct {
	ID      string `json:"id"`
	EditKey string `json:"edit_key"`
}

func (m *PasteIdentifier) Parse(r *http.Request) error {
	pathVars := mux.Vars(r)
	if pasteID, exists := pathVars["id"]; exists {
		m.ID = pasteID
	}
	queryParams := r.URL.Query()
	m.EditKey = queryParams.Get("edit_key")
	return m.Validate()
}

func (m *PasteIdentifier) Validate() error {
	if m.ID == "" {
		return fmt.Errorf("missing paste ID")
	}
	return nil
}
