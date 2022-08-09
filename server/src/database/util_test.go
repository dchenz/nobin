package database

import (
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestAddMinutesToDate(t *testing.T) {
	a := time.Now()
	b := a.Add(5 * time.Minute)
	assert.Equal(t, b, addMinutesToDate(a, 5))
	a = time.Now()
	b = a.Add(-5 * time.Minute)
	assert.Equal(t, b, addMinutesToDate(a, -5))
	a = time.Now()
	assert.Equal(t, a, addMinutesToDate(a, 0))
}

func TestMinutesBetweenDates(t *testing.T) {
	a := time.Now()
	b := a.Add(5 * time.Minute)
	assert.Equal(t, 5, minutesBetweenDates(a, b))
	assert.Equal(t, 5, minutesBetweenDates(b, a))
	assert.Equal(t, 0, minutesBetweenDates(a, a))
}

func TestCreateUUID(t *testing.T) {
	id := createUUID()
	assert.Equal(t, 32, len(id))
}

func TestUTCNow(t *testing.T) {
	now := utcNow()
	assert.True(t, strings.HasSuffix(now.String(), "+0000 UTC"))
}
