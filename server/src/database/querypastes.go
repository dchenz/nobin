package database

import (
	"database/sql"
	dbmodel "server/src/database/model"
	"server/src/routes/model"
	"strings"
	"time"

	"github.com/google/uuid"
)

func (d *PastesDB) GetPaste(ref model.PasteIdentifier) (*model.PasteResponse, error) {
	pasteEntity, err := d.getPaste(ref.Id)
	if err != nil {
		return nil, err
	}
	// Not editable if the provided edit key does not match.
	if pasteEntity.Editable && pasteEntity.EditKey != ref.EditKey {
		pasteEntity.Editable = false
	}
	var expiryTime *int64
	if pasteEntity.Expiry.Valid {
		t := pasteEntity.Expiry.Time.Unix()
		expiryTime = &t
	}
	paste := model.PasteResponse{
		Id:          pasteEntity.Id,
		Editable:    pasteEntity.Editable,
		CreatedAt:   pasteEntity.CreatedAt.Unix(),
		Expiry:      expiryTime,
		Headers:     pasteEntity.Headers,
		ContentBody: pasteEntity.ContentBody,
	}
	return &paste, nil
}

func (d *PastesDB) CreatePaste(p model.PasteCreateRequest) (*model.PasteIdentifier, error) {
	pasteId := strings.ReplaceAll(uuid.NewString(), "-", "")
	editKey := ""
	if p.Editable {
		editKey = strings.ReplaceAll(uuid.NewString(), "-", "")
	}
	createdAt := time.Now()
	expiry := sql.NullTime{
		Time:  createdAt.Add(time.Duration(time.Minute * time.Duration(p.MinutesDuration))),
		Valid: p.MinutesDuration > 0,
	}
	pasteEntity := dbmodel.Paste{
		Id:          pasteId,
		EditKey:     editKey,
		Editable:    p.Editable,
		CreatedAt:   createdAt,
		Expiry:      expiry,
		Headers:     p.Headers,
		ContentBody: p.EncryptedContent,
	}
	err := d.createPaste(pasteEntity)
	if err != nil {
		return nil, err
	}
	m := model.PasteIdentifier{
		Id:      pasteId,
		EditKey: editKey,
	}
	return &m, nil
}
