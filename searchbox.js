let avalibleKeywords = [
    'who is Bookworm',
    'Inflatable',	
    'Salesclerk',
    'Butterscotch',	
    'Inimical',	
    'Snapshot',
    'buy a Camera',	
    'Interim',	
    'Shellfish',
    'Campus',	
    'Invest',	
    'Ship'
];
/*
inputBox.onkeyup =
*/
const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("inputbox");
console.log(inputBox.value);
inputBox.addEventListener("keyup", a1())
function a1(){
        let result = [];
        let input = inputBox.value;
        
        if(input.length >0){console.log(input)
            console.log(inputBox.value);
            result  = avalibleKeywords.filter((keyword)=>{
                return keyword.toLowerCase().includes(input.toLowerCase());

            });
            console.log(result);
            
        }
         display(result);
    
        if(!result.length){
            resultsBox.innerHTML = '';
            
        }
    }
function display(result){
        const content = result.map((list)=>{
            return "<li onclick=selectInput(this)>" + list + "</li>";
        })
    
        resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>"
    } 
function selectInput(list){
    
        inputBox.value = list.innerHTML;
        resultsBox.innerHTML = '';
    }   