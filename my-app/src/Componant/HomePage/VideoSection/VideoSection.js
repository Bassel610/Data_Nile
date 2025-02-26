import Vid from '../../../Media/pexels-rodnae-productions-7947406 (Original).mp4'
function VideoSection () {
    return (
        <>
            <div className="VideoSection" style={{width: "99.5%",height: "832px", position: "relative",left: ".5%", top: "148px"}}> 
            <video autoPlay loop muted style={{width: "100%",height: "100%"}}>
                <source  src={Vid} type="video/mp4" />
            </video>
            </div>
        </>
    )
}

export default VideoSection;