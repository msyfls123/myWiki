Django表单使用
===
__必读__：
1. [表单](http://python.usyiyi.cn/django_182/topics/forms/index.html)[API](http://python.usyiyi.cn/django_182/ref/forms/api.html)
2. [视图处理](http://python.usyiyi.cn/django_182/topics/class-based-views/generic-editing.html)：表单,模型-修改视图
3. [模型表单](http://python.usyiyi.cn/django_182/topics/forms/modelforms.html)：模型-表单

###基于form
`forms.py`
```
from django import forms

class ContactForm(forms.Form):
    name = forms.CharField()
    message = forms.CharField(widget=forms.Textarea)

    def send_email(self):
        # send email using the self.cleaned_data dictionary
        pass
```
`views.py`
```
from myapp.forms import ContactForm
from django.views.generic.edit import FormView

class ContactView(FormView):
    template_name = 'contact.html'
    form_class = ContactForm
    success_url = '/thanks/'

    def form_valid(self, form):
        # This method is called when valid form data has been POSTed.
        # It should return an HttpResponse.
        form.send_email()
        return super(ContactView, self).form_valid(form)
```

###基于模型
`models.py`
```
from django.core.urlresolvers import reverse
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=200)

    def get_absolute_url(self):
        return reverse('author-detail', kwargs={'pk': self.pk})
```
`views.py`
```
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy
from myapp.models import Author

class AuthorCreate(CreateView):
    model = Author
    fields = ['name']

class AuthorUpdate(UpdateView):
    model = Author
    fields = ['name']

class AuthorDelete(DeleteView):
    model = Author
    success_url = reverse_lazy('author-list')
```
###细节

####`urls.py`

```
from django.conf.urls import url
from myapp.views import AuthorCreate, AuthorUpdate, AuthorDelete

urlpatterns = [
    # ...
    url(r'author/add/$', AuthorCreate.as_view(), name='author_add'),
    url(r'author/(?P<pk>[0-9]+)/$', AuthorUpdate.as_view(), name='author_update'),
    url(r'author/(?P<pk>[0-9]+)/delete/$', AuthorDelete.as_view(), name='author_delete'),
]
```
####模板名
`CreateView` 和`UpdateView` 默认使用 `myapp/model名_form.html`

`DeleteView` 使用 `myapp/model名_confirm_delete.html`

如果你希望分开CreateView 和UpdateView 的模板，你可以设置你的视图类的`template_name` 或`template_name_suffix`。

####设置HTML属性
```
>>> from django import forms
>>> name = forms.TextInput(attrs={'size': 10, 'title': 'Your name',})
>>> name.render('name', 'A name')
'<input title="Your name" type="text" name="name" value="A name" size="10" />'
```
```
>>> name = forms.TextInput(attrs={'required': True})
>>> name.render('name', 'A name')
'<input name="name" type="text" value="A name" required />'
>>>
>>> name = forms.TextInput(attrs={'required': False})
>>> name.render('name', 'A name')
'<input name="name" type="text" value="A name" />'
```

####save( ) 方法

每个模型表单还具有一个`save()` 方法。这个方法根据表单绑定的数据创建并保存数据库对象。模型表单的子类可以用关键字参数`instance` 接收一个已经存在的模型实例；如果提供，`save()` 将更新这个实例。如果没有提供，`save()` 将创建模型的一个新实例：
```
>>> class ArticleForm(ModelForm):
...     class Meta:
...         model = Article
...         fields = ['pub_date', 'headline', 'content', 'reporter']

>>> from myapp.models import Article
>>> from myapp.forms import ArticleForm

# Create a form instance from POST data.
>>> f = ArticleForm(request.POST)

# Save a new Article object from the form's data.
>>> new_article = f.save()

# Create a form to edit an existing Article, but use
# POST data to populate the form.
>>> a = Article.objects.get(pk=1)
>>> f = ArticleForm(request.POST, instance=a)
>>> f.save()
```
