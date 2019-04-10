

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


var player1 = new Player('player1',arr1);
var player2 = new Player('player2', arr2);
var player3 = new PC('PC',arr2);


var game = {
    firstPlayer: player1,
    secondPlayer: player3,
    gameTurn: 1, // game turn will indicate whos turn it is 
    winner: null,
    name: "", // holds the name of the player
    shipArr: [{name:'Carrier',length:5},{name:'Battleship',length:4}
    ,{name:'Cruiser',length:3},{name:'Submarine',length:3},
    {name:'Destroyer',length:2}] // shipArr is an array that holds the arr of ships and the health of each one
   
}

//temporary variables go here
const numOfShips = 6; // temporary variable that determines how many ships                          are going to be placed


//create an object that will hold the ship and all the info about it

//this function will fill empty everywhere
const fillTheTableWithTheArrayV3 = (arr,table) =>{

    // console.log($(`#${table} .number-row`).html());
    for(let arrRow=0,tRow=1;arrRow<arr.length,tRow<11; arrRow++,tRow++){
        for(let i = 1,j=0;i<=10,j<arr[0].length;i++,j++){
            ($(`#${table} .${tRow}`).children().eq(i).html(" "));
        }
    }
}


//create a v2 of fillTableWithTheArray that does the same thing for the any table
const fillTheTableWithTheArrayV2 = (arr,table) =>{

    // console.log($(`#${table} .number-row`).html());
    for(let arrRow=0,tRow=1;arrRow<arr.length,tRow<11; arrRow++,tRow++){
        for(let i = 1,j=0;i<=10,j<arr[0].length;i++,j++){
            ($(`#${table} .${tRow}`).children().eq(i).html(arr[arrRow][j]));
        }
    }
}




// function that allows to place ships

const placeShip = () =>{
    $(".ship-button").click(fucntion = (e) =>{
        let shipLength = Number($(e.target).attr('length'));
        console.log(`ship length is ${shipLength}`);
        placeBoard(shipLength,'first-table',e.target);


    })
}

placeShip();

//helper function for the function above that checks if possible to place it in the given position
// function returns a true for possibility of placing the ship in the given position
// ship gives me the length of the ship
const checkShip = (arr,ship,col,row,dir) =>{
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

//fucntion that positions the ship
//arr will get the array that needs to be placed in
//ship is the type of ship that will position
//row is the row
const postionShip = (arr,ship,col,row,dir) =>{ 
    

        if(dir == "hor"){
            for(let i = 0;i < ship;i++){
                arr[col][row+i] = ship;
            }
        }
        if(dir == "ver"){

            for(let i = 0; i< ship;i++){
                arr[col + i][row] = ship;
            }
        }

    
}

//the function allows to get the clicks on the table and place the ships

let col = null;
let row = null;
const placeBoard = (length,tableID,button) =>{
    $(`#${tableID}`).click(fucntion = (e) =>{
        console.log(e.target);
        
        col = Number((e.target.getAttribute('data-col'))) - 1;
        row =($(e.target.parentElement).attr('class')).split(" "); 
        console.log(row);
        row = Number((row[0])) - 1; 
        
        console.log(returnCheckmark());

        console.log(`row is ${row} col is ${col}`);
        
        if(checkShip(arr1,length,row,col,returnCheckmark())){
            if(checkArea(arr1,length,row,col,returnCheckmark())){
                postionShip(arr1,length,row,col,returnCheckmark());
                $(button).remove();
                col = null,row = null;
                $('#first-table').off('click');
            }else{
                alert("canenont place ship there");
            }
        }else{
            alert("cannont place ship there");
        }
        
        fillTheTableWithTheArrayV2(arr1,tableID);
        
    })

}


//function that will return the vertical or horizonatal of positioning
const returnCheckmark = () =>{

    if($('input[type=checkbox]').prop('checked')){
        return 'ver';
    }else{
        return 'hor';
    }
}



console.log(arr1);


//this function uses the two previous functions and places the ships on the board
const placeShips = (arr) =>{
   let randCol,randRow,randD; // these are our rand values that will be created 

   console.log(`game.shipArr is `);
    for(let i = 0;i<game.shipArr.length;i++){
        console.log(`im placing ${game.shipArr[i].name}`)
        let length = game.shipArr[i].length;
        
        randCol = randNum(arr,length);
        randRow = randNum(arr,length);
        randD = randDir();

        while((checkArea(arr,length,randCol,randRow,randD) && 
            checkShip (arr,length,randCol,randRow,randD) )!= true)
        {
            randCol = randNum(arr,length);
            randRow = randNum(arr,length);
            randD = randDir();

        }

        postionShip(arr,length,randCol,randRow,randD);
    }

     
}

// function that creates two random numbers for col and row
// functions recieve arr and ship creates returns a col and row value

const randNum = (arr,ship) =>{
    return Math.floor(Math.random() * ((arr.length-ship) + 1));
} 

// function that returns a random direction

const randDir = () =>{
    const r = Math.floor(Math.random() * 2 + 1);
    if(r == 2 ){
        return "ver";
    }
    else{
        return "hor";
    }
}

// this function will be checking if placing the ship in the positions will be possible or not

const checkArea = (arr,ship,col,row,dir) =>{
    if(dir == "ver"){
        for(let i=0;i<ship;i++){
            if(!(arr[col + i][row] == 0)){
                return false; // return false if finds anything other than 0
            }
        }
    }
    if(dir == "hor"){
        for(let i=0;i<ship;i++){
            if(!(arr[col][row + i] == 0)){
                return false; // return false if finds anything other than 0
            }
        }
    }
return true;
}



// function that hits a ship

const hitShip = (arr,target,table) =>{
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

const pcHit = (arr,targetArr) => {

    const row = targetArr[0],col = targetArr[1];
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

const pcPlay = () =>{

    // if(player3.hitArr.length == 0){ // this will check if we hit anything
        const currentHit =randHit(player3);
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


const pcSmartHit = () => {
    // let currentArr = player3.hitArr;
    // let currentArr = [{postionions:[]}] // this is an array of objects that will hold all the values of the ship
    const currentArr = [[0,2],[1,2]];

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

const randHit = (player) =>{

    row = Math.floor(Math.random() * player3.board.length + 0);
    col = Math.floor(Math.random() * player3.board.length + 0);

    return [row,col];

}





// function that will determine if the game has ended or not
// return fakse if game is not over and returns true if game is over

const checkIfOver = (arr) => {
    
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
const checkInput = (target) =>{
    if(target.innerText == '-1'){
        return false;
    }else{
        return true;
    }
}


// function that allows us to get the clicks and make the hits
//first version that lets two player play at the same time

const getClick = (tableID,arr) => {

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

const getClick2 = (tableID,arr) => {

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


const styleBlock = (table,target,stat) => {
    const row = target[0] + 1;
    const col = target[1] + 1;

    // let rer = $(`#${table} .${row}`).children().eq(col).val();
    if(stat=='hit'){
        ($(`#${table} .${row}`).children().eq(col)).css({'pointer-events':'none','background-color':'red'});
    }else if(stat=='miss'){
        ($(`#${table} .${row}`).children().eq(col)).css({'pointer-events':'none','opacity':'0.2'});
    }


    // $target.css(;
    
    

}




const gameStatUpdater= () =>   {
    return (checkIfOver(arr1) || checkIfOver(arr2));
}

//this locks the board

const lockTheBoard = (board) =>{
    $(`#${board}`).css({'opacity':'0.5','pointer-events':'none'})
}

//this opens the board to be player

const openBoard = (board) => {
    $(`#${board}`).css({'opacity':'','pointer-events':''})
}

//this function updates whos turn it is on the html
const updateStat = () =>{
    $('#game-turn').html(`It's player #${game.gameTurn} turn`)
}

//this function updates the board based on whose turn it is
const updateBoard = () => {

    if(game.gameTurn == 1){
        lockTheBoard('first-table');
        openBoard('second-table');
    }
    else if(game.gameTurn == 2){
        lockTheBoard('second-table');
        openBoard('first-table');
    }
}









fillTheTableWithTheArrayV3(arr1,'first-table')
fillTheTableWithTheArrayV3(arr2,'second-table')



$('#play-button').click(fucntion =() =>{
    console.log("game starts");


    // getClick2('first-table',arr1);
    getClick2('second-table',arr2);
    // placeShips(arr1);
    placeShips(arr2);
    fillTheTableWithTheArrayV2(arr1,'first-table')
    fillTheTableWithTheArrayV3(arr2,'second-table')
    updateBoard();
    updateStat();
    
    
})





