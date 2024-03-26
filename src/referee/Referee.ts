import { PieceType , TeamType , Piece } from "../components/Chessboard/Chessboard";

export default class Referee{

    tileIsOccupied(x : number, y : number , boardState : Piece[]):boolean{
        console.log('checking isOccupied Function') ;
        const piece = boardState.find(p => p.x === x && p.y === y);
        if(piece){
            return true ;
        }
        else {
            return false ;
        }
    }

    isValidMove(px : number , py : number ,x : number , y : number , type : PieceType , team : TeamType , boardState : Piece[]){
        console.log("Referee is checking the move...");
        console.log("Previous Location is " + px + " " + py);
        console.log("Current Location is " + x + " " + y);
        console.log("Piece type is " + type);
        console.log("Team type is " + team);
        

        if(type === PieceType.PAWN){
            if(team === TeamType.OUR){
                if(py===1){
                    if(px === x && (y-py===1)){
                        if(!this.tileIsOccupied(x , y , boardState)) {
                            return true ;
                        }
                    }
                    else if(y - py === 2 ){
                        if(!this.tileIsOccupied(x , y , boardState) && !this.tileIsOccupied(x , y-1 , boardState)) {
                            return true ;
                        }
                    }
                }
                else {
                    if(px === x && (y-py===1)){
                        if(!this.tileIsOccupied(x , y , boardState)) {
                            return true ;
                        }
                    }
                }
            }
            // OPPONENT MOVEMENT
            else {
                if(py===6){
                    if(px === x && ( py - y===1)){
                        if(!this.tileIsOccupied(x , y , boardState)) {
                            return true ;
                        }
                    }
                    else if(py - y === 2){
                        if(!this.tileIsOccupied(x , y , boardState) &&!this.tileIsOccupied(x , y +1  , boardState)) {
                            return true ;
                        }
                    }
                }
                else {
                    if(px === x && (py - y===1)){
                        if(!this.tileIsOccupied(x , y , boardState)) {
                            return true ;
                        }
                    }
                }
            }
        }
        return false ;
    }
}