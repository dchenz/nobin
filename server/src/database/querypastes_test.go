package database

import (
	"database/sql"
	dbmodel "server/src/database/model"
	"server/src/routes/model"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCreateGetPaste(t *testing.T) {
	d := connectToTestDB()

	// CASE: Editable paste, has expiry.
	request := model.PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "hello world",
		Editable:         true,
		MinutesDuration:  100,
	}
	// Create the paste.
	result, err := d.CreatePaste(request)
	assert.Nil(t, err)
	assert.Equal(t, len(result.Id), 32)
	assert.Equal(t, len(result.EditKey), 32)

	// Get paste again.
	retrieved, err := d.getPaste(result.Id)
	assert.Nil(t, err)
	assert.Equal(t, result.Id, retrieved.Id)
	assert.Equal(t, result.EditKey, retrieved.EditKey)
	// Should be editable.
	assert.True(t, retrieved.Editable)
	assert.Greater(t, time.Now(), retrieved.CreatedAt)
	// Expiry should be set to 100 minutes more than creation time.
	expectedExpiry := retrieved.CreatedAt.Add(time.Minute * time.Duration(request.MinutesDuration))
	assert.Equal(t, expectedExpiry, retrieved.Expiry.Time)
	assert.Equal(t, request.Headers, retrieved.Headers)
	assert.Equal(t, request.EncryptedContent, retrieved.ContentBody)

	// CASE: Non-editable paste, no expiry.
	request = model.PasteCreateRequest{
		Headers:          "test",
		EncryptedContent: "hello world",
		Editable:         false,
		MinutesDuration:  0,
	}
	// Create the paste.
	result, err = d.CreatePaste(request)
	assert.Nil(t, err)
	assert.Equal(t, len(result.Id), 32)
	assert.Equal(t, result.EditKey, "")

	// Get paste again.
	retrieved, err = d.getPaste(result.Id)
	assert.Nil(t, err)
	assert.Equal(t, result.Id, retrieved.Id)
	assert.Equal(t, result.EditKey, retrieved.EditKey)
	// Should not be editable.
	assert.False(t, retrieved.Editable)
	assert.Greater(t, time.Now(), retrieved.CreatedAt)
	// Expiry should be NULL since MinutesDuration is 0.
	assert.False(t, retrieved.Expiry.Valid)
	assert.Equal(t, request.Headers, retrieved.Headers)
	assert.Equal(t, request.EncryptedContent, retrieved.ContentBody)

	// CASE: Expired paste.
	longTimeAgo := time.Now().Add(time.Hour * time.Duration(-4))
	err = d.createPaste(dbmodel.Paste{
		Id:        "abc",
		EditKey:   "hello",
		Editable:  true,
		CreatedAt: longTimeAgo,
		Expiry: sql.NullTime{
			Time:  longTimeAgo,
			Valid: true,
		},
		Headers:     "test",
		ContentBody: "hello world",
	})
	assert.Nil(t, err)
	// Expect no rows returned.
	retrieved, err = d.getPaste("abc")
	assert.Nil(t, retrieved)
	assert.Error(t, err, sql.ErrNoRows)
}
