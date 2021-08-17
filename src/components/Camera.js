import React, {useEffect} from 'react';

import {Box, Button, Typography} from "@material-ui/core";
import Webcam from "react-webcam";

const Camera = () => {
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    useEffect(() => {
        document.documentElement.requestFullscreen().then();
    }, []);

    return (
        <Box width="100vw" height="100vh" bgcolor="white">
            <Box position="absolute" top={0}  bgcolor="#345656b0" width="100%" display="flex" justifyContent="center">
                <Box py={2}><Typography variant="button" align="center">Your camera</Typography></Box>
            </Box>
            <Webcam audio={false} ref={webcamRef}  height="100%" videoConstraints={
                {facingMode:{exact: "environment"}}}/>

            <Box position="absolute" bottom={0} pb={10} width="100%" display="flex" justifyContent="center">
                {capturing ? (
                    <Button variant="contained" color="primary"  onClick={handleStopCaptureClick}>Stop Capture</Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleStartCaptureClick}>Start Capture</Button>
                )}
                {recordedChunks.length > 0 && (
                    <Button variant="contained" color="primary" onClick={handleDownload}>Download</Button>
                )}

            </Box>
        </Box>
    );
};

export default Camera;