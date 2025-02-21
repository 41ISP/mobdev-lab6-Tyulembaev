import React from 'react';
import { useCatStore } from '@/shared/useCatStore';
import LikedIcon from '@/components/LikedIcon';
import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const FavouriteCatsPage: React.FC = () => {
    
   
    const { catsId, addCat, removeCat, isLikedCat }= useCatStore();
    const router = useRouter()

    const onPress = () =>{
        router.push('/')
    }

    const onClickLikedIcon = (id:string) => {
            removeCat(id)
      }

    return (
        <View style={style.galleryContainer}>
            <ScrollView contentContainerStyle={style.galleryScrollView}>

                <View style={style.container}>
                    <TouchableOpacity onPress={onPress}>
                        <Text style={style.text}>
                            НАЗАД
                        </Text>
                    </TouchableOpacity>
                    <View style={style.gallery}>
                        <View>
                        </View>
                    {catsId.map((id, index) => (
                        <View style={style.galleryItem} key={index}>
                            <Image style={style.galleryImage} source={{uri:`https://cataas.com/cat/${id}`}}/>
                            <LikedIcon id={id} liked={true} onClick={onClickLikedIcon}/>
                        </View>
                    ))}
                    </View>
                </View>
            </ScrollView>
        </View>
      );
}


const style = StyleSheet.create({
    container : {
        
        flex: 1,
        padding: 16,
        margin : 30,
        flexDirection : 'column'
    },
    text : {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#ffffff', 
        marginBottom: 16,
        alignItems : 'center',
    },
    gallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        margin: 10,
        justifyContent: 'space-between',
    },
    galleryItem: {
        width: '48%',
        marginBottom: "100%",
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    
    galleryContainer: {
        flex: 1,
    },
    galleryScrollView: {
        flexGrow: 1,
    },
    galleryImage: {
        width: 100,
        height: 100,
    },
      
})
export default FavouriteCatsPage;