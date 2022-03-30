import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>
                React Native Tutorial
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        height: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#000',
    },

});

export default Header;