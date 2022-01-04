import React from 'react'
import {FormControlLabel, Checkbox} from '@mui/material'
import {Controller} from 'react-hook-form'

function CustomCheckbox({name, label, control, ...otherProps}) {
    return (
        <Controller 
            name={name}
            control={control}
            render={({field}) => (
                <FormControlLabel 
                    control={
                        <Checkbox {...field} {...otherProps}/>
                    }
                    label={label}
                />
            )}
        />
    )
}

export default CustomCheckbox
