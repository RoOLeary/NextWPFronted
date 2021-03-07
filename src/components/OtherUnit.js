const OtherUnit = (props) => {
    console.log(props);
    
    return(
        <div className="OtherUnit">
            <p>Suck my {props.data ? props.data : 'BALLS'}</p>
        </div>
    )
}

export default OtherUnit;