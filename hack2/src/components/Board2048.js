import Row from './Row'

export default function Board2048 ({ board, gameOver}) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    if(gameOver){
        boardClassName += " game-over-board";
        infoClassName += " game-over-wrapper";
    }
    
    return (
        <>
        <table className={boardClassName} id="board-full">
            <tbody>
                {board.map((row_vector, row_idx) => (<Row key={row_idx} row_idx={row_idx} value={row_vector}/>))}
            </tbody>
        </table>
        <div className={infoClassName} id="game-over-info">
            <span id="game-over-text">{outSentence}</span>
            <div className="button" id="game-over-button">Try again</div>
        </div>
        </>
    );
};