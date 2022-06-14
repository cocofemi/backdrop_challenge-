import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Platform} from "react-native";
import {globalStyles} from '../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { add_favorite, remove_favorite } from "../redux/actions";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchCats } from "../api/api";
import {useQuery} from "react-query";

function Homepage() {
    const { data, isLoading, error } = useQuery('cats', fetchCats)

    const { favorites} = useSelector(state => state.favorite)

    const dispatch = useDispatch()
    const handleAddFavorite = async (item) => {
        dispatch(add_favorite(item))
    };

    const handleRemoveFavorite = (id) => {
        dispatch(remove_favorite(id))
    }

    const alreadyFavorited = (id) => {
        if (favorites.filter(favorite => favorite.id === id).length > 0) {
            return true
        }
        return false
    }
    const EmptyListMessage = ({ item }) => {
        return <Text testID="no-results">Sorry, no results found.</Text>
      };

    return (  
        <>
            { isLoading ? (
                <View>
                    <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff'}}
                    testID="loading-spinner"
                    />
                </View>
            ) : error ? (
                <b>There's an error: {error.message}</b>
            ) : data ? (
                <View style={styles.mainView}>
                    <StatusBar style="auto" />
                    <Text style={{...globalStyles.headerText}}> All Cats</Text>
                    <FlatList 
                        contentContainerStyle={{ paddingBottom: 20 }}
                        initialNumToRender={10}
                        keyExtractor={(item) => item.id}
                        data={data}
                        extraData={data}
                        renderItem={({ item, index }) => (
                            <>
                                <View style={styles.listItemView}>
                                    <Image source={{uri: `${item.image}`}} style={styles.displayImage}/>
                                    <Text style={styles.displayName}>{item.name}</Text>
                                    <View style={styles.favouriteView}>
                                        <TouchableOpacity  
                                            testID={`cat-row-${index}`}
                                            onPress={() => 
                                            alreadyFavorited(item.id) ? handleRemoveFavorite(item.id) : handleAddFavorite(item)}>
                                            {alreadyFavorited(item.id) ? 
                                            <MaterialIcons name="favorite" size={30} color={'red'} style={styles.favouriteIcon}/> :
                                            <EvilIcons name="heart" size={30} color="black" style={styles.favouriteIcon}/> }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )}
                        ListEmptyComponent={EmptyListMessage}
                    />
                </View>
            ) : null }
        </>
    );
}
const styles = StyleSheet.create({
    mainView: {
        width: wp('98%'),
        flex:1
    },
    listItemView: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // alignContent:'flex-end',
        marginLeft: 20,
        marginBottom: -15
    },
    displayName: {
        fontWeight: '600',
        fontSize: 15,
        marginTop: 20,
        marginLeft: 20,
        width: Platform.OS === "ios" ? 220 : 200
    },
    displayImage: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    favouriteIcon: {
        marginRight: 0,
        marginTop:15
    }
})
export default Homepage;