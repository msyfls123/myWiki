利用Pillow生成缩略图
===
###官方示例：创建 JPEG 缩略图

	from __future__ import print_function
	import os, sys
	from PIL import Image

	size = (128, 128)

	for infile in sys.argv[1:]:
	    outfile = os.path.splitext(infile)[0] + ".thumbnail"
	    if infile != outfile:
	        try:
	            im = Image.open(infile)
	            im.thumbnail(size)
	            im.save(outfile, "JPEG")
	        except IOError:
	            print("cannot create thumbnail for", infile)

很重要的一点是这个库不会直接解码或者加载图像栅格数据。当你打开一个文件，只会读取文件头信息用来确定格式，颜色模式，大小等等，文件的剩余部分不会主动处理。这意味着打开一个图像文件的操作十分快速，跟图片大小和压缩方式无关。下面是一个简单的脚本用来快速验证大量图片。

###在Ckeditor中使用
(400,300)是缩略图的最大尺寸，如果长宽比例不符合，会按较长者缩放。

	@csrf_protect
	def upload_image(request):
	    if request.method == 'POST':
	        callback = request.GET.get('CKEditorFuncNum')
	        try:
	            path = "media/uploads/" + time.strftime("%Y/%m/",time.localtime())   
	            f = request.FILES["upload"]
	            file_name = path + f.name
	            im = Image.open(f)
	            im.thumbnail((400,300),Image.ANTIALIAS)
	            im.save(file_name, "JPEG")
	        except Exception, e:
	            print e
	        res = r"<script>window.parent.CKEDITOR.tools.callFunction("+callback+",'/"+file_name+"', '');</script>"
	        return HttpResponse(res)
	    else:
	        raise Http404()

###成功生成缩略图
![缩略图](imgs/thumb.jpg)

###模型图片字段
>参考[Django上传图片生成成缩略图的类](http://www.sharejs.com/codes/python/8672)的实现

这段代码通过pil生成缩略图，主要通过`save`函数保存缩略图，自定义了图片的保存位置和原图片位置，可以自己更改，可以指定缩略图的大小。

__该代码片段来自于: <http://www.sharejs.com/codes/python/8672>__

	from PIL import Image
	from cStringIO import StringIO
	from django.core.files.uploadedfile import SimpleUploadedFile

	class Photo(models.Model):
	    #from sharejs.com
	    title = models.CharField(max_length = 100)
	    image = models.ImageField(upload_to ="photos/originals/%Y/%m/")
	    image_height = models.IntegerField()
	    image_width = models.IntegerField()
	    thumbnail = models.ImageField(upload_to="photos/thumbs/%Y/%m/")
	    thumbnail_height = models.IntegerField()
	    thumbnail_width = models.IntegerField()
	    caption = models.CharField(max_length = 250, blank =True)
	    
	    def __str__(self):
	        return "%s"%self.title
	    
	    def __unicode__(self):
	        return self.title
	        
	    def save(self, force_update=False, force_insert=False, thumb_size=(180,300)):

	        image = Image.open(self.image)
	        
	        if image.mode not in ('L', 'RGB'):
	            image = image.convert('RGB')
	            
	        # save the original size
	        self.image_width, self.image_height = image.size
	        
	        image.thumbnail(thumb_size, Image.ANTIALIAS)
	        
	        # save the thumbnail to memory
	        temp_handle = StringIO()
	        image.save(temp_handle, 'png')
	        temp_handle.seek(0) # rewind the file
	        
	        # save to the thumbnail field
	        suf = SimpleUploadedFile(os.path.split(self.image.name)[-1],
	                                 temp_handle.read(),
	                                 content_type='image/png')
	        self.thumbnail.save(suf.name+'.png', suf, save=False)
	        self.thumbnail_width, self.thumbnail_height = image.size
	        
	        # save the image object
	        super(Photo, self).save(force_update, force_insert)
    		


>参考自

>[快速入门-Pillow v2.4.0 (PIL fork)](http://pillow-cn.readthedocs.org/zh_CN/latest/handbook/tutorial.html#id3)

>[Django上传图片用PIL生成缩略图](http://blog.csdn.net/marising/article/details/4036715)