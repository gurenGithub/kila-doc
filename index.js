#!/usr/bin/env node

const getFiles = require('./file');
var path = require('path'); //解析需要遍历的文件夹
let dirname = __dirname;
let execReadmePath = process.execPath;
let execPath = process.cwd();
var fs = require('fs');
const argvs = process.argv.slice(2);

const descTable = require('./table');

let _dir = execPath + '/' + (argvs[0] || '');


let readme = {

    code(text) {


        let content = '```javascript\n' + text + '\n```';

        return content;
    },
    title3(text) {

        let content = `###\n${text}`;
    }
}

let documents = {};
getFiles(path.resolve(_dir), function (file, content) {



    if (file.indexOf('index') !== -1) {

        //console.log(content);

        var content2 = '/**doc\n     * 创建一条线\n     * @class Charts\n     * @name  createLine\n     * @param {*} data 数据源 示例([{time:\'2019-09-09\',value:0},{time:\'2019-09-10\',value:1}])\n     * @param {*} options 选项  示例({color:\'颜色\',lineStyle:\'线样式\',lineWidth:\'线宽度\',crosshairMarkerVisible:\'显示浮点\',crosshairMarkerRadius:\'浮点圆弧\'}\n  * @returns lineSeries \n     doc*/\n    createLine(data,options){\n\n      let   serie = new LineSeries(me.myChart, {data});\n      serie.applyOptions(options||{});\nthis.series.push(serie);\n      return serie.getSerie();\n    },\n    createBar(data,options){\n        let   serie = new HistogramSeries(me.myChart, {data});\n        serie.applyOptions(options||{});\n        this.series.push(serie);\n        return serie.getSerie();\n    },\n    createArea(data,options){\n        let   serie = new AreaSeries(me.myChart, {data});\n        serie.applyOptions(options||{});\n        this.series.push(serie);\n        return serie.getSerie();\n    },\n    createCandlestick(data,options){\n        let   serie = new CandlestickSeries(me.myChart, {data});\n        serie.applyOptions(options||{});\n        this.series.push(serie);\n   ';
        content = content.replace(/\n/g, '-n');
        //content2=content2.replace(/\n/g,' ');
        var reg = /\/\*\*doc([^/]*)\*\//g;
        //var docs= content2.match(reg);
        let docs = content.match(reg);

        let rmHtml=[];

        docs.map(el => {


            let reEl = el.replace(/-n/gi, '');
            //console.log(reEl);
            let keywords = ['class', 'name', 'param', 'desc', 'returns', 'demo'];

            reEl.split('@').map(rel => {


                let name = rel.split(' ')[0];

                let keywordIndex = keywords.indexOf(name);
                //console.log(keywordIndex)
                // console.log(name,keywordIndex,rel);
                if (keywordIndex != -1) {

                    //console.log(rel);

                    if (keywordIndex == 2) {

                        rel = rel.replace(/\s*$/gi, '').replace(/\**$/gi, '').replace(/\s*$/gi, '');
                        let options = rel.split(' ');
                        let paramName = options[2];
                        let paramDesc = options[3];
                        let paramTable = options[4] || '{}';
                        let $paramTable = descTable(paramTable,paramName+'('+paramDesc+')');
                        console.log($paramTable);

                        rmHtml.push($paramTable);

                    }
                }
            })
        })
        fs.writeFileSync(path.join(dirname,'README.MD') ,rmHtml);

        //console.log(docs,(docs || {length:0}).length);
    }

}, 'js')
//fs.writeFileSync(path.join(dirname,'README.MD') ,readme.code('<p>xxx</p>'));

//开始读取文件

console.log(_dir);