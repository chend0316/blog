# HTTPS 抓包实验

## 使用 tcpdump + Wireshark 抓包
先打开一个命令行窗口
```
sudo tcpdump -i en0 -v 'host www.google.com and port 443' -w https.cap
```

再新建一个命令行窗口
```
curl https://www.google.com
```

在看到类似如下内容后 CTRL + C 停止抓包
```
tcpdump: listening on en0, link-type EN10MB (Ethernet), capture size 262144 bytes
^C49 packets captured
719 packets received by filter
0 packets dropped by kernel
```

接着使用 Wireshark 打开刚才抓的 https.cap，在 filter 中输入 tls，可以看到五个重要的握手消息。

## 参考资料
- https://time.geekbang.org/column/article/135864
- http://www.moserware.com/2009/06/first-few-milliseconds-of-https.html
