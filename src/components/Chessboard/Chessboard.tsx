import React, { useRef, useState } from "react"
import "./Chessboard.css"
import Tile from "../Tiles/Tile"
// const VerticalAxis  = ["1","2","3","4","5","6","7","8"];
// const HorizontalAxis = ["a","b","c","d","e","f","g","h"];

interface Piece {
    image: string
    x: number
    y: number
}

const initialBoardState : Piece[] = [] ;

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "../../src/assets/pawn_b.png", x: i, y: 6 })
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: "../../src/assets/pawn_w.png", x: i, y: 1 })
}
for (let i = 0; i < 2; i++) {
    const str = i === 0 ? "b.png" : "w.png"
    const y_cordinate = i === 0 ? 7 : 0
    initialBoardState.push({ image: "../../src/assets/rook_" + str, x: 0, y: y_cordinate })
    initialBoardState.push({ image: "../../src/assets/rook_" + str, x: 7, y: y_cordinate })
    initialBoardState.push({
        image: "../../src/assets/bishop_" + str,
        x: 2,
        y: y_cordinate,
    })
    initialBoardState.push({
        image: "../../src/assets/bishop_" + str,
        x: 5,
        y: y_cordinate,
    })
    initialBoardState.push({
        image: "../../src/assets/queen_" + str,
        x: 3,
        y: y_cordinate,
    })
    initialBoardState.push({ image: "../../src/assets/king_" + str, x: 4, y: y_cordinate })
    initialBoardState.push({
        image: "../../src/assets/knight_" + str,
        x: 1,
        y: y_cordinate,
    })
    initialBoardState.push({
        image: "../../src/assets/knight_" + str,
        x: 6,
        y: y_cordinate,
    })
}

export default function Chessboard() {
    const [activePiece , setActivePiece] = useState<HTMLElement | null>(null) ;
    const [gridX , setGridX] = useState(0) ;
    const [gridY , setGridY] = useState(0) ; 
    const [pieces , setPieces] = useState<Piece[]>(initialBoardState) ;
    const chessboardRef = useRef<HTMLDivElement>(null)

    function grabPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current ;
        const element = e.target as HTMLElement
        if (element.classList.contains("chess-piece") && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft)/100)) ;
            setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100))) ;
            const x = e.clientX - 50
            const y = e.clientY - 50
            element.style.position = "absolute"
            element.style.left = `${x}px`
            element.style.top = `${y}px`
            setActivePiece(element)
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const minx = chessboard.offsetLeft - 25
            const maxy = chessboard.offsetTop + chessboard.clientHeight - 75

            const maxx = chessboard.offsetLeft + chessboard.clientWidth - 75
            const miny = chessboard.offsetTop - 25

            const x = e.clientX - 50
            const y = e.clientY - 50
            activePiece.style.position = "absolute"
            // activePiece.style.left =`${x}px`;
            // activePiece.style.top =`${y}px`;
            if (x < minx) {
                activePiece.style.left = `${minx}px`
            } else if (x > maxx) {
                activePiece.style.left = `${maxx}px`
            } else {
                activePiece.style.left = `${x}px`
            }

            if (y < miny) {
                activePiece.style.top = `${miny}px`
            } else if (y > maxy) {
                activePiece.style.top = `${maxy}px`
            } else {
                activePiece.style.top = `${y}px`
            }
        }
    }

    function dropPieces(e: React.MouseEvent) {
        const chessboard = chessboardRef.current ;
        if (activePiece && chessboard) {
            const x= Math.floor((e.clientX - chessboard.offsetLeft)/100);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100)) ;
            setPieces((value)=>{
                const pieces = value.map((p)=>{
                    if(p.x==gridX && p.y==gridY){
                        p.x = x ;
                        p.y = y ;
                    }
                    return p ;
                })
                return pieces ;
            })
            setActivePiece(null) ;
        }

    }

    let board = []

    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            const number = i + j
            let image = undefined
            pieces.forEach((p) => {
                if (p.x === j && p.y === i) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${i},${j}`} image={image} number={number} />)
        }
    }

    return (
        <div
            onMouseMove={(e) => movePiece(e)}
            onMouseDown={(e) => grabPiece(e)}
            onMouseUp={(e) => dropPieces(e)}
            id="Chessboard"
            ref={chessboardRef}
        >
            {board}
        </div>
    )
}
