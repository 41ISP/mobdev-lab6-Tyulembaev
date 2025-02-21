import React, { useState } from 'react'
import  {useCatStore} from '../shared/useCatStore'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

interface Props {
    id:string,
    liked:boolean,
    onClick: (id:string) => void
}

const LikedIcon: React.FC<Props> = ({ id , liked, onClick}) => {

    const handleLiked = () => {
        onClick(id);
    }
    
    return (
        <View>
            <TouchableOpacity
                onPress={handleLiked}
                style={{flex: 1}}>
                <Image style={style.liked_image} source={liked ? require("../assets/images/liked.png") : require("../assets/images/unliked.png")}/>
            </TouchableOpacity>
        </View>
        
    )
}

export default LikedIcon

const style = StyleSheet.create({
    liked_image : {
        width: 100,
        height: 100,
        backgroundColor: '#1F1F1F',
        marginTop: '30%'
    }
})