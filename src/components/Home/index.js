import React, {useEffect, useState} from 'react';
import {Box, Button, Modal} from "@material-ui/core";
import Camera from "../Camera";

const Home = () => {
    const [isCameraOpen, setCameraOpen] = useState();

    const handleOpenCamera = () => {
        setCameraOpen(true);
    };

    document.addEventListener("fullscreenchange", function(){
        if (!document.fullscreenElement) {
            setCameraOpen(false);
        }
    }, false);

    return (
        <div>
            <Modal open={isCameraOpen} onClose={() => setCameraOpen(false)}>
                <Camera />
            </Modal>

            <Box m={10}>
                <Button variant="outlined" color="primary" onClick={handleOpenCamera}>
                    Open Camera
                </Button>
            </Box>
        </div>
    );
};

export default Home;