
const Square = (props) => {
    const { value, onClickHandle } = props

    return (
        <button className="square" onClick={onClickHandle}>
            {value}
        </button>
    )
}

export default Square