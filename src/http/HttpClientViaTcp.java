import java.io.*;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.nio.charset.StandardCharsets;

public class HttpClientViaTcp {
    public static void main(String[] args) throws IOException {
        Socket s = new Socket();
        SocketAddress sa = new InetSocketAddress("www.hao123.com", 80);
        s.connect(sa, 10000);

        PrintWriter pw = new PrintWriter(new OutputStreamWriter(s.getOutputStream(), StandardCharsets.UTF_8));

        StringBuffer sb = new StringBuffer();
        sb.append("GET /index.html HTTP/1.1\r\n");
        sb.append("Host: www.hao123.com\r\n");
        sb.append("Connection: Keep-Alive\r\n");
        sb.append("\r\n");
        pw.write(sb.toString());
        pw.flush();

        BufferedReader reader = new BufferedReader(new InputStreamReader(s.getInputStream(),
                StandardCharsets.UTF_8));

        reader.lines().forEach(System.out::println);
    }
}
