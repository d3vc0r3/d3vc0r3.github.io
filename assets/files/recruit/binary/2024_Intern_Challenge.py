from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import winreg

class RegistryHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        params = parse_qs(post_data)

        if 'key_path' not in params:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Error: 'key_path' parameter is missing in the POST request.")
            return

        if 'value' not in params and 'value_name' not in params:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Error: 'value' parameter is missing in the POST request.")
            return

        if 'type' not in params:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Error: 'value' parameter is missing in the POST request.")
            return

        

        if 'value_name' not in params:
            value_name = ""
        else:
            value_name = params['value_name'][0]

        if 'value' not in params:
            value = ""
        else :    
            value = params['value'][0]

        key_path = params['key_path'][0]
        reg_type = params['type'][0]

        registry_value = self.write_registry_value(key_path, value_name, value, reg_type)

        self.send_response(200)
        self.end_headers()

        response = f"done!"
        self.wfile.write(response.encode('utf-8'))

    def write_registry_value(self, key_path, value_name, value, reg_type):
        try:
            key = winreg.CreateKey(winreg.HKEY_CURRENT_USER, key_path)
            if reg_type == "1":
                winreg.SetValueEx(key, value_name, 0, winreg.REG_DWORD, int(value))
            else :
                winreg.SetValueEx(key, value_name, 0, winreg.REG_SZ, value)


            winreg.CloseKey(key)
        except Exception as e:
            return f"Error: {e}"

def run(server_class=HTTPServer, handler_class=RegistryHandler, addr="127.0.0.1", port=5566):
    server_address = (addr, port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running at http://{addr}:{port}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
