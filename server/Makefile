BINARY_OUT=server.out

include .env

all: build

build:
	@go build -o ${BINARY_OUT} main.go

run:
	@go run main.go

sqlite:
	@python3 scripts/createdb_sqlite.py ${GO_SQLITE_PATH}

test:
	@python3 scripts/createdb_sqlite.py ${GO_SQLITE_TEST_PATH} --replace
	@export GO_SQLITE_TEST_PATH=${GO_SQLITE_TEST_PATH}
	@go test ./...