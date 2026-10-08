function removeDuplicates(arr){

    let unique = [];

    for(let i = 0; i < arr.length; i++){
        if(!unique.includes(arr[i])){
            unique.push(arr[i])
        }
    }

    return unique;
}

console.log(removeDuplicates([1,2,2,3,3,4,4,1]))