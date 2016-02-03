D3.js学习笔记
==
###基本语法
+ `select`,`selectAll` 选择
+ `enter` 为缺失的元素返回占位符,一般跟append或insert
+ `exit` 返回不再需要的元素,一般可跟remove
+ `append`,`insert`,`remove` 添加/删除
+ `data` 数据
+ `attr`,`style`,`classed` 属性

###例子1
```
d3.select("body").selectAll("div")
    .data([4, 8, 15, 16, 23, 42])
    .enter().append("div")
    .text(function(d) { return d; });
// 根据数据集在body中添加元素

var div = d3.select("body").selectAll("div")
    .data([1, 2, 4, 8, 16, 32], function(d) { return d; });
// 更换数据集，将原有元素映射到数据集上

div.enter().append("div")
// 插入元素，注意：还没有添加数据

div.text(function(d,i) { return i+":"+d; });
// 将现有数据的元素变成“序号：数据”的格式，注意：原有数据的元素也变换了

div.sort().exit().remove();
// 整理并删除没有数据的元素 -->
```

###例子2
```
var matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

var tr = d3.select("body").append("table").selectAll("tr")
    .data(matrix)
  .enter().append("tr")
// 根据每个一级数组创建表格行

var td = tr.selectAll("td")
    .data(function(d) { return d; })
  .enter().append("td")
    .text(function(d,i) { return i+":"+d; });
// 根据每个二级数组创建单元格
```
