class myArray{
    constructor(){
        this.arr  = new Array();
    }

    valueOf(){
        return this.arr;
    }

    add(value){
        this.arr.push(value);
    }

    reduce(func){
        let temp = this.arr[0];

       for(let i=1; i < this.arr.length ;i++){
            temp += func(this.arr[0],this.arr[i],i,this.arr);
            temp  -= this.arr[0] ;
        }

        return temp;
    }   

    splice(start, deleteCount = 0){
        let temp = [];
        const NOTICE = deleteCount;

        for(let i= 0; i<this.arr.length ; i++){ 
            if(start <= i && deleteCount > 0 && NOTICE > 0){
                temp.push(this.arr[i]);
                deleteCount = deleteCount - 1; 
            }else if(start <= i && deleteCount === 0 && NOTICE === 0){
                temp.push(this.arr[i]);
            }
        }

        return temp;
       
    }

    slice(start, end = 0){
        let temp = [];

        for(let i= 0; i<this.arr.length ; i++){ 
            if(start <= i && i < end){
                temp.push(this.arr[i]); 
            }
        }

        return temp;
      
    }

    map(func){
        for(let i=0; i< this.arr.length;i++){
            func(this.arr[i], i);
        }
    }

    filter(func){
        let temp = [];
        for(let i=0; i< this.arr.length;i++){
           if(func(this.arr[i], i) !== false){
               temp.push(this.arr[i]);
           }
        }
        return temp;
    }

    join(value){
        let temp= this.arr[0];
        
        for(let i=1; i< this.arr.length; i++){
            temp += value +this.arr[i];
        }
        return temp;
    
    }
}

var arr = new myArray();
arr.add(29.76);
arr.add(41.85);
arr.add(46.5);


console.log(arr);

console.log( arr.filter(function(value, index){
     return value < 30; 
     }))

console.log(arr.reduce(function(total,amount,index,array){
    return total + amount;
}))

console.log(arr.slice(1,5));

console.log(arr.splice(2,4));

arr.map(function(value, index){
    console.log(value, index);
})

console.log(arr.join(","));