const btnNext = document.getElementById('next');
const btnBack = document.getElementById('back');

let currentActive = 0;

document.getElementById('back').style.display = 'none';
btnNext.addEventListener('click', nextClick);
btnBack.addEventListener('click', backClick);

function nextClick(){
    currentActive++;
    const items = Array.from(document.getElementsByClassName('item'));

    if(currentActive > items.length){
        currentActive = items.length;
    }

   items.forEach((item) => {
        const itemAttribute = item.getAttribute('data-step');
        /* console.log(index);
        console.log(item);
        console.log(itemAttribute);
        console.log(item.classList.value); */

       if((itemAttribute === '2') & (currentActive === 1)){
            item.classList.add('active');
            btnBack.style.display = 'block';
            return
       }    
       if((itemAttribute === '3') & (currentActive === 2)){
        item.classList.add('active');
        return
       }      
       if((itemAttribute === '4') & (currentActive === 3)){
        item.classList.add('active');
        return
       }  
    }) 
    console.log(currentActive);
}

function backClick(){
    currentActive--;
    const items = Array.from(document.getElementsByClassName('item'));

    if(currentActive === 0){
        btnBack.style.display = 'none';
    }
    
    items.forEach((item) => {
        const itemAttribute = item.getAttribute('data-step');
        /* console.log(index);
        console.log(item);
        console.log(itemAttribute);
        console.log(item.classList.value); */

       if((itemAttribute === '2') & (currentActive === 0)){
            item.classList.remove('active');
            return
       }    
       if((itemAttribute === '3') & (currentActive === 1)){
        item.classList.remove('active');
        return
       }      
       if((itemAttribute === '4') & (currentActive === 2)){
        item.classList.remove('active');
        return
       }  
    }) 

    
    

    console.log(currentActive);   
    
}