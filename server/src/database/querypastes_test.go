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
		Header:   "test",
		Body:     "hello world",
		Editable: true,
		Duration: 100,
	}

	ref, err := d.CreatePaste(request)
	if err != nil {
		assert.FailNow(t, "unexpected error: "+err.Error())
	}
	assert.Equal(t, len(ref.Id), 32)
	assert.Equal(t, len(ref.EditKey), 32)

	paste, err := d.GetPaste(*ref)
	if err != nil {
		assert.FailNow(t, "unexpected error: "+err.Error())
	}
	assert.Equal(t, ref.Id, paste.Id)
	assert.Equal(t, request.Editable, paste.Editable)
	assert.GreaterOrEqual(t, time.Now().Unix(), paste.CreatedAt)
	assert.Equal(t, request.Duration, paste.Duration)
	assert.Equal(t, request.Header, paste.Header)
	assert.Equal(t, request.Body, paste.Body)
	assert.True(t, paste.Editable)

	// CASE: Non-editable paste, no expiry.
	request = model.PasteCreateRequest{
		Header:   "test",
		Body:     "hello world",
		Editable: false,
		Duration: 0,
	}

	ref, err = d.CreatePaste(request)
	if err != nil {
		assert.FailNow(t, "unexpected error: "+err.Error())
	}
	assert.Equal(t, len(ref.Id), 32)
	assert.Equal(t, len(ref.EditKey), 0)

	paste, err = d.GetPaste(*ref)
	if err != nil {
		assert.FailNow(t, "unexpected error: "+err.Error())
	}
	assert.Equal(t, ref.Id, paste.Id)
	assert.Equal(t, request.Editable, paste.Editable)
	assert.GreaterOrEqual(t, time.Now().Unix(), paste.CreatedAt)
	assert.Equal(t, request.Duration, paste.Duration)
	assert.Equal(t, request.Header, paste.Header)
	assert.Equal(t, request.Body, paste.Body)
	assert.False(t, paste.Editable)

	// CASE: Expired paste.
	longTimeAgo := addMinutesToDate(time.Now(), -60)
	err = d.createPaste(dbmodel.Paste{
		Id: "abc",
		EditKey: sql.NullString{
			Valid: false,
		},
		CreatedAt: longTimeAgo,
		Expiry: sql.NullTime{
			Time:  longTimeAgo,
			Valid: true,
		},
		Header: "test",
		Body:   "hello world",
	})
	if err != nil {
		assert.FailNow(t, "unexpected error: "+err.Error())
	}
	// Expect no rows returned.
	p, err := d.getPaste("abc")
	assert.Nil(t, p)
	assert.Error(t, err, sql.ErrNoRows)
}
