package database

import (
	"strings"
	"time"

	"github.com/google/uuid"
)

func addMinutesToDate(d time.Time, n int) time.Time {
	return d.Add(time.Duration(time.Minute * time.Duration(n)))
}

func minutesBetweenDates(d1, d2 time.Time) int {
	n := int(d1.Sub(d2).Minutes())
	if n < 0 {
		n = -n
	}
	return n
}

func createUUID() string {
	return strings.ReplaceAll(uuid.NewString(), "-", "")
}

func utcNow() time.Time {
	return time.Now().UTC()
}
