/*
* Liang Jia Fu
*15622316910@163.com
* 主要用于处理用中文姓名去合成姓+名首字母的邮箱
*/

let pinyin = require('node-pinyin') ;
let xlsx = require('node-xlsx');
let fs = require('fs');

let pinyinFile = xlsx.parse('./excel/5-10pinyin.xlsx');

console.log(pinyinFile[0]['data'][1]);
let pydata = pinyinFile[0]['data'],
    name = [],
    pyName='',
    odata = [{
      name:'邮箱',
      data:[['姓名','拼音','邮箱']]
    }];
for(let row in pydata) {
  if(pydata[row][2] !== undefined){

    name = pinyin(pydata[row][2],{style:'normal'})
    console.log(name)
    if(name.length>2){
      pyName = name[0]+name[1].join('').substr(0,1)+name[2].join('').substr(0,1)
    }else if(name.length>1) {
      pyName = name[0]+name[1].join('').substr(0,1)
    }else {
      pyName = name[0]
    }
    odata[0].data.push([pydata[row][2],pyName,pyName+'@xiaopeng.com'])
    console.log(pyName);
  }
}

let buffer = xlsx.build(odata);

fs.writeFile('results/pinyin.xlsx',buffer,(err)=>{
  if(err) console.log(err);
  console.log('done')
})

