import {TeamType, PieceType,Piece } from "../components/Chessboard/Chessboard";

export default class Referee{

    isTileOccupied(x:number,y:number, boardstate:Piece[]):boolean{
        console.log ("CHECKING TILE IS OCCUPIED OR NOT");
        const piece = boardstate.find((p)=> p.x===x && p.y===y);
        if(piece){
            return true;
        }
        return false;
    }





    isValidMove(px:number,py:number,x:number,y:number,type: PieceType, team :TeamType,boardstate:Piece[]){
        console.log("Referee is checking the moves");
        console.log("prev ", px, py,"current " ,x, y, "type ",type, "TEAMM---",team)
        
        
        if(type === PieceType.PAWN){
            if(team === TeamType.OUR){
                if(px===x && ((y-py===1 || y-py===2 && py ===1) || (y-py===1)) && !this.isTileOccupied(x,y,boardstate)){
                    console.log("VALID MOVE");
                    return true;
                }
            }else{
                if(px===x && ((py-y===1 || py-y===2 && py ===6) || (py-y===1)) && !this.isTileOccupied(x,y,boardstate)){
                    console.log("VALID MOVE");
                    return true;
                }

            }
        }
        
        return false;

    }
}
