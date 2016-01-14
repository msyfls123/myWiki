Ajax轮询
===

###重点

1. 将查询得到的结果转为`JSON`, 通过`HttpResponse`返回
2. 通过`Ajax`轮询得到结果, 通过属性名解析到对应`HTML`节点上

###Models.py
```
class Notes(models.Model):
	tip = models.CharField(verbose_name = u'名字',max_length=50)
	time = models.TimeField(verbose_name = u'时间',)

	def __unicode__(self):
		return self.tip

	class Meta:
		verbose_name = u'笔记'
		verbose_name_plural = u'笔记'
```

###Views.py
```
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import json,datetime


def notes(request):
    return render(request,'Template.html')

def toJSON(obj):
    context = []
    fieldset = obj[0]._meta.get_all_field_names()
    for data in obj:
        d = {}
        for attr in fieldset:
            if isinstance(getattr(data, attr),datetime.datetime):
                d[attr] = getattr(data, attr).strftime('%Y-%m-%d %H:%M:%S')
            elif isinstance(getattr(data, attr),datetime.date):
                d[attr] = getattr(data, attr).strftime('%Y-%m-%d')
            elif isinstance(getattr(data, attr),datetime.time):
                d[attr] = getattr(data, attr).strftime('%H:%M:%S')
            else:
                d[attr] = getattr(data, attr)
        context.append(d)
    return json.dumps(context)

def getnotes(request):
    dataList = Notes.objects.all()
    return HttpResponse(toJSON(dataList),content_type="application/json")
```

###Template.html
```
{% load static %}
{% get_static_prefix as STATIC_PREFIX %}
<script src="{{STATIC_PREFIX}}js/jquery.min.js"></script>

Hello Notes.
<ul id='notes'></ul>

<script type="text/javascript">
	function showNews()
    {
	  $.getJSON("/getnotes/",function(result){
	  	$("#notes").empty();
	  	$.each(result, function(i, field){
        	newli = document.createElement("li");
        	newli.innerHTML = 'Name: '+field.tip +'Time: '+ field.time
        	$("#notes").append($(newli))
	  	})
	  })
    }
    showNews()
    setInterval('showNews()',5000);
</script>
```