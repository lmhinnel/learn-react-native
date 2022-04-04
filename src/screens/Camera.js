import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import CPressable from '../utils/CPressable';
import RNFS from 'react-native-fs';

export default function Camera() {

    const [{ cameraRef }, { takePicture }] = useCamera(null);

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            const oldImagePath = data.uri;
            const newImagePath = RNFS.ExternalDirectoryPath + '/' + Date.now() +'.jpg';
            RNFS.moveFile(oldImagePath, newImagePath).then(() => {
                console.log('Moved from' + oldImagePath + ' -- to-- ' + newImagePath);
            }).catch(err => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
                <CPressable
                    title='capture'
                    onPressHandler={() => captureHandle()}
                />
            </RNCamera>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 40,
        // marginBottom: 20,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})