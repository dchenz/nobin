package logging

func HTTPRequest(method string, path string) {
	Log("%s %s", method, path)
}

func HTTPResponse(status int, data interface{}) {
	if status >= 200 && status < 300 {
		Log("[%d] - %v", status, data)
	} else {
		Warn("[%d] - %v", status, data)
	}
}
