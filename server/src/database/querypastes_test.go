package database

import (
	"server/src/routes/model"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreatePasteEditable(t *testing.T) {
	d := connectToTestDB()

	request := model.PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "hello world",
		Editable:         true,
		MinutesDuration:  100,
	}

	result, err := d.CreatePaste(request)
	assert.Nil(t, err)
	assert.Equal(t, len(result.Id), 32)
	assert.Equal(t, len(result.EditKey), 32)

}

func TestCreatePasteNotEditable(t *testing.T) {
	d := connectToTestDB()

	request := model.PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "hello world",
		Editable:         false,
		MinutesDuration:  100,
	}

	result, err := d.CreatePaste(request)
	assert.Nil(t, err)
	assert.Equal(t, len(result.Id), 32)
	assert.Equal(t, result.EditKey, "")

}
