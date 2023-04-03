export default class Storage {
    /**
     * 构造函数
     * @param {chrome.storage.LocalStorageArea} storageArea 存储区域
     */
    constructor(storageArea) {
        this.storageArea = storageArea || chrome.storage.local;
    }
    /**
     * 获取多个键值对
     * @param {string|string[]|{[key: string]: any} | null} keys 
     * @param {(items:{[key:string]:any})=>void} callback 
     */
    get(keys, callback) {
        this.storageArea.get(keys, function (items) {
            var result = {};
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    result[key] = items[key];
                }
            }
            callback(result);
        });
    }
    /**
     * 设置多个键值对
     * @param {{[key:string]:any}} items 
     * @param {()=>void} callback 
     */
    set(items, callback) {
        this.storageArea.set(items, callback);
    }
    /**
     * 移除多个键值对
     * @param {string | string[]} keys 
     * @param {()=>void} callback 
     */
    remove(keys, callback) {
        this.storageArea.remove(keys, callback);
    }
    /**
     * 清空存储区域
     * @param {()=>void} callback 
     */
    clear(callback) {
        this.storageArea.clear(callback);
    };
}





