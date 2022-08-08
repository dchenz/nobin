package database

import (
	dbmodel "server/src/database/model"
	"time"
)

func (d *PastesDB) getPaste(id string) (*dbmodel.Paste, error) {
	q := `SELECT
			id,
			edit_key,
			created_at,
			expiry,
			header,
			body
		  FROM nobin_paste
		  WHERE id = ? AND (expiry IS NULL OR expiry > ?)`
	row := d.Connection.QueryRow(q, id, time.Now())
	var p dbmodel.Paste
	err := row.Scan(
		&p.Id,
		&p.EditKey,
		&p.CreatedAt,
		&p.Expiry,
		&p.Header,
		&p.Body,
	)
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (d *PastesDB) createPaste(p dbmodel.Paste) error {
	q := `INSERT INTO nobin_paste (
		    id,
			edit_key,
			created_at,
			expiry,
			header,
			body
		  )
		  VALUES (?, ?, ?, ?, ?, ?)`
	_, err := d.Connection.Exec(
		q,
		p.Id,
		p.EditKey,
		p.CreatedAt,
		p.Expiry,
		p.Header,
		p.Body,
	)
	return err
}
