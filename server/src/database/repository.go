package database

import "server/src/routes/model"

type PasteRepository interface {
	CreatePaste(p model.PasteCreateRequest) (*model.PasteIdentifier, error)
	// GetPaste(pId string)
	// DeletePaste()
}
