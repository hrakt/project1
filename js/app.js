

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


//create an object that will hold the ship and all the info about it

//this function will fill empty everywhere
let fillTheTableWithTheArrayV3 = (arr,table) =>{

    // console.log($(`#${table} .number-row`).html());
    for(let arrRow=0,tRow=1;arrRow<arr.length,tRow<11; arrRow++,tRow++){
        for(let i = 1,j=0;i<=10,j<arr[0].length;i++,j++){
            ($(`#${table} .${tRow}`).children().eq(i).html(" "));
        }
    }
}


//create a v2 of fillTableWithTheArray that does the same thing for the any table
let fillTheTableWithTheArrayV2 = (arr,table) =>{

    // console.log($(`#${table} .number-row`).html());
    for(let arrRow=0,tRow=1;arrRow<arr.length,tRow<11; arrRow++,tRow++){
        for(let i = 1,j=0;i<=10,j<arr[0].length;i++,j++){
            ($(`#${table} .${tRow}`).children().eq(i).html(arr[arrRow][j]));
        }
    }
}




//function that returns which square was clicked


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
        randCol = randNum(arr,i);
        randRow = randNum(arr,i);
        randD = randDir();

        while((checkArea(arr,i,randCol,randRow,randD) && 
            checkShip (arr,i,randCol,randRow,randD) )!= true)
        {
            randCol = randNum(arr,i);
            randRow = randNum(arr,i);
            randD = randDir();

        }

        postionShip(arr,i,randCol,randRow,randD);
    }

     
}

// function that creates two random numbers for col and row
// functions recieve arr and ship creates returns a col and row value

let randNum = (arr,ship) =>{
    return Math.floor(Math.random() * ((arr.length-ship) + 1));
} 

// function that returns a random direction

let randDir = () =>{
    let r = Math.floor(Math.random() * 2 + 1);
    if(r == 2 ){
        return "ver";
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



// function that hits a ship

let hitShip = (arr,target,table) =>{
    let col = Number((target.getAttribute('data-col'))) - 1;
    let row =($(target.parentElement).attr('class')).split(" "); // because we get the class name as a string we use split to get am array and get the first element of the array

    
    
        row = Number(row[0]) - 1; 


        if(arr[row][col] != 0 ){
            arr[row][col] = -1;
            // fillTheTableWithTheArrayV2(arr,table);
            console.log(`table is ${table} and row is ${row} col is ${col}`)
            styleBlock(table,[row,col],'hit');
            if(checkIfOver(arr) == true){
                game.winner = game.gameTurn;
                console.log("game is over");
            }
            else{
                console.log("im checking and its not over")
            }

        }else{
            alert("Oops, you missed!")
            styleBlock(table,[row,col],'miss');
        }
    
    if(game.winner != null){
        alert(`Player #${game.gameTurn} wins the game.`);

        lockTheBoard('first-table');
        lockTheBoard('second-table');
    }

}

//this hits the board for the PC

let pcHit = (arr,targetArr) => {

    let row = targetArr[0],col = targetArr[1];
    if(arr[row][col] != 0){
        arr[row][col] = -1
        player3.hitArr.push([row,col]);
        styleBlock('first-table',[row,col],'hit');
        fillTheTableWithTheArrayV2(player1.board,'first-table');
        if(checkIfOver(arr) == true){
            game.winner = game.gameTurn;
            console.log("game is over");
        }
        else{
            console.log("im checking and its not over")
        }
    }else{
        alert ("PC missed");
        styleBlock('first-table',[row,col],'miss');
        
    }

}





//the AI for the game: easy mode will just be picking random spots to shoot
// 

let pcPlay = () =>{

    // if(player3.hitArr.length == 0){ // this will check if we hit anything
        let currentHit =randHit(player3);
        while(player3.playedArr.includes(currentHit)){
            currentHit = randHit(player3);
        }
        console.log(currentHit);
        player3.playedArr.push(currentHit);
        pcHit(player1.board,currentHit);
    // }else{ 

    //     let currentHit = pcSmartHit();
    // }

}

// function that will determine based on the hitArr where to hit next


let pcSmartHit = () => {
    // let currentArr = player3.hitArr;
    // let currentArr = [{postionions:[]}] // this is an array of objects that will hold all the values of the ship
    let currentArr = [[0,2],[1,2]];

}


// if(currentArr[i].includes(0)){
//     //     if(currentArr[i][0] == 0){
//     //         if(currentArr[i][1] == 0){
//     //             if(randDir() == 'hor'){
//     //                 return [0,1];
//     //             }else{
//     //                 return [1,0]
//     //             }
//     //         }else if(currentArr[i][1] == 9){
//     //             if(randDir() == 'hor'){
//     //                 return [0,8];
//     //             }else{
//     //                 return [1,9]
//     //             }
//     //         }
//     //     }else{
//     //         if(ra)
//     //     }
// will return us the random position that needs to be checked and check if the position has already been hit or not

let randHit = (player) =>{

    row = Math.floor(Math.random() * player3.board.length + 0);
    col = Math.floor(Math.random() * player3.board.length + 0);

    return [row,col];

}





// function that will determine if the game has ended or not
// return fakse if game is not over and returns true if game is over

let checkIfOver = (arr) => {
    
    for(let i = 0; i<arr.length;i++){
        for(let j = 0;j<arr[i].length; j++){
            if(arr[i][j] != -1){
                if(arr[i][j] != 0){
                    return false;
                }
            }
        }
    }
    return true;
    
}

//function that checks if the clicked input is valid or not
//returns false for invalid input,return true for valid input
let checkInput = (target) =>{
    if(target.innerText == '-1'){
        return false;
    }else{
        return true;
    }
}


// function that allows us to get the clicks and make the hits
//first version that lets two player play at the same time

let getClick = (tableID,arr) => {

        $(`#${tableID}`).click(fucntion = (e) =>{
            console.log(checkInput(e.target));
            if(checkInput(e.target)){
                hitShip(arr,e.target,tableID);
                if(tableID == 'first-table'){
                    game.gameTurn -=1;
                }else if(tableID == 'second-table'){
                    game.gameTurn += 1;
                }
                updateBoard();
                updateStat();
            }
            else{
                alert('Please select a valid box');
            }
        })

}


// getClick function that lets you play againgst the PC

let getClick2 = (tableID,arr) => {

    $(`#${tableID}`).click(fucntion = (e) =>{
        console.log(checkInput(e.target));
        if(checkInput(e.target)){
            hitShip(arr,e.target,tableID);

            updateBoard();
            updateStat();
        }
        else{
            alert('Please select a valid box');
        }
        pcPlay();
    })

   

}



// getClick();

// this function will make the block render red or disablde based on if hit or miss


let styleBlock = (table,target,stat) => {
    let row = target[0] + 1;
    let col = target[1] + 1;

    // let rer = $(`#${table} .${row}`).children().eq(col).val();
    if(stat=='hit'){
        ($(`#${table} .${row}`).children().eq(col)).css({'pointer-events':'none','background-color':'red'});
    }else if(stat=='miss'){
        ($(`#${table} .${row}`).children().eq(col)).css({'pointer-events':'none','opacity':'0.2'});
    }


    // $target.css(;
    
    

}




let gameStatUpdater= () =>   {
    return (checkIfOver(arr1) || checkIfOver(arr2));
}

//this locks the board

let lockTheBoard = (board) =>{
    $(`#${board}`).css({'opacity':'0.5','pointer-events':'none'})
}

//this opens the board to be player

let openBoard = (board) => {
    $(`#${board}`).css({'opacity':'','pointer-events':''})
}

//this function updates whos turn it is on the html
let updateStat = () =>{
    $('#game-turn').html(`It's player #${game.gameTurn} turn`)
}

//this function updates the board based on whose turn it is
let updateBoard = () => {

    if(game.gameTurn == 1){
        lockTheBoard('first-table');
        openBoard('second-table');
    }
    else if(game.gameTurn == 2){
        lockTheBoard('second-table');
        openBoard('first-table');
    }
}

// creating a class that will hold all the information
// this player class will keep track of the table for each player
// it will also carry the name and most of the functions that allow us to place ships 
class Player  {
    constructor(name,board){
        this.name = name;
        this.board = board;
        
    }  
    returnGameStatus(){
        return checkIfOver(this.board); 
    }

}

class PC extends Player {
    constructor(name,board){
        super(name,board);
        this.playedArr = [];
        this.hitArr = [];
    }
}


player1 = new Player('player1',arr1);
player2 = new Player('player2', arr2);
player3 = new PC('PC',arr2);


var game = {
    firstPlayer: player1,
    secondPlayer: player3,
    gameTurn: 1, // game turn will indicate whos turn it is 
    winner: null,
    name: "", // holds the name of the player
    shipArr: [] // shipArr is an array that holds the arr of ships and the health of each one
   
}


fillTheTableWithTheArrayV2(arr1,'first-table')
fillTheTableWithTheArrayV3(arr2,'second-table')



$('#play-button').click(fucntion =() =>{
    console.log("game starts");


    // getClick2('first-table',arr1);
    getClick2('second-table',arr2);
    placeShips(arr1);
    placeShips(arr2);
    fillTheTableWithTheArrayV2(arr1,'first-table')
    fillTheTableWithTheArrayV3(arr2,'second-table')
    updateBoard();
    updateStat();
    
    
})





