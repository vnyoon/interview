class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);

      // 更新最近使用的顺序
      this.cache.delete(key);
      this.cache.set(key, value);

      return value;
    }

    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) { 
      // 存在则删除，需要更新； 
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 达到容量上限时，删除最近最久未使用的元素
      const unusedKey = this.cache.keys().next().value;
      this.cache.delete(unusedKey);
    };

    // 插入新值
    this.cache.set(key, value);
  }
};

const cache = new LRUCache(2);

// console.log(cache.get(1));  // 返回  -1 (未找到)

cache.put(1, 'aaa');
cache.put(2, 'bbb');

console.log(cache.get(1));  // 返回  'aaa'
console.log(cache.get(2));  // 返回  'bbb'


cache.put(3, 'ccc'); // 容量已满，移除 key 为 1 的缓存项

console.log(cache.get(1));  // 返回 -1 (未找到)

console.log(cache.get(3));  // 返回  'ccc'

console.log(cache);
// LRUCache { capacity: 2, cache: Map(2) { 2 => 'bbb', 3 => 'ccc' } }
