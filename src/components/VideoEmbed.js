const VideoEmbed = (props) => {
   
    
    return(
        <div className="VideoEmbed">
            <iframe width="560" height="315" src={props.data} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default VideoEmbed;