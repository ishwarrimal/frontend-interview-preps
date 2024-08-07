/**
 * Retrieves a value from a nested object using a dot-notated path or an array index.
 *
 * @param {object} obj - The object to retrieve the value from.
 * @param {...string} paths - One or more dot-notated paths or array indices to retrieve the value.
 * @returns {*} The retrieved value, or `undefined` if the path does not exist.
 *
 * This function allows you to retrieve a value from a nested object using a dot-notated path,
 * such as `a.b.c`, or an array index, such as `a[0].b`. You can pass one or more paths as
 * separate arguments.
 *
 * For example:
 * ```
 * const obj = { a: { b: { c: 1 } }, d: [{ e: 2 }] };
 * get(obj, 'a.b.c'); // returns 1
 * get(obj, 'd[0].e'); // returns 2
 * get(obj, 'x.y.z'); // returns undefined
 * ```
 */
function get(obj, ...paths){
    for(let arg of paths){
        helper(arg)
    }
    function helper(arg){
        const keyList = arg.split('.')
        for(let key of keyList){
            if(key.includes('[')){
                const newK = key.substring(0,key.indexOf('['))
                const index = key.substring(key.indexOf('[')+1, key.length-1)
                obj = obj[newK][index]
            }else{
                obj = obj[key]
            }
            if(obj === undefined){
                return undefined
            }
        }
    }
    return obj
}
