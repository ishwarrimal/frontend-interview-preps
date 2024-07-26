class Emitter{
    constructor(){
        this.subscriptionMap = new Map()
    }
    subscribe(event, callback){
        console.log(this)
        const subList = this.subscriptionMap.get(event) || []
        subList.push(callback)
        this.subscriptionMap.set(event, subList)
        return {
            that: this,
            release(){
                let newSubList = subList.filter((sub) => sub !== callback)
                this.that.subscriptionMap.set(event, newSubList)
            }
        }
    }
    emit(event, ...args){
        const subList = this.subscriptionMap.get(event) || []
        subList.forEach(cb => {
            cb(args[0])
        })
    }

}

const emitter = new Emitter();

const sub1  = emitter.subscribe('event1', (e)=> {console.log(1, e)})
const sub2 = emitter.subscribe('event2', (e)=> {console.log(2, e)})
const sub3 = emitter.subscribe('event1', (e)=> {console.log(12, e)})

emitter.emit('event1', 'Apple')

sub3.release()

emitter.emit('event1', 'Apple')
