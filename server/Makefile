BINARY_OUT=server.out

include .env

all: build

build:
	@go build -o ${BINARY_OUT} main.go

run:
	@godotenv -f .env go run main.go

sqlite:
	@python3 scripts/createdb_sqlite.py ${GO_SQLITE_PATH}

test:
	@python3 scripts/createdb_sqlite.py ${GO_SQLITE_TEST_PATH} --replace
	@godotenv -f .env go test ./...

remove:
	@rm -f ${BINARY_OUT}