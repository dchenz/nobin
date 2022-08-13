package logging

import (
	"os"

	log "github.com/sirupsen/logrus"
)

func init() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp: true,
	})
	// In production, write logs to file instead of standard output.
	if os.Getenv("GO_ENVIRONMENT") == "production" {
		logPath := os.Getenv("GO_LOG_PATH")
		if logPath == "" {
			logPath = "server.log"
		}
		fileMode := os.O_CREATE | os.O_APPEND | os.O_WRONLY
		if out, err := os.OpenFile(logPath, fileMode, 0600); err == nil {
			log.SetOutput(out)
		}
	}
}

func Log(format string, args ...interface{}) {
	log.Infof(format, args...)
}

func Warn(format string, args ...interface{}) {
	log.Warnf(format, args...)
}

func Error(format string, args ...interface{}) {
	log.Errorf(format, args...)
}

func Panic(format string, args ...interface{}) {
	log.Panicf(format, args...)
}
