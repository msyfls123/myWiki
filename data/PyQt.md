PyQt
==
###Hello World ！
只用Qt做个界面，打包发布成exe文件

__`py2exe` 和 `PyQt4/5` 要提前装好__

1. 先新建个`test`文件夹

2. 创建`test.py`文件
  ```
  from PyQt4.QtGui import *
  # from PyQt5.QtWidgets import *
  from PyQt4.QtCore import *

  import sys

  class MainWindow(QMainWindow):
      def __init__(self,*args,**kwargs):
          super(MainWindow,self).__init__(*args,**kwargs)
          self.setWindowTitle("My App")
          label = QLabel("Hello world!")
          label.setAlignment(Qt.AlignCenter)
          self.setCentralWidget(label)

  app=QApplication(sys.argv)

  window = MainWindow()
  window.show()

  app.exec_()
  ```
3. 创建`setup.py`文件
  ```
  from distutils.core import setup
  import py2exe
  import sys

  #this allows to run it with a simple double click.
  sys.argv.append('py2exe')

  py2exe_options = {
          "includes": ["sip"],
          "dll_excludes": ["MSVCP90.dll",],
          "compressed": 1,
          "optimize": 2,
          "ascii": 0,
          "bundle_files": 1,
          }

  setup(
        name = 'PyQt Demo',
        version = '1.0',
        windows = ['test.py',],
        zipfile = None,
        options = {'py2exe': py2exe_options}
        )
  ```
4. 命令行输入`python setup.py` 一顿操作后就能看到`build`和`dist`两个文件夹, `dist`里的`test.exe`就是生成的可执行文件

>参考自 [使用Py2exe将PyQt程序打包为exe文件](http://www.pythoner.com/111.html)
