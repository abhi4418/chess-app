import { PieceType , TeamType , Piece } from "../components/Chessboard/Chessboard";

export default class Referee{

    tileIsOccupied(x : number, y : number , boardState : Piece[]):boolean{
        // console.log('checking isOccupied Function') ;
        const piece = boardState.find(p => p.x === x && p.y === y);
        if(piece){
            return true ;
        }
        else {
            return false ;
        }
    }
    tileIsOccupiedByOpponent(x:number , y:number ,boardState:Piece[] , team:TeamType) :boolean{
        const piece = boardState.find((p)=>p.x===x && p.y ===y  && p.team!==team);
        if(piece){
            return true;
        }else{
            return false;
        }
    }

    isValidMove(px : number , py : number ,x : number , y : number , type : PieceType , team : TeamType , boardState : Piece[]){
        // console.log("Referee is checking the move...");
        // console.log("Previous Location is " + px + " " + py);
        // console.log("Current Location is " + x + " " + y);
        // console.log("Piece type is " + type);
        // console.log("Team type is " + team);
        

        if(type === PieceType.PAWN){
            const specialRow = team === TeamType.OUR ? 1: 6;
            const pawnDirection = team === TeamType.OUR ? 1:-1;
            
            // MOVEMENT LOGIC OF PAWN
            if(px === x &&py === specialRow&& (y-py===2*pawnDirection)){
                if(!this.tileIsOccupied(x , y , boardState) && !this.tileIsOccupied(x,y-pawnDirection,boardState)) {
                    return true ;
                }
            }else if(px ===x &&  y-py === pawnDirection){
                if(!this.tileIsOccupied(x , y , boardState) ) {
                    return true ;
                }
            }
            // ATTACK LOGIC OF PAWN
            else if(x -px === -1 &&  y- py === pawnDirection ){
                // ATTACK IN UPPER LEFT OR BOTTOM LEFT
                // console.log("UPPER/BOTTOM LEFT");

                if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                    console.log("WE CAN STRIKE THE ENEMY");
                    return true;
                }
            }else if(x-px === 1 && y-py === pawnDirection){
                // ATTACK IN UPPER RIGHT OR BOTTOM RIGHT
                // console.log("UPPER/BOTTOM RIGHT");
                if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
                    console.log("WE CAN STRIKE THE ENEMY");
                    return true;
                }
            }

            
        }
        return false ;
    }
}
