# ionic-chosen-modal

angular编写的ionic选择指令控件，替代原生单选多选按钮，更好的界面，更好的操作，callback返回选中数据，配置化2种界面可用。
* * *
#界面展示

![Image text](https://raw.githubusercontent.com/danny0513/ionic-chosen-modal/master/img/1.png)

![Image text](https://raw.githubusercontent.com/danny0513/ionic-chosen-modal/master/img/2.png)

![Image text](https://raw.githubusercontent.com/danny0513/ionic-chosen-modal/master/img/3.png)
* * *
#使用方法
1.引入必要文件
```html
<link href="liveChosen.css"  rel="stylesheet"/> 
<script src="liveChosenService.js"></script>
<script src="liveChosenProvider.js"></script>
<script src="liveChosenModule.js"></script>
<script src="pinyinConvert.js"></script>
```
2.以模块的方式注入到angular.module
```javascript
angular.module("starter", ["live-chosen"])
```
3.在controller里的使用方法
```javascript
app.controller('myCtrl', function(liveChosen) { 
    var data=[
      {
        id:10,
        name:'第一级菜单',
        list:[        //有二级菜单时才有用
          {
          id:20,
          name:'第二级菜单',
          }
        ]
      } 
    ]
    liveChosen.openChosen({
        title: '选择系统',
        list: data,
        callback: function(val) {
        //点击选择后的callback（）
         console.log(val)
        }
    });
});
```

#关于OPTION

|option | 属性 | 选项 |注译|
|- | :-: | -: |-|
|title| string |无|顶部的标题|
|list | array | 固定格式|需要展示的数据|
|type | string | 'actionSheet'或不填|2种不同的界面展示方式'actionSheet'只能单选|
|multiple|boolean|true或false|是否多选(默认单选)| 
|hasCommit|boolean|true或false|是否显示提交按钮（默认是点击直接返回选中数据）|
