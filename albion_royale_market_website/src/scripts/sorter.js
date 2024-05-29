
export function sortJson(list, criteria) {
    switch(criteria){
        case 'roi':
            list.sort(function(a, b){return b[1][criteria]-a[1][criteria];});//descending order
            break;
        case 'time':
            list.sort(function(a, b){return a[1][criteria]-b[1][criteria];});//ascending order
            break;
        case 'profit':
            list.sort(function(a, b){return b[1][criteria]-a[1][criteria];});//descending order
            break;
        case 'carrying_capacity':
            list.sort(function(a, b){return a[1][criteria]-b[1][criteria];});//ascending order
            break;
      
    }
    return list;
    
}
