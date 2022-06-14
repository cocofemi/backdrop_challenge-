import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions, Platform} from "react-native";
import {globalStyles} from '../styles/globalStyles';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

function Favourites() {
    const { favorites } = useSelector(state => state.favorite)
    return ( 
        <View style={styles.mainView}>
            <StatusBar style="auto" />
            <Text style={{...globalStyles.headerText}}>Cats I Like</Text>
            <FlatList 
            numColumns={2}
            testID="favorite-row-0"
            keyExtractor={(item) => item.id}
            data={favorites}
            extraData={favorites}
            renderItem={({ item, index }) => (
                <View style={styles.listView}>  
                        <View>
                            <Image source={{uri: `${item.image}`}} style={styles.displayImage}/>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.name}>{item.name}</Text>
                            <TouchableOpacity testID={`favorite-row-${index}`}>
                                <FontAwesome name="heart" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                </View>
            )}
            />
        </View>
     );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1, 
        paddingHorizontal: 1,
        width: '100%'
    },
    listView: {
        marginTop: 40, 
        marginLeft: Platform.OS === "ios" ? 30 : 20
    },
    displayImage: {
        width: 150,
        height: 150,
        borderRadius: 10
    },
    infoView: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    name: {
        fontSize: 13,
        fontWeight: '600',
    }
})

export default Favourites;