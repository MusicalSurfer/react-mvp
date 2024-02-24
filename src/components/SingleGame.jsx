const SingleGame = ({ singleGame }) => {
    return (
        <>
            <h1>{singleGame.name}</h1>
            <h3>Genre: {singleGame.genre}</h3>
        </>
    )
}
export default SingleGame;