# 运维开发工程师
## Linux 操作系统
### 虚拟化
虚拟化技术一共有三种：
- 全虚拟化 (Full virtualization)
- 硬件辅助虚拟化 (Hardware-Assisted Virtualization)，老的 CPU 不支持，需要在 BIOS 里面打开
- 半虚拟化 (Paravirtualization)

硬件辅助虚拟化是需要 CPU 支持的，Intel 可以使用 `grep "vmx" /proc/cpuinfo` 判断是否打开 VT-x，AMD 可以用 `grep "svm" /proc/cpuinfo`。

全虚拟化速度很慢，所以引入了硬件辅助虚拟化技术。半虚拟化技术是让安装在虚拟机上的虚拟机内核软件意识到自己不是跑在物理机上，于是采用一些特别的优化方式。所以半虚拟化技术对于系统内核软件来说不是透明的。

### 容器化
相比虚拟化技术，容器的隔离程度没那么强，也更加轻量。

容器底层是基于 namespace 和 cgroup 实现的。
