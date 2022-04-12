import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import GlobalStyle from '../utils/GlobalStyle';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map({ route }) {

    const { city } = route.params;

    return (
        <View>
            <Text style={[
                GlobalStyle.CustomFont,
                styles.text
            ]}>
                {city}
            </Text>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: route.params.lat,
                    longitude: route.params.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            ></MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 40,
        margin: 10,
    },
    map: {
        width: '100%',
        height: '100%',
    },
})