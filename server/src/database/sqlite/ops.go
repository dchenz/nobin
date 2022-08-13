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

func (d *PastesDB) updatePaste(id string, header string, body string) error {
	q := `UPDATE nobin_paste
		  SET header = ?, body = ?
		  WHERE id = ?`
	_, err := d.Conn.Exec(q, header, body, id)
	return err
}

func (d *PastesDB) deletePaste(id string) error {
	q := `DELETE FROM nobin_paste
		  WHERE id = ?`
	_, err := d.Conn.Exec(q, id)
	return err
}

func (d *PastesDB) hasValidEditKey(id string, key string) (bool, error) {
	q := `SELECT edit_key
	      FROM nobin_paste
		  WHERE id = ?`
	row := d.Conn.QueryRow(q, id)
	var existingEditKey string
	if err := row.Scan(&existingEditKey); err != nil {
		return false, err
	}
	return existingEditKey == key, nil
}
