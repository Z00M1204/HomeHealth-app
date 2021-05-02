import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../globals/colors'

export const RoundImage = styled.Image<{ height: string, width: string }>`
    height: ${props => props.height};
    width: ${props => props.width};
    border-radius: 90px;
`