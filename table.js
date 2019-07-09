

let tableHeader
let table=function(optionsStr,title){

    /*
    |Name|Type|Default|Description|
|-|----|-------|-|
|`topColor`|`string`|`rgba(46, 220, 135, 0.4)`|Area top color|
|`bottomColor`|`string`|`rgba(40, 221, 100, 0)`|Area bottom color|
|`lineColor`|`string`|`#33D778`|Line color|
|`lineStyle`|[LineStyle](./constants.md#linestyle)|`LineStyle.Solid`|Line style|
|`lineWidth`|`number`|`3`|Line width in pixels|
|`crosshairMarkerVisible`|`boolean`|`true`|If true, the crosshair marker is shown|
|`crosshairMarkerRadius`|`number`|`4`|The radius of the crosshair marker in pixels|
 */

//{data:'array|[]|[{time:'2019-09-03',value:1}]}

   
var opts= JSON.parse(optionsStr || '{}');

let list=[];
list.push("####"+title)
list.push('|Name|Type|Default|Description|');
list.push('|-|----|-------|-|');
for(var key in opts){

    
    let value=opts[key].split('|') || [];

    let content='|`'+key+'`|`'+value[0]+'`|`'+value[1]+'`|'+value[2]+'|';
    list.push(content);
}


return list.join('\r\n');

}

module.exports = table;