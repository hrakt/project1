

var arr1 = [
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]];

var arr2 = [
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]];
    



//temporary variables go here
const numOfShips = 6; // temporary variable that determines how many ships                          are going to be placed



//function fills the given array in the html table
let fillTheTableWithTheArray = (arr) =>{

    for(let arrRow=0,tRow=1;arrRow<arr1.length,tRow<11; arrRow++,tRow++){
        for(let i = 1,j=0;i<=10,j<arr[0].length;i++,j++){
            ($(`.${tRow}-row`).children().eq(i).html(arr[arrRow][j]));
        }
    }
}





//function that returns which square was clicked
let returnIndex= () => {
    $("table").click(fucntion = (e) =>{
        console.log(e.target);
        console.log(e.target.parentElement);
    })

}
returnIndex();


//fucntion that positions the ship
//arr will get the array that needs to be placed in
//ship is the type of ship that will position
//row is the row
let postionShip = (arr,ship,col,row,dir) =>{ 
    if(checkShip(arr,ship,col,row,dir)){
        if(dir == "hor"){
            for(let i = 0;i < ship;i++){
                arr[col][row+i] = ship;
            }
        }
        if(dir == "ver"){
            for(let i = 0; i< ship;i++){
                arr[col+i][row] = ship;
            }
        }
    }
    


}

//helper function for the function above that checks if possible to place it in the given position
// function returns a true for possibility of placing the ship in the given position
// ship gives me the length of the ship
let checkShip = (arr,ship,col,row,dir) =>{
    if(dir == "hor"){
        if(row+ship <= arr[col].length){
            return true;
        }
        else{
            return false;
        }
        
    }
    else if(dir == "ver"){
        if(col+ship<=arr.length){
            return true;         
        }
        else{
            return false;

        }
    }
    else{
        console.log('not a known direction');
    }


}
console.log(arr1);

//this function uses the two previous functions and places the ships on the board
let placeShips = (arr) =>{
   let randCol,randRow,randD; // these are our rand values that will be created 
    for(let i = 1;i<=numOfShips;i++){
        randCol = randNum(arr1,i);
        randRow = randNum(arr1,i);
        randD = randDir();

        while((checkArea(arr1,i,randCol,randRow,randD) && 
            checkShip (arr1,i,randCol,randRow,randD) )!= true)
        {
            randCol = randNum(arr1,i);
            randRow = randNum(arr1,i);
            randD = randDir();

        }

        postionShip(arr1,i,randCol,randRow,randD);
    }

     
}

// function that creates two random numbers for col and row
// functions recieve arr and ship creates returns a col and row value

let randNum = (arr,ship) =>{
    return Math.floor(Math.random() * ((arr.length-ship) + 1));
} 

// function that returns a random direction

let randDir = () =>{
    let r = Math.floor(Math.random() * 1)
    if(r == 1 ){
        return "vir";
    }
    else{
        return "hor";
    }
}

// this function will be checking if placing the ship in the positions will be possible or not

let checkArea = (arr,ship,col,row,dir) =>{
    if(dir == "ver"){
        for(let i=0;i<ship;i++){
            if(arr[col + i][row] != 0){
                return false; // return false if finds anything other than 0
        }
    }
}
    if(dir == "hor"){
        for(let i=0;i<ship;i++){
            if(arr[col][row + i] != 0){
                return false; // return false if finds anything other than 0
            }
        }
    }
return true;
}





placeShips(arr1);


fillTheTableWithTheArray(arr1);





