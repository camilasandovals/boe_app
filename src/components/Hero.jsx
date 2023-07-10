import React, { useRef, useEffect } from 'react';
export default function Hero() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.play();
        }
    }, []);

    return (
        <header>
            <div className="video-container">
                <video autoPlay muted loop ref={videoRef}>
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
