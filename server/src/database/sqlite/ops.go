package sqlite

import (
	dbmodel "server/src/database/sqlite/model"
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
		  WHERE id = ?`
	row := d.Conn.QueryRow(q, id)
	var p dbmodel.Paste
	err := row.Scan(
		&p.ID,
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
	_, err := d.Conn.Exec(
		q,
		p.ID,
		p.EditKey,
		p.CreatedAt,
		p.Expiry,
		p.Header,
		p.Body,
	)
	return err
}
