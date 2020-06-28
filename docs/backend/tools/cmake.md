# CMake

## 工作流程

- 编写`CMakeLists.txt`配置文件
- 运行`cmake -S ./ -B ./build`

* 配置`ccmake ./build`
* 编译`cmake --build ./build`
* 安装`cmake --install ./build --prefix /install/path/`

## CMake常用配置

下面这个配置文件供查阅，不可直接运行。

```
cmake_minimum_required(VERSION 3.10)

project(Tutorial VERSION 1.0)

# 设置变量
set(CMAKE_CXX_STANDARD 98)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# .in文件是用一些特殊语法编写的模板文件
configure_file(TutorialConfig.h.in TutorialConfig.h)

# 添加名为Tutorial的Target，这是个可执行文件
add_executable(Tutorial tutorial.cxx)

# 添加名为MyMath作为Target，这是个库文件
add_library(MyMath mymath.cxx)

# 配置Target的头文件搜索目录
target_include_directories(Tutorial PUBLIC "${PROJECT_BINARY_DIR}")

# 配置Target需要链接的库文件
target_link_libraries(Tutorial PUBLIC MyMath)

# 意思是MathFunctions目录还有CMakeLists.txt需要解析
add_subdirectory(MathFunctions)

# 添加名为USE_MYMATH的配置项，默认为ON，可通过ccmake命令修改配置项
option(USE_MYMATH "Use MyMath library" ON)

# 将<target>复制到${CMAKE_INSTALL_PREFIX}/bin目录
install(TARGETS Tutorial DESTINATION bin)

# 将指定文件复制到${CMAKE_INSTALL_PREFIX}/include目录
install(FILES ${PROJECT_BINARY_DIR}/TutorialConfig.h DESTINATION include)
```

