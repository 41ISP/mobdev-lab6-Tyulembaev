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
            <Image style={style.liked_image} src={liked ? "../../../liked.png": "../../../unliked.png"}/>
            <TouchableOpacity
                onPress={handleLiked}
                style={{flex: 1}}>
            </TouchableOpacity>
        </View>
        
    )
}

export default LikedIcon

const style = StyleSheet.create({
    liked_image : {
        maxWidth: 50,
        maxHeight: 50,
        width: 50,
        height: 50,
        padding: 10,
        margin: 10,
    }
})