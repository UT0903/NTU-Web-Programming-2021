export default function Header({steps, qs, reset, best_qs}){

    return (
        <>
        <h1 id="title">Merging School</h1>
        <div className="btn-groups">
            <div className="qs-ranking" id="general-qs-ranking">QS: <p id="general-qs-ranking-value">{qs}</p></div>
            <div className="qs-ranking" id="general-step">Step: <p id="general-step-value">{steps}</p></div>
            <div className="qs-ranking" id="best-qs-ranking">Best: <p id="best-qs-ranking-value">{best_qs}</p></div>
            <div className="button" id="reset-button" onClick={reset}>New Game</div>
        </div>
        </>
    );
}