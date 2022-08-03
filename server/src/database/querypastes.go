package database

import (
	"database/sql"
	dbmodel "server/src/database/model"
	"server/src/routes/model"
	"strings"
	"time"

	"github.com/google/uuid"
)

func (d *PastesDB) CreatePaste(p model.PasteCreateRequest) (*model.PasteIdentifier, error) {
	pasteId := strings.ReplaceAll(uuid.NewString(), "-", "")
	editKey := ""
	if p.Editable {
		editKey = strings.ReplaceAll(uuid.NewString(), "-", "")
	}
	createdAt := time.Now().Unix()
	expiry := sql.NullInt64{
		Int64: createdAt + p.MinutesDuration*60,
		Valid: p.MinutesDuration > 0,
	}
	dbPasteModel := dbmodel.Paste{
		Id:          pasteId,
		EditKey:     editKey,
		Editable:    p.Editable,
		CreatedAt:   createdAt,
		Expiry:      expiry,
		Headers:     p.Headers,
		ContentBody: p.EncryptedContent,
	}
	err := d.createPaste(dbPasteModel)
	if err != nil {
		return nil, err
	}
	m := model.PasteIdentifier{
		Id:      pasteId,
		EditKey: editKey,
	}
	return &m, nil
}
