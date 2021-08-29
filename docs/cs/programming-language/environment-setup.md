# 环境搭建
## Python
### virtualenv

安装：`pip3 install virtualenv`。基本使用步骤如下。

1) 创建一个xxx

```
$ cd project_folder
$ virtualenv venv
```

2) Python2还是Python3

敲这个命令

```
$ virtualenv -p /usr/bin/python2.7 venv
```

或配置这个环境变量

```
$ export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python2.7
```

3) 开始在虚拟环境工作

```
$ source venv/bin/activate
```

4) 结束虚拟环境的工作

```
$ deactivate
```

5) 销毁虚拟环境

直接删除虚拟环境的文件夹即可，一般是`venv`文件夹。

```
$ rm -rf venv
```

### pipenv

pipenv 很少有人用，为了教材完整性，这里也介绍一下。安装：`pip3 install pipenv`。基本使用步骤如下。

1) 使用pipenv安装库：`pipenv install requests`。

2) 编写普通的Python代码

```python
import requests

response = requests.get('https://httpbin.org/ip')

print('Your IP is {0}'.format(response.json()['origin']))
```

3) 使用pipenv运行代码：`pipenv run python main.py`
