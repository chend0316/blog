# 环境搭建
## Python
### pip
pip 是用来安装 Python 包的。如果用的是 Python3，那么命令是 `pip3`。

#### 使用 pip 安装 Numpy

1. `pip3 install numpy` 命令安装 Numpy 之后

2. 在代码中导入 Numpy

```python
import numpy as np
```

#### 更多资料

其它常用命令:
- `pip3 list` 查看电脑上安装了哪些包
- `pip3 uninstall <pkg-name>` 卸载包

更多资料:
- `pip3 --help` 查看 pip 的全部用法

### virtualenv
[virtualenv](https://virtualenv.pypa.io/en/latest/) is a tool to create isolated Python environments. 用来隔离 Python 环境的，因为不同项目需要依赖不同的包，为了避免冲突混乱，所以我们想隔离开来。

#### 快速入门
安装：`pip3 install virtualenv`。基本使用步骤如下。

1) 创建一个“虚拟环境”

```
$ virtualenv data-science-venv
created virtual environment CPython3.8.2.final.0-64 in 636ms
  creator CPython3macOsFramework(dest=/Users/chendong/data-science-venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/chendong/Library/Application Support/virtualenv)
    added seed packages: pip==21.2.3, setuptools==57.4.0, wheel==0.37.0
  activators BashActivator,CShellActivator,FishActivator,PowerShellActivator,PythonActivator
```

2) 打开虚拟环境

```
$ source data-science-venv/bin/activate
(data-science-venv) $
```

3) 在虚拟环境安装软件

```
(data-science-venv) $ 
```

4) 关闭虚拟环境

```
$ deactivate
```

5) 销毁虚拟环境

直接删除整个文件夹即可

```
$ rm -rf data-science-venv
```

#### 更多参考资料

- [YouTube 上一个 10 分钟的教程 (英文)](https://www.youtube.com/watch?v=N5vscPTWKOk)

### JupyterLab 环境搭建
环境搭建步骤可以参考[官网](https://jupyter.org/install.html)，官网中还提到了 mamba 和 conda，它们两都是 pip 的替代品，如果不会用话，用 pip 即可。关键步骤如下:
- `pip install jupyterlab`
- `jupyter-lab`

## C 语言
### GNU Make
### CMake

## Java

## JavaScript
### NPM

### Babel
