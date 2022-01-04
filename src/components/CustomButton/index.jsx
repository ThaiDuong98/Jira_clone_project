import React from 'react'
import {Button} from '@mui/material'

function CustomButton({children, ...otherProps}) {

    const configButton = {
        ...otherProps,
        size: "small"
    }
    return (
        <Button {...configButton}>
            {children}
        </Button>
    )
}

export default CustomButton
