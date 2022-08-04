package model

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPasteCreateRequest(t *testing.T) {
	// Good case.
	m := PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "hello world",
		Editable:         false,
		MinutesDuration:  0,
	}
	assert.Nil(t, m.Validate())
	// Bad case: Negative duration is invalid.
	m = PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "hello world",
		Editable:         false,
		MinutesDuration:  -1,
	}
	assert.EqualError(t, m.Validate(), "missing/invalid value for attribute 'duration'")
	// Bad case: Empty header is invalid.
	m = PasteCreateRequest{
		Headers:          "",
		EncryptedContent: "hello world",
		Editable:         false,
		MinutesDuration:  10,
	}
	assert.EqualError(t, m.Validate(), "missing/invalid value for attribute 'headers'")
	// Bad case: Empty content is invalid.
	m = PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "",
		Editable:         false,
		MinutesDuration:  10,
	}
	assert.EqualError(t, m.Validate(), "missing/invalid value for attribute 'content'")
}

func TestPasteIdentifier(t *testing.T) {
	// Good case.
	m := PasteIdentifier{
		Id:      "hello",
		EditKey: "test",
	}
	assert.Nil(t, m.Validate())
	// Bad case: Empty ID field should never happen with Mux.
	m = PasteIdentifier{
		Id:      "",
		EditKey: "test",
	}
	assert.EqualError(t, m.Validate(), "missing/invalid value for path variable 'id'")
}
