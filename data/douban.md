豆瓣笔记
==

###Linux
+ `source $HOME/.bash_profile`  
立即应用bash的设置
+ `ln -sf path1 path2`  
path2 指向 path1
+ `find ./ -name '*.*' | xargs grep 'data'`  
在./下寻找包含data字样的任意名称后缀名的文件
+ `ps aux | grep name`  
查找name创建的进程
+ `ls ./ -alh`  
查看文件所有者
+ `chmod a+x filename`  
文件变可执行
+ bash 示例
  ```
  #!/bin/bash
  for i in $(ls | grep 'hello')
  do
    mv $i '../'
    echo 'test'
  done
  ```
+ 批量替换字符串
  ```
  grep -rl "被替换的字符串"
  grep -rl "被替换的字符串" *|xargs -i sed -i 's/被替换的字符串/替换的字符串/g' "{}"
  grep -rl "被替换的字符串"
  ```

###Git
+ `git fetch remotename`  
从远程仓库拉取代码
+ `git rebase remotename/branchname`  
重新整理commit于远程分支commit后面  
+ `git rebase -i SHA1`  
以SHA1指向的commit为基础rebase你的commits  
+ `git update-index --assume-unchanged ***`  
忽略对某文件的改动  
+ `git rm --cached ***`  
将某个文件的改动移出缓存区
+ `git branch -a`  
查看分支信息  
+ `git branch -r -d remotename/branchname`  
删除本地分支和远程指向，不加-r则只删除本地
+ `git push remotename :branchname`  
删除远程分支

###Vim
+ `t`   
在新标签页打开（在NERDTree下使用）
+ `m{A-Z}`  
全局书签
+ `'m{A-Z}`  
跳转到全局书签
+ `:!shell-order`  
在vim中执行shell命令
+ `gg=G`  
全文件调整缩进
+ `:%s/\t/  /g`  
全文件替换`Tab`为`Space*2`
+ `:%s/\r//g`  
全文件删除行末^M
+ `d`  
  `"testdfat"`  假设光标停留在第一个t位置  
  `di"`：delete all content inside "，结果字符串为""  
  `dta`：delete all content to a，结果字符串为"at"  
  `dfa`：delete all content from current location, until a is found，结果字符串为"t"

###Javascript
+ 有浏览器会阻止异步 ajax 提交 form 的操作，需要将 ajax 请求设置为 `async: false` 即 `sync` 请求
+ document Element.nodeType
  ```
  节点类型       描述                            子节点
  1	Element	 代表元素	                Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference
  2	Attr     代表属性	                Text, EntityReference
  3	Text     代表元素或属性中的文本内容。	None
  ```
+ cssText
  ```
  element.style.cssText = 'font-size: 24px'
  ```

