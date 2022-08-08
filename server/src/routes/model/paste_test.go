package model

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPasteCreateRequest(t *testing.T) {
	// Good case.
	m := PasteCreateRequest{
		Header:   "test",
		Body:     "hello world",
		Editable: false,
		Duration: 0,
	}
	assert.Nil(t, m.Validate())
	// Bad case: Negative duration is invalid.
	m = PasteCreateRequest{
		Header:   "test",
		Body:     "hello world",
		Editable: false,
		Duration: -1,
	}
	assert.EqualError(t, m.Validate(), "duration must be in range [5, 525600]")
	// Bad case: Duration in range [1, 4] is invalid.
	m = PasteCreateRequest{
		Header:   "test",
		Body:     "hello world",
		Editable: false,
		Duration: 4,
	}
	assert.EqualError(t, m.Validate(), "duration must be in range [5, 525600]")
	// Bad case: Empty header is invalid.
	m = PasteCreateRequest{
		Header:   "",
		Body:     "hello world",
		Editable: false,
		Duration: 10,
	}
	assert.EqualError(t, m.Validate(), "missing paste header")
	// Bad case: Empty content is invalid.
	m = PasteCreateRequest{
		Header:   "test",
		Body:     "",
		Editable: false,
		Duration: 10,
	}
	assert.EqualError(t, m.Validate(), "missing paste body")
}

func TestPasteIdentifier(t *testing.T) {
	// Good case.
	m := PasteIdentifier{
		Id:      "hello",
		EditKey: "",
	}
	assert.Nil(t, m.Validate())
	// Bad case: Empty ID field should never happen.
	m = PasteIdentifier{
		Id:      "",
		EditKey: "can be anything",
	}
	assert.EqualError(t, m.Validate(), "missing paste ID")
}
