Django添加markdown支持
===
Markdown是一个很多程序员都喜欢的标记性语言，很多知名博客和网站都支持采用了这一编辑器。
例如：segmentfault、简书、当然还有锤子的便签。为了在django1.8中对自己的文章进行markdown
，可以使用以下几个步骤：

###配置markdown2

	#首先安装markdown2
	pip install markdown2

接下来在需要配置markdown的应用文件夹(如Articles)下新建文件夹`templatetags`, 再在`templatetags`下新建两个文件：
`__init___.py`、`custom_markdown.py`两个文件。在`custom_markdown.py`中加入如下代码：

	import markdown2

	from django import template
	from django.template.defaultfilters import stringfilter
	from django.utils.encoding import force_text
	from django.utils.safestring import mark_safe

	register = template.Library()

	@register.filter(is_safe=True)
	@stringfilter
	def custom_markdown(value):
	return mark_safe(markdown2.markdown(force_text(value),
	        extras=["fenced-code-blocks", "cuddled-lists", "metadata", "tables", "spoiler"]))

现在`templatetags`文件夹就相当于你自己的一个包了。它的使用很简单，在需要的网页中引入`custom_markdown`，然后在需要进行markdown的地方markdown就行了，如下：
	
	{% load custom_markdown %}
	{{ article.content|custom_markdown }}


###代码块highlight
完成上面的内容markdown后，还不能达到大部人的预期效果，因为代码快部分没有高亮显示。接下来我们来对代码块进行处理。highlight.js支持非常多语言的高亮，而且高亮的风格也非常丰富，我们先去官网根据自己的选择的语言下载下来，然后放入static文件夹下，然后我们在基模版中如下使用就能实现高亮了：

[官方地址](https://highlightjs.org/download/) ==> default.min.js,highlight.min.js

[自定样式地址](https://github.com/isagalaev/highlight.js/tree/master/src/styles) ==> styles.css

	<!-- templates/base.html -->
	{%load static%}
	{% get_static_prefix as STATIC_PREFIX %}
	<link rel="stylesheet" href="{{STATIC_PREFIX}}css/default.min.css">
	<script src="{{STATIC_PREFIX}}js/highlight.min.js"></script>
	<link rel="stylesheet" href="{{STATIC_PREFIX}}css/monokai.css">
	<script>hljs.initHighlightingOnLoad();</script>

__效果__
![Markdown](imgs/markdown1.jpg)

###后台pagedown编辑器
完成前面的两步后我们，可能还需要在后台的文章编辑部分使用markdown的编辑器，这里使用的是django-pagedown编辑器
。django-pagedown完美支持markdown语法，还能边写边预览，如果你觉得原生的界面比较丑的化还可以自己重写css。
	
	#安装django-pagedown
	pip install django-pagedown

安装好后，我们需要在settings.py中加入应用才能使用：


	INSTALLED_APPS = (
		...
		'pagedown',
	)
接下来在admin.py中加入如下代码（官方的步骤不适用于django1.8，会报错）：

	from django.contrib import admin
	from .models import *
	from pagedown.widgets import AdminPagedownWidget
	from django import forms

	# Register your models here.
	# 定义自己的form
	class ArticleForm(forms.ModelForm):
	    content = forms.CharField(widget=AdminPagedownWidget())
		#注意此处的content就是markdown编辑器所在，但不会保存数据，只供预览
	    class Meta:
	        model = Article
	        fields = '__all__'

	class ArticleAdmin(admin.ModelAdmin):
	    form = ArticleForm

	admin.site.register(Article,ArticleAdmin)
__效果__
![Pagedown](imgs/markdown2.jpg)
###[MarkdownCheatSheet](https://warpedvisions.org/projects/markdown-cheat-sheet/)

	# Header 1 #
	## Header 2 ##
	### Header 3 ###             (Hashes on right are optional)
	#### Header 4 ####
	##### Header 5 #####

	## Markdown plus h2 with a custom ID ##         {#id-goes-here}
	[Link back to H2](#id-goes-here)

	This is a paragraph, which is text surrounded by whitespace. Paragraphs can be on one 
	line (or many), and can drone on for hours.  

	Here is a Markdown link to [Warped](https://warpedvisions.org), and a literal <http://link.com/>. 
	Now some SimpleLinks, like one to [google] (automagically links to are-you-
	feeling-lucky), a [wiki: test] link to a Wikipedia page, and a link to 
	[foldoc: CPU]s at foldoc.  

	Now some inline markup like _italics_,  **bold**, and `code()`. Note that underscores in 
	words are ignored in Markdown Extra.

	![picture alt](/images/photo.jpeg "Title is optional")     

	> Blockquotes are like quoted text in email replies
	>> And, they can be nested

	* Bullet lists are easy too
	- Another one
	+ Another one

	1. A numbered list
	2. Which is numbered
	3. With periods and a space

	And now some code:

	    // Code is just text indented a bit
	    which(is_easy) to_remember();

	~~~

	// Markdown extra adds un-indented code blocks too

	if (this_is_more_code == true && !indented) {
	    // tild wrapped code blocks, also not indented
	}

	~~~

	Text with  
	two trailing spaces  
	(on the right)  
	can be used  
	for things like poems  

	### Horizontal rules

	* * * *
	****
	--------------------------

	<div class="custom-class" markdown="1">
	This is a div wrapping some Markdown plus.  Without the DIV attribute, it ignores the 
	block. 
	</div>

	## Markdown plus tables ##

	| Header | Header | Right  |
	| ------ | ------ | -----: |
	|  Cell  |  Cell  |   $10  |
	|  Cell  |  Cell  |   $20  |

	* Outer pipes on tables are optional
	* Colon used for alignment (right versus left)

	## Markdown plus definition lists ##

	Bottled water
	: $ 1.25
	: $ 1.55 (Large)

	Milk
	Pop
	: $ 1.75

	* Multiple definitions and terms are possible
	* Definitions can include multiple paragraphs too

	*[ABBR]: Markdown plus abbreviations (produces an <abbr> tag)

<small>内容转自[django1.8下的markdown、highlight、pagedown解决](http://segmentfault.com/a/1190000003933331), 特此注明</small>

<div id="quickLink">
  <ul>
  </ul>
</div>
<div id="backTop" data-toggle="tooltip" title="飞" ></div>
<script src="files/js/scrollTab.js"></script>