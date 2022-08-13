package middleware

import (
	"net/http"
	"server/src/logging"
)

func LoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logging.HTTPRequest(r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
