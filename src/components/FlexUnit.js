const FlexUnit = (props) => {
    console.log(props);
    return(
        <div className="FlexUnit" id={props.id}>
            <p>{props.data}</p>
        </div>
    )
}

export default FlexUnit;