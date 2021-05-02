import * as React from 'react'
import styled from "styled-components/native";
import { colors } from '../../globals/colors'
import { RoundImage } from '../atoms/RoundImage';

interface Props {
    imgUrl: string,
    height?: string,
    width?: string,
}

const UserImage: React.FC<Props> = ({ imgUrl, height, width }) => {

    return (
        <RoundImage style={{ marginBottom: '5%' }} height={height || '53px'} width={width || '53px'} 
            source={{
                uri: imgUrl,
            }}
        />
    )
}

export default UserImage
