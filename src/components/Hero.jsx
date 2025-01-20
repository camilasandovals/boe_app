export default function Hero() {
    return (
        <header>
            <div className="video-container">
                <video autoPlay playsInline muted loop>
                    <source src="./images/video.mp4" type="video/mp4" />
                </video>
                <div className="video-content">
                    <h2>No college degree? </h2>
                    <h2>No problem!</h2>
                </div>
            </div>
        </header>
    )
}