###Webpack
+ 样例（已配置react-es6全家桶）   
  [webpack.config.js](https://github.com/msyfls123/react-demo/blob/master/webpack.config.js)   
  [package.json](https://github.com/msyfls123/react-demo/blob/master/package.json)

###Joke
+ 2 本 Python 书籍的读者读完了爬虫章节后直接转头来爬我们的 js 接口...
+ 事故是常态，常态只是对事故的一次深层封装而已
+ md 明天老子不提 pr 了，看还怎么出 bug

###Vim config demo
```
set nocompatible             " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')
"
" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'keitheis/vim-plim'
Plugin 'wavded/vim-stylus'
Plugin 'Valloric/YouCompleteMe'
Plugin 'ternjs/tern_for_vim'
Plugin 'godlygeek/tabular'
Plugin 'plasticboy/vim-markdown'
" " All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" " To ignore plugin indent changes, instead use:
" filetype plugin on
" "
" " Brief help
" " :PluginList       - lists configured plugins
" " :PluginInstall    - installs plugins; append `!` to update or just
" :PluginUpdate
" " :PluginSearch foo - searches for foo; append `!` to refresh local cache
" " :PluginClean      - confirms removal of unused plugins; append `!` to
" auto-approve removal
" "
" " see :h vundle for more details or wiki for FAQ
" " Put your non-Plugin stuff after this line

let g:vim_markdown_math = 1
let g:vim_markdown_frontmatter = 1
let g:vim_markdown_toml_frontmatter = 1
let g:vim_markdown_json_frontmatter = 1

let g:ycm_key_list_select_completion = ['<Down>']
let g:ycm_key_list_previous_completion = ['<Up>']
let g:ycm_confirm_extra_conf=0 "关闭加载.ycm_extra_conf.py提示
let g:ycm_min_num_of_chars_for_completion=2 " 从第2个键入字符就开始罗列匹配项
let g:ycm_cache_omnifunc=0  " 禁止缓存匹配项,每次都重新生成匹配项
let g:ycm_seed_identifiers_with_syntax=1    " 语法关键字补全
" 在注释输入中也能补全
let g:ycm_complete_in_comments = 1
" 在字符串输入中也能补全
let g:ycm_complete_in_strings = 1
"注释和字符串中的文字也会被收入补全
" let g:ycm_collect_identifiers_from_comments_and_strings = 0
" let g:ycm_global_ycm_extra_conf =
" '~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/ycm/.ycm_extra_conf.py'

nnoremap <F5> :YcmForceCompileAndDiagnostics<CR>
let mapleader = ","
nnoremap <leader>lo :lopen<CR> "open locationlist                                                                                       
nnoremap <leader>lc :lclose<CR>   "close locationlist
inoremap <leader><leader> <C-x><C-o>"
inoremap <leader><leader> <C-x><C-o>
nnoremap <leader>jd :YcmCompleter GoToDefinitionElseDeclaration<CR>

nmap <leader>v "+gp  
nmap <leader>c "+y
" nerd tree
let NERDTreeQuitOnOpen=1 "打开文件时关闭树
let NERDTreeShowBookmarks=1 "显示书签
let mapleader = ","
map <F3> :NERDTreeToggle<CR>
map <F2> :NERDTreeMirror<CR>
nnoremap <leader>ma :set mouse=a<cr>
nnoremap <leader>mu :set mouse=<cr>
set modelines=0



highlight WhitespaceEOL ctermbg=red guibg=red
match WhitespaceEOL /\s\+$/


"设置更好的删除
"set backspace=2
"
"syntax on "语法高亮
"
""用浅色高亮当前行
autocmd InsertLeave * se nocul
autocmd InsertEnter * se cul

set smartindent "智能对齐

set autoindent "自动对齐

set confirm "在处理未保存或只读文件的时候，弹出确认框

set tabstop=2 "tab键的宽度
set softtabstop=2
set shiftwidth=2 "统一缩进为4
set expandtab "不要用空格替代制表符

set number "显示行号
set history=50  "历史纪录数
set hlsearch
set incsearch "搜素高亮,搜索逐渐高亮

set gdefault "行内替换
set encoding=utf-8
set fileencodings=utf-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936,utf-16,big5,euc-jp,latin1 "编码设置

colorscheme molokai

set guifont=Menlo:h16:cANSI "设置字体
set langmenu=zn_CN.UTF-8
set helplang=cn  "语言设置

set ruler "在编辑过程中，在右下角显示光标位置的状态行

set laststatus=1  "总是显示状态行

set showcmd "在状态行显示目前所执行的命令，未完成的指令片段也会显示出来

set scrolloff=3 "光标移动到buffer的顶部和底部时保持3行的距离
set showmatch "高亮显示对应的括号
set matchtime=5 "对应括号高亮时间(单位是十分之一秒)

set autowrite "在切换buffer时自动保存当前文件

set wildmenu  "增强模式中的命令行自动完成操作

set linespace=2 "字符间插入的像素行数目
set whichwrap=b,s,<,>,[,] "开启normal 或visual模式下的backspace键空格键，左右方向键,insert或replace模式下的左方向键，右方向键的跳行功能

filetype plugin indent on "分为三部分命令:file on,file plugin on,file indent on 分别是自动识别文件类型, 用用文件类型脚本,使用缩进定义文件

set foldenable  "允许折叠
set cursorline "突出显示当前行
set magic  "设置魔术？神马东东
set ignorecase "搜索忽略大小写
filetype on "打开文件类型检测功能
set background=dark
set t_Co=256   "256色
set mouse=a  "允许鼠标
```
