Django查询集
==
###返回查询集
+ __filter__:选择
```
  filter(**kwargs)
```
+ __excude__:排除
```
  exclude(pub_date__gt=datetime.date(2005, 1, 3), headline='Hello')
```
+ __annotate__:聚合查询值

  ```
  >>> from django.db.models import Count
  >>> q = Blog.objects.annotate(number_of_entries=Count('entry'))
  # The name of the first blog
  >>> q[0].name
  'Blogasaurus'
  # The number of entries on the first blog
  >>> q[0].number_of_entries
  42
  ```
+ __order_by__:排序
  ```
  Entry.objects.filter(pub_date__year=2005).order_by('-pub_date', 'headline')
  ```
+ __reverse__:反向
  ```
  my_queryset.reverse()[:5]
  ```
+ __values__:字典
  ```
  # This list contains a Blog object.
  >>> Blog.objects.filter(name__startswith='Beatles')
  [<Blog: Beatles Blog>]

  # This list contains a dictionary.
  >>> Blog.objects.filter(name__startswith='Beatles').values()
  [{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}]
  >>> Blog.objects.values('id', 'name')
  [{'id': 1, 'name': 'Beatles Blog'}]
  ```
+ __all__:拷贝

+ __raw__:SQL
  ```
  新的查询,与之前的查询无关
  ```

###返回非查询集
+ __get__:获取
+ __create__:创造
+ __update_or_create__:更新或创造
  ```
  obj, created = Person.objects.update_or_create(
      first_name='John', last_name='Lennon', defaults=updated_values)
  ```
+ __bulk_create__:批量创造
  ```
  >>> Entry.objects.bulk_create([
  ...     Entry(headline="Django 1.0 Released"),
  ...     Entry(headline="Django 1.1 Announced"),
  ...     Entry(headline="Breaking: Django is awesome")
  ... ])
  ```
+ __count__:计数
  ```
  # Returns the total number of entries in the database.
  Entry.objects.count()

  # Returns the number of entries whose headline contains 'Lennon'
  Entry.objects.filter(headline__contains='Lennon').count()
  ```
+ __latest,earliest,first,last__:最~
  ```
  Entry.objects.latest('pub_date')
  p = Article.objects.order_by('title', 'pub_date').first()
  ```
+ __aggregate__:聚合
  ```
  >>> from django.db.models import Count
  >>> q = Blog.objects.aggregate(Count('entry'))
  {'entry__count': 16}
  ```
+ __exists__: 存在
  ```
  if some_queryset.exists():
      print("There is at least one object in some_queryset")
  ```
+ __delete__:删除

###字段
+ __exact__:精准匹配
  ```
  Entry.objects.get(id__exact=14)
  ```

+ __iexact__:忽略大小写
  ```
  Blog.objects.get(name__iexact='beatles blog')
  ```
+ __contains__:包含
  ```
  Entry.objects.get(headline__contains='Lennon')
  ```
+ __icontains__:包含（忽略大小写）
  ```
  Entry.objects.get(headline__icontains='Lennon')
  ```
+ __in__:序列
  ```
  Entry.objects.filter(id__in=[1, 3, 4])
  inner_qs = Blog.objects.filter(name__contains='Ch').values('name')
  entries = Entry.objects.filter(blog__name__in=inner_qs)
  ```
+ __gt__,__gte__,__lt__,__lte__:大于/小于（等于）
  ```
  Entry.objects.filter(id__gt=4)
  ```
+ __startswith__,__istartswith__,__endswith__,__iendswith__:开始/结束于
  ```
  Entry.objects.filter(headline__startswith='will')
  ```
+ __range__:范围
  ```
  import datetime
  start_date = datetime.date(2005, 1, 1)
  end_date = datetime.date(2005, 3, 31)
  Entry.objects.filter(pub_date__range=(start_date, end_date))
  ```
+ __year__,__month__,__day__,__hour__,__minut__,__second__:日期时间
  ```
  Entry.objects.filter(pub_date__month=12)
  ```
+ __regex__:正则
  ```
  Entry.objects.get(title__regex=r'^(An?|The) +')
  ```
+ __iregex__:正则(忽略大小写)

###聚合函数
+ __Avg__:均值
+ __Count__:计数
+ __Max__:最大值
+ __Min__:最小值
+ __StdDev__:标准差
+ __Sum__:总数
+ __Variance__:方差

####__速查表__
  ```
  # Total number of books.
  >>> Book.objects.count()
  2452

  # Total number of books with publisher=BaloneyPress
  >>> Book.objects.filter(publisher__name='BaloneyPress').count()
  73

  # Average price across all books.
  >>> from django.db.models import Avg
  >>> Book.objects.all().aggregate(Avg('price'))
  {'price__avg': 34.35}

  # Max price across all books.
  >>> from django.db.models import Max
  >>> Book.objects.all().aggregate(Max('price'))
  {'price__max': Decimal('81.20')}

  # Cost per page
  >>> Book.objects.all().aggregate(
  ...    price_per_page=Sum(F('price')/F('pages'), output_field=FloatField()))
  {'price_per_page': 0.4470664529184653}

  # All the following queries involve traversing the Book<->Publisher
  # many-to-many relationship backward

  # Each publisher, each with a count of books as a "num_books" attribute.
  >>> from django.db.models import Count
  >>> pubs = Publisher.objects.annotate(num_books=Count('book'))
  >>> pubs
  [<Publisher BaloneyPress>, <Publisher SalamiPress>, ...]
  >>> pubs[0].num_books
  73

  # The top 5 publishers, in order by number of books.
  >>> pubs = Publisher.objects.annotate(num_books=Count('book')).order_by('-num_books')[:5]
  >>> pubs[0].num_books
  1323
  ```

  <div id="quickLink">
    <ul>
    </ul>
  </div>
  <div id="backTop" data-toggle="tooltip" title="飞" ></div>
  <script src="files/js/scrollTab.js"></script>
