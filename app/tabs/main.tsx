import LikedIcon from '@/components/LikedIcon';
import CATApi from '@/shared/api';
import { useCatStore } from '@/shared/useCatStore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

const MainPage = () => {
    const [imageSrc, setImageSrc] = useState("../../../emptycat.jpg")
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
            
            console.log(randomCat)

            setCatId(randomCat._id);
            const catUrl = await CATApi.GetPhotoOfCat(randomCat._id);
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
    },[]);

    
    if(error)
        return (<View style={style.main_container}>
            <Text>ERROR</Text>
        </View>);

    if(loading)
        return (        
        <View style={style.main_container}>
            <View style={style.body_container}>
                <Image style={style.img} src={imageSrc}/>
                <Text>Ищем кота для вас</Text>
            </View>
        </View>)

    return (
        // <View style={style.main_container}>
        //     <View style={style.topper_container}>
                
        //     </View>
        //     <View style={style.body_container}>
        //         <Image style={style.img} src={imageSrc}/>
        //         <LikedIcon id = {catId} liked={isLiked} onClick={onClickLikedIcon}/>
        //         <Button onPress={handleNextButton} title='next'/>
        //     </View>
        // </View>
        <Text>Hello world</Text>
    )
}

const style = StyleSheet.create({
    main_container : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        padding : 16,
        backgroundColor : '#121212', 
        color : '#FFFFFF', 
        height : 100,
    },
    topper_container : {
        width: 100,
        height: 50,
        backgroundColor: '#1e1e1e', /* Темный фон верхнего блока */
        borderRadius: 8,
    },

    body_container : {
        display: 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 2,
        
    },

    img : {
        maxWidth: 200,
        maxHeight: 200,
        height: 'auto',
        borderRadius: 8,
    },

    button : {
        marginTop: 20,
        paddingTop: 10,
        paddingRight : 20,
        backgroundColor: '#bb86fc',
        color: 'white',
        borderRadius: 5,
        cursor: 'pointer',
    }

});
export default MainPage;

