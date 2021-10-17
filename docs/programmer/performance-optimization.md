# 性能优化
## Windows
微软官方指南:
- [Windows Performance Monitor Overview](https://techcommunity.microsoft.com/t5/ask-the-performance-team/windows-performance-monitor-overview/ba-p/375481)
- [Measuring Multiprocessor System Activity](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-2000-server/cc938647(v=technet.10))

第三方指南:
- [Windows CPU Metric Guide](https://www.heroix.com/blog/windows-cpu-metric-guide/)
- [How to Generate System Performance Report in Windows 10](https://www.tenforums.com/tutorials/82009-generate-system-performance-report-windows-10-a.html)

## 硬件环境

check CPU core number
- [How to check how many CPUs are there in Linux system](https://www.cyberciti.biz/faq/check-how-many-cpus-are-there-in-linux-system/)
- `grep 'model name' /proc/cpuinfo | wc -l`

## CPU 性能
### CPU Load Average
[What is CPU Load Average](https://community.tenable.com/s/article/What-is-CPU-Load-Average)

Linux
- `top`
- `uptime`

Mac
- `top`
- `uptime`

Win
- `wmic cpu get LoadPercentage` 但只能拿到当前的，不能统计 1min、5min、15min 内的

Win 原生对 load average 的支持不是很好，可以用别的指标替代
- [Powershell scripts to get overall CPU usage from list of servers](https://social.technet.microsoft.com/Forums/windowsserver/en-US/b9d86bdc-9ea8-4659-ae65-4c1b5b86d324/powershell-scripts-to-get-overall-cpu-usage-from-list-of-servers?forum=winserverpowershell)
- [Getting the CPU, memory usage and free disk space using powershell](https://stackoverflow.com/questions/18090657/getting-the-cpu-memory-usage-and-free-disk-space-using-powershell)

### CPU Context Switch

`watch -d cat /proc/interrupts`

```
# 以 10 个线程运行 5 分钟的基准测试，模拟多线程切换的问题
$ sysbench --threads=10 --max-time=300 threads run
```

Linux 上下文切换:
- `vmstat`
- `pidstat -w`

Mac 上下文切换:
- `sc_usage`

Linux 非自愿上下文切换
- `pidstat -w`

Linux 中断
- `watch -d cat /proc/interrupts`
