package model

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

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
