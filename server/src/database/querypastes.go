package database

import (
	"database/sql"
	dbmodel "server/src/database/model"
	"server/src/routes/model"
	"time"
)

func (d *PastesDB) GetPaste(ref model.PasteIdentifier) (*model.PasteResponse, error) {
	p, err := d.getPaste(ref.Id)
	if err != nil {
		return nil, err
	}
	var pasteDuration int
	if p.Expiry.Valid {
		pasteDuration = minutesBetweenDates(p.Expiry.Time, p.CreatedAt)
	}
	// Not editable if paste has no edit key or if keys don't match.
	canEdit := p.EditKey.Valid && p.EditKey.String == ref.EditKey
	paste := model.PasteResponse{
		Id:        p.Id,
		Editable:  canEdit,
		CreatedAt: p.CreatedAt.Unix(),
		Duration:  pasteDuration,
		Header:    p.Header,
		Body:      p.Body,
	}
	return &paste, nil
}

func (d *PastesDB) CreatePaste(paste model.PasteCreateRequest) (*model.PasteIdentifier, error) {
	pasteID := createUUID()
	editKey := sql.NullString{
		Valid: false,
	}
	if paste.Editable {
		editKey.String = createUUID()
		editKey.Valid = true
	}
	now := time.Now()
	expiry := sql.NullTime{
		Time:  addMinutesToDate(now, paste.Duration),
		Valid: paste.Duration > 0,
	}
	p := dbmodel.Paste{
		Id:        pasteID,
		EditKey:   editKey,
		CreatedAt: now,
		Expiry:    expiry,
		Header:    paste.Header,
		Body:      paste.Body,
	}
	if err := d.createPaste(p); err != nil {
		return nil, err
	}
	m := model.PasteIdentifier{
		Id:      pasteID,
		EditKey: editKey.String,
	}
	return &m, nil
}
