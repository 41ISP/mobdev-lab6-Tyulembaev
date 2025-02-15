import LikedIcon from '@/components/LikedIcon';
import CATApi from '@/shared/api';
import { useCatStore } from '@/shared/useCatStore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

const MainPage = () => {
    const [imageSrc, setImageSrc] = useState('../public/emptycat.jpg')
    const [catId, setCatId] = useState('')
    
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(false)

    const { catsId, addCat, removeCat, isLikedCat }= useCatStore();
    const [isLiked, setIsLiked] = useState(false)

    const onClickLikedIcon = (id:string) => {
        if(!isLiked)
            addCat(id);
        else
            removeCat(id)
        setIsLiked(!isLiked);
    }

    const fetchImage = async ()=>
    {
        try{
            const randomCat = await CATApi.GetRandomCat();
            setCatId(randomCat.id);
            const catUrl = await CATApi.GetPhotoOfCat(randomCat.id);
            // TODO а вдруг нам поподется одно и тоже два раза?????
            setImageSrc(catUrl);
            setLoading(false);
        }catch(e){
            console.log(e);
            setError(true);
        }
    }
    const handleNextButton = () => {
        fetchImage();
        setIsLiked(false);
        console.log('next cat')
    }
    useEffect( () => {
        fetchImage();
        console.log(imageSrc)
    },[]);

    
    if(error)
        return (
        <View style={style.main_container}>
            <Text>ERROR</Text>
        </View>
        );

     if(loading)
        return (        
        <View style={style.main_container}>
            <View style={style.body_container}>
                <Image style={style.img} source={require("../assets/images/emptycat.jpg")}/>
                <Text>Ищем кота для вас</Text>
            </View>
        </View>)

    return (
        <View style={style.main_container}>
            <View style={style.topper_container}>
            <Image style={style.img} src={"https://cataas.com/cat/hsyTGG9ihjVVAbsC"}/>

                
            </View>
            <View style={style.body_container}>
                <Image style={style.img} source={{uri: `${imageSrc}`}}/>
                <LikedIcon id = {catId} liked={isLiked} onClick={onClickLikedIcon}/>
                <Button onPress={handleNextButton} title='next'/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1а1e1e',
        height: 720,
    },
    topper_container: {
        width: 100,
        height: 50,
        backgroundColor: '#1e1e1e', // Dark background for the top block
        borderRadius: 8,
    },
    body_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        maxWidth: 50, // Use percentage for responsive design
        maxHeight: 50,
        height: 'auto',
        borderRadius: 8,
    },
    button: {
        marginTop: 20,
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        backgroundColor: '#bb86fc',
        color: 'white', 
        borderRadius: 5,
        alignItems: 'center', 
    }
});
export default MainPage;

