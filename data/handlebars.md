Handlebars
==
JS模板引擎

###使用方法
```
<script src="./js/handlebars-v4.0.5.js" charset="utf-8"></script>

<script id="entry-template" type="text/x-handlebars-template">
  {{#each lists}}
    <div>
      {{value}}
    </div>
  {{/each}}
  {{#if exit}}
    <p>Here</p>
  {{/if}}
  {{#with context}}
    {{name}}
  {{/with}}
</script>

<script>
  $(document).ready(function(){
    var source   = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {"key":"value"...}
    var html= template(context);
    $("#target").html(html)
  })
</script>
```

###语法
[http://handlebarsjs.com/](http://handlebarsjs.com/)

###示例
模板
```
<script id="entry-template" type="text/x-handlebars-template">
  <form action="{{action}}" id="{{formid}}">
    <fieldset>
      <legend>{{legend}}</legend>
      {{#each ele}}
        <p>
          {{#if input}}
            <label for="{{id}}">{{verbose}}</label>
            <input id="{{id}}" class="long" type="{{type}}" name="{{name}}" placeholder="{{placeholder}}" required value="{{value}}">
          {{/if}}
          {{#if radio}}
            <label>{{label}}</label>
            {{#each choice}}
              <input id="{{id}}" type="radio" name="{{../name}}" value="{{value}}" {{#compare ../checked value}}checked{{/compare}}>
              <label for="{{id}}" class="inline">{{verbose}}</label>
            {{/each}}
          {{/if}}
          {{#if phone}}
            <label for="{{id}}">{{verbose}}</label>
            <input id="{{idA}}" class="short" type="{{typeA}}" name="{{nameA}}" placeholder="{{placeholderA}}" required value="{{valueA}}">
            <input id="{{idB}}" class="middle" type="{{typeB}}" name="{{namB}}" placeholder="{{placeholderB}}" required value="{{valueB}}">
          {{/if}}
          {{#if select}}
            <label for="{{id}}" >{{verbose}}</label>
            <select name="{{name}}" id="{{id}}">
              {{#each option}}
                <option value ="{{value}}" {{#compare ../selected value}}selected="selected"{{/compare}}>{{verbose}}</option>
              {{/each}}
            </select>
          {{/if}}
        </p>
      {{/each}}
      {{#with submit}}
        <button type="submit" name="{{name}}" class="{{class}}" title="{{title}}"><p>{{value}}</p></button>
      {{/with}}
      {{#if add}}
        <button type="button" name="addOne" class="add">+ 添加队员</button>
      {{/if}}
    </fieldset>
  </form>
</script>
```
输出
```
<form action="/api/" id="formc">
    <fieldset>
      <legend>队员名单</legend>
      <p>
          <label for="cname">姓名</label>
          <input id="cname" class="long" type="text" name="cname" placeholder="请填写姓名" required="" value="">
      </p>
      <p>
          <label for="ccountry">国家</label>
          <input id="ccountry" class="long" type="text" name="ccountry" placeholder="请选择国家名称" required="" value="">
      </p>
      <p>
          <label>性别</label>
            <input id="cmale" type="radio" name="csex" value="male">
            <label for="cmale" class="inline">男</label>
            <input id="cfemale" type="radio" name="csex" value="female">
            <label for="cfemale" class="inline">女</label>
      </p>
      <p>
          <label for="cidcard">护照/身份证</label>
          <input id="cidcard" class="long" type="text" name="cidcard" placeholder="请填写您的有效身份信息" required="" value="">
      </p>
      <p>
          <label for="cphone">联系电话</label>
          <input id="cphoneA" class="short" type="text" name="cphoneA" placeholder="国家代码" required="" value="">
          <input id="cphoneB" class="middle" type="text" name="" placeholder="移动电话" required="" value="">
      </p>
      <p>
          <label for="cemail">邮箱地址</label>
          <input id="cemail" class="long" type="text" name="cemail" placeholder="请填写常用的邮箱" required="" value="">
      </p>
      <p>
          <label for="cstream">Stream账号</label>
          <input id="cstream" class="long" type="text" name="cstream" placeholder="请填写Stream账号" required="" value="">
      </p>
      <p>
          <label for="cprofile">Stream资料名称</label>
          <input id="cprofile" class="long" type="text" name="cprofile" placeholder="请填写Stream个人资料名称" required="" value="">
      </p>
      <p>
          <label for="cchar">大逃杀角色名</label>
          <input id="cchar" class="long" type="text" name="cchar" placeholder="请填写角色名" required="" value="">
      </p>
      <p>
          <label for="cregion">赛区选择</label>
          <select name="cregion" id="cregion">
              <option value="default">请选择赛区</option>
              <option value="chn">中国</option>
              <option value="jp">日本</option>
              <option value="kor">韩国</option>
              <option value="us">美国</option>
          </select>
      </p>
      <button type="submit" name="submitc" class="save" title="先保存，之后提交"><p>保 存</p></button>
      <button type="button" name="addOne" class="add">+ 添加队员</button>
  </fieldset>
</form>
```
