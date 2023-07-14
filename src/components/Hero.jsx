export default function Hero() {
    return (
        <header>
            <div className="video-container">
                <video autoPlay playsInline muted loop>
                    <source src="./images/video.mp4" type="video/mp4" />
                </video>
                <div className="video-content">
                    <h1>No college degree? </h1>
                    <h1>No problem!</h1>
                </div>
            </div>
        </header>
    )
}
