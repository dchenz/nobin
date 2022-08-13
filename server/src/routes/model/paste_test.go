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
		Duration: 0,
	}
	assert.Nil(t, m.Validate())
	// Bad case: Negative duration is invalid.
	m = PasteCreateRequest{
		Header:   "test",
		Body:     "hello world",
		Duration: -1,
	}
	assert.EqualError(t, m.Validate(), "duration must be in range [5, 525600]")
	// Bad case: Duration in range [1, 4] is invalid.
	m = PasteCreateRequest{
		Header:   "test",
		Body:     "hello world",
		Duration: 4,
	}
	assert.EqualError(t, m.Validate(), "duration must be in range [5, 525600]")
	// Bad case: Empty header is invalid.
	m = PasteCreateRequest{
		Header:   "",
		Body:     "hello world",
		Duration: 10,
	}
	assert.EqualError(t, m.Validate(), "missing paste header")
	// Bad case: Empty content is invalid.
	m = PasteCreateRequest{
		Header:   "test",
		Body:     "",
		Duration: 10,
	}
	assert.EqualError(t, m.Validate(), "missing paste body")
	// Bad case: Missing values.
	m = PasteCreateRequest{}
	assert.EqualError(t, m.Validate(), "missing paste header")
}

func TestPasteIdentifier(t *testing.T) {
	// Good case.
	m := PasteIdentifier{
		ID:      "hello",
		EditKey: "",
	}
	assert.Nil(t, m.Validate())
	// Bad case: Empty ID field should never happen.
	m = PasteIdentifier{
		ID:      "",
		EditKey: "can be anything",
	}
	assert.EqualError(t, m.Validate(), "missing paste ID")
	// Bad case: Missing values.
	m = PasteIdentifier{}
	assert.EqualError(t, m.Validate(), "missing paste ID")
}
