package database

import (
	"database/sql"
	dbmodel "server/src/database/model"
	"server/src/routes/model"
)

func (d *PastesDB) GetPaste(ref model.PasteIdentifier) (*model.PasteResponse, error) {
	p, err := d.getPaste(ref.Id)
	// Paste doesn't exist.
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	// Paste has expired.
	if p.Expiry.Valid && !(utcNow().Before(p.Expiry.Time)) {
		return nil, nil
	}
	// Convert expiry date back into duration minutes.
	var pasteDuration int
	if p.Expiry.Valid {
		pasteDuration = minutesBetweenDates(p.Expiry.Time, p.CreatedAt)
	}
	// Not editable if keys don't match.
	paste := model.PasteResponse{
		Id:        p.Id,
		Editable:  p.EditKey == ref.EditKey,
		CreatedAt: p.CreatedAt.Unix(),
		Duration:  pasteDuration,
		Header:    p.Header,
		Body:      p.Body,
	}
	return &paste, nil
}

func (d *PastesDB) CreatePaste(paste model.PasteCreateRequest) (*model.PasteIdentifier, error) {
	now := utcNow()
	expiry := sql.NullTime{
		Time:  addMinutesToDate(now, paste.Duration),
		Valid: paste.Duration > 0,
	}
	p := dbmodel.Paste{
		Id:        createUUID(),
		EditKey:   createUUID(),
		CreatedAt: now,
		Expiry:    expiry,
		Header:    paste.Header,
		Body:      paste.Body,
	}
	if err := d.createPaste(p); err != nil {
		return nil, err
	}
	m := model.PasteIdentifier{
		Id:      p.Id,
		EditKey: p.EditKey,
	}
	return &m, nil
}
