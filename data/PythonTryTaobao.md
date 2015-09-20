利用Python的urllib2库进行网页解析，再用Python的BeautifulSoup库提取网页内容的指定标签并输出，重复

	from BeautifulSoup import BeautifulSoup 
	import urllib2
	def page_loop(page=0):
		url="http://s.taobao.com/search?q=%%E5%%B9%%B2%%E8%%A1%%A3%%E6%%9C%%BA&js=1&stats_click=search_radio_all%%3A1&initiative_id=staobaoz_20150706&ie=utf8&bcoffset=-4&s=%s"%page
		req = urllib2.Request(url)
		req.add_header('User-Agent','Mozilla/5.0 (Windows NT 6.2; rv:16.0) Gecko/20100101 Firefox/16.0')
		content = urllib2.urlopen(req)
		soup=BeautifulSoup(content)
		print url
		print soup
		name=soup.findAll(attrs={"class": "g_price-highlight"})
		print name
		for x in name:
			index=name.index(x)
			print page,index,x.strong.string
		page=page+44
	page_loop()

[返回实习报告](Report)