from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main():
    server = ThreadingHTTPServer(("127.0.0.1", 8000), NoCacheRequestHandler)
    print("Serving on http://127.0.0.1:8000 with cache disabled")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
