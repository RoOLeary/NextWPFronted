const CalloutUnit = (props) => {
    console.log(props);
    let selectedArticles = props.data.selectArticles;
    
    return(
        <div className="Calloutunit">
            <main className="contentArea">
                <ul>
                {selectedArticles.map((s, i) => {
                    return (
                        <li key={i}><a href={'blog/' + s.slug}>{s.title}</a></li>
                    );
                })}
                </ul>
            </main>
        </div>
    )
}

export default CalloutUnit;