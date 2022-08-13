package sqlite

import (
	"database/sql"
	dbmodel "server/src/database/sqlite/model"
	"server/src/routes/model"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateGetPaste(t *testing.T) {
	d := testPasteDBConnection()

	cases := []struct {
		request       model.PasteCreateRequest
		expectedPaste model.PasteResponse
	}{
		{
			request: model.PasteCreateRequest{
				Header:   "test",
				Body:     "hello world",
				Duration: 100,
			},
			expectedPaste: model.PasteResponse{
				Header:   "test",
				Body:     "hello world",
				Duration: 100,
			},
		},
		{
			request: model.PasteCreateRequest{
				Header:   "test",
				Body:     "hello world",
				Duration: 0,
			},
			expectedPaste: model.PasteResponse{
				Header:   "test",
				Body:     "hello world",
				Duration: 0,
			},
		},
	}

	for _, tc := range cases {
		ref, err := d.CreatePaste(tc.request)
		if err != nil {
			assert.FailNow(t, "unexpected error: "+err.Error())
		}
		// All pastes are editable and should return an ID and edit key.
		assert.Equal(t, len(ref.ID), 32)
		assert.Equal(t, len(ref.EditKey), 32)
		// Test the business-logic functions.
		paste, err := d.GetPaste(*ref)
		if err != nil {
			assert.FailNow(t, "unexpected error: "+err.Error())
		}
		assert.Equal(t, ref.ID, paste.ID)
		assert.True(t, paste.Editable)
		assert.GreaterOrEqual(t, utcNow().Unix(), paste.CreatedAt)
		assert.Equal(t, tc.request.Duration, paste.Duration)
		assert.Equal(t, tc.request.Header, paste.Header)
		assert.Equal(t, tc.request.Body, paste.Body)
		// Test the database functions.
		row, err := d.getPaste(ref.ID)
		if err != nil {
			assert.FailNow(t, "unexpected error: "+err.Error())
		}
		assert.Equal(t, ref.ID, row.ID)
		assert.Equal(t, ref.EditKey, row.EditKey)
		assert.GreaterOrEqual(t, utcNow(), row.CreatedAt)
		if tc.request.Duration == 0 {
			assert.False(t, row.Expiry.Valid)
		} else {
			assert.True(t, row.Expiry.Valid)
			assert.Equal(t, addMinutesToDate(row.CreatedAt, tc.request.Duration), row.Expiry.Time)
		}
		assert.Equal(t, tc.request.Header, row.Header)
		assert.Equal(t, tc.request.Body, row.Body)
	}
}

func TestExpiredPastes(t *testing.T) {
	d := testPasteDBConnection()

	cases := []struct {
		duration       int
		minutesElapsed int
		expectExpired  bool
	}{
		{
			duration:       0, // Infinite duration
			minutesElapsed: 10,
			expectExpired:  false,
		},
		{
			duration:       0, // Infinite duration
			minutesElapsed: 0,
			expectExpired:  false,
		},
		{
			duration:       5,
			minutesElapsed: 5,
			expectExpired:  true,
		},
		{
			duration:       5,
			minutesElapsed: 10,
			expectExpired:  true,
		},
		{
			duration:       5,
			minutesElapsed: 0,
			expectExpired:  false,
		},
		{
			duration:       5,
			minutesElapsed: 4,
			expectExpired:  false,
		},
		{
			duration:       300,
			minutesElapsed: 301,
			expectExpired:  true,
		},
	}

	for _, tc := range cases {
		pastCreateTime := addMinutesToDate(utcNow(), -tc.minutesElapsed)
		ref := model.PasteIdentifier{
			ID:      createUUID(),
			EditKey: createUUID(),
		}
		err := d.createPaste(dbmodel.Paste{
			ID:        ref.ID,
			EditKey:   ref.EditKey,
			CreatedAt: pastCreateTime,
			Expiry: sql.NullTime{
				Time:  addMinutesToDate(pastCreateTime, tc.duration),
				Valid: tc.duration > 0,
			},
			Header: "test",
			Body:   "hello world",
		})
		if err != nil {
			assert.FailNow(t, "unexpected error: "+err.Error())
		}
		p, err := d.GetPaste(ref)
		assert.Nil(t, err)
		if tc.expectExpired {
			assert.Nil(t, p)
		} else {
			assert.Equal(t, p.ID, ref.ID)
		}
	}
}
