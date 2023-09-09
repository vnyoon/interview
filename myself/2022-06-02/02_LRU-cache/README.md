## 运用你所掌握的数据结构，设计和实现一个 LRU 缓存机制
Least Recently Used(最近最少使用)：
  * LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存；
  * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1；
  * void put(int key, int value) 如果关键字已经存在，则变更其数据值。如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间；

```javascript
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
```

上面示例中使用 `Map` 数据结构来存储缓存项，其中键为缓存的键，值为缓存的数据。**LRU 缓存机制** 通过在 `get` 方法中更新最近使用的顺序，将最新访问的缓存项放到 `Map` 的*末尾*。在 `put` 方法中，如果容量已满，会先删除最久未使用的缓存项(*第一项*)，然后再插入新的缓存项；

这个简单的实现可以作为 LRU 缓存机制的基础，可以根据需要对其进行扩展和优化；

> 其中关于 [next()](https://juejin.cn/post/7173534873246760968#heading-6) 方法。
