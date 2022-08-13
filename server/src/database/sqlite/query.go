package sqlite

import (
	"database/sql"
	dbmodel "server/src/database/sqlite/model"
	"server/src/routes/model"
)

func (d *PastesDB) GetPaste(ref model.PasteIdentifier) (*model.PasteResponse, error) {
	p, err := d.getPaste(ref.ID)
	if err != nil {
		return nil, err
	}
	// Paste has expired.
	if p.Expiry.Valid && !(utcNow().Before(p.Expiry.Time)) {
		return nil, sql.ErrNoRows
	}
	// Convert expiry date back into duration minutes.
	var pasteDuration int
	if p.Expiry.Valid {
		pasteDuration = minutesBetweenDates(p.Expiry.Time, p.CreatedAt)
	}
	// Not editable if keys don't match.
	paste := model.PasteResponse{
		ID:        p.ID,
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
		ID:        createUUID(),
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
		ID:      p.ID,
		EditKey: p.EditKey,
	}
	return &m, nil
}

func (d *PastesDB) UpdatePaste(ref model.PasteIdentifier, p model.PasteUpdateRequest) (bool, error) {
	authorized, err := d.hasValidEditKey(ref.ID, ref.EditKey)
	if err != nil || !authorized {
		return authorized, err
	}
	return true, d.updatePaste(ref.ID, p.Header, p.Body)
}

func (d *PastesDB) DeletePaste(ref model.PasteIdentifier) (bool, error) {
	authorized, err := d.hasValidEditKey(ref.ID, ref.EditKey)
	if err != nil || !authorized {
		return authorized, err
	}
	return true, d.deletePaste(ref.ID)
}
