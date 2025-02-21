import LikedIcon from '@/components/LikedIcon';
import CATApi from '@/shared/api';
import { useCatStore } from '@/shared/useCatStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';

const MainPage = () => {
    const [imageSrc, setImageSrc] = useState('./')
    const [catId, setCatId] = useState('')
    
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(false)

    const { catsId, addCat, removeCat, isLikedCat }= useCatStore();
    const [isLiked, setIsLiked] = useState(false)

    const router = useRouter()

    const onClickLikedIcon = (id:string) => {
        if(!isLiked)
            addCat(id);
        else
            removeCat(id)
        setIsLiked(!isLiked);
    }

    const handlePress = () =>
    {
        router.push('/cats')
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

     if(loading){
        return (        
        <View style={style.main_container}>
            <View style={style.body_container}>
                <Image style={style.img} src={"../assets/images/emptycat.jpg"}/>
                <Text>Ищем кота для вас</Text>
            </View>
        </View>)
     }

    return (
        <View style={style.main_container}>
            <View style={style.topper_container}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={style.text}>
                    КОТИКИ
                    </Text>
                </TouchableOpacity>
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
    text : {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#ffffff', 
        marginBottom: 16,
        alignItems : 'center',
    },
    main_container: {
        marginTop : '10%',
        marginBottom : '50%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#1а1e1e',
    },
    topper_container: {
        width: '100%',
        height: 50,
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        justifyContent: 'flex-start',
        marginBottom: '100%'
    },
    body_container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#bb86fc',
        color: 'white', 
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center', 
    }
});
export default MainPage;

