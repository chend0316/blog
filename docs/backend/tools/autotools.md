
# GNU Build System

知识点：
- Autoconf
- Autogen
- Automake

最早我们通过`make`命令编译代码，但是针对不同平台Makefile代码也需要调整，很繁琐，于是人们做了一些改进：
- 统一Makefile接口，GNU Coding Standards规定了一些[Standard Target](https://www.gnu.org/prep/standards/html_node/Standard-Targets.html#Standard-Targets)：`make install`、`make clean`、`make all`等等
- 自动生成Makefile代码，通过Automake实现

Autoconf是一些M4 macro的打包，它用来生成Shell脚本，生成的脚本是用来配置软件源码的。生成的脚本可以适配许多类UNIX系统。生成脚本需要依赖M4，但运行脚本不需要M4；开发者通常将生成的Shell脚本一起打包发布，这样软件安装的时候就不需要M4了。

Automake可以自动生成Makefile.in文件，需要依赖Autoconf。

