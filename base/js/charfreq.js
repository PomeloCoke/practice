

class DefaultMap extends Map {
  constructor(defaultValue) {
    super();  // 调用超类构造器
    this.defaultValue = defaultValue  // 记住默认值
  }

  get(key) {
    if (this.has(key)) {  // 如果映射中有key
      return super.get(key);  // 从超类返回它的值
    } else {
      return this.defaultValue;   // 否则返回默认值
    }
  }
}

// 这个类计算并显示字母的频率柱状图
class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0) // 字母到数量的映射
    this.totalLetters = 0 // 字母总数
  }

  // 用文本中的字母更新柱状图
  add(text) {
    // 移除文本中的空白，然后将字母转换为大写
    text = text.replace(/\s/g,'').toUpperCase();
    for(let character of text) {
      let count = this.letterCounts.get(character); // 取得之前的数量
      this.letterCounts.set(character, count+1);  // 递增
      this.totalLetters++;
    }
  }

  // 将柱状图转换为字符串并显示ASCII图形
  toString() {
    // 把映射转换为一个[key,value]数组的数组
    let entries = [...this.letterCounts];
    // 按数量和字母表对数组排序
    entries.sort((a, b) => {    // 定义排序的方式
      if (a[1] === b[1]) {      // 如果数量相同
        return a[0] < b[0] ? -1 : 1;    // 按字母表排序
      } else {
        return b[1] - a[1];     // 数量大的排前面
      }
    });

    // 把数量转换为百分比
    for(let entry of entries) {
      entry[1] = entry[1] / this.totalLetters * 100;
    }

    // 删除小于1%的条目
    entries = entries.filter(entry => entry[1] >= 1);

    // 接着把每个条目转换为一行文本
    let lines = entries.map(([l,n]) => 
      `${l}:${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
    );

    return lines.join("\n");
  }
}

// 
async function histogramFromStdin() {
  // console.log('请输入：')
  process.stdin.setEncoding('utf-8');   // 读取Unicode字符串，而非字节
  let histogram = new Histogram();
  for await(let chunk of process.stdin) {
    histogram.add(chunk);
    return histogram;
  }
}

histogramFromStdin().then(histogram => { console.log(histogram.toString()); });