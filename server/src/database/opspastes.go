package database

import (
	dbmodel "server/src/database/model"
)

func (d *PastesDB) createPaste(p dbmodel.Paste) error {
	q := `INSERT INTO nobin_paste (
		    id,
			edit_key,
			can_edit,
			created_at,
			expiry,
			headers,
			content_body
		  )
		  VALUES (?, ?, ?, ?, ?, ?, ?)`
	_, err := d.Connection.Exec(q, p.Id, p.EditKey, p.Editable, p.CreatedAt, p.Expiry, p.Headers, p.ContentBody)
	if err != nil {
		return err
	}
	return nil
}
