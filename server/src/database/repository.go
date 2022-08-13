package database

import (
	"server/src/routes/model"

	_ "github.com/mattn/go-sqlite3"
)

type PasteRepository interface {
	CreatePaste(p model.PasteCreateRequest) (*model.PasteIdentifier, error)
	GetPaste(ref model.PasteIdentifier) (*model.PasteResponse, error)
	// DeletePaste()
}
