
export function sortJson(list, criteria) {
    switch(criteria){
        case 'roi':
            list.sort(function(a, b){return b[criteria]-a[criteria];});//descending order
            break;
        case 'time':
            list.sort(function(a, b){return a[criteria]-b[criteria];});//ascending order
            break;
        case 'profit':
            list.sort(function(a, b){return b[criteria]-a[criteria];});//descending order
            break;
        case 'carrying_capacity':
            list.sort(function(a, b){return a[criteria]-b[criteria];});//ascending order
            break;
      
    }
    
}
