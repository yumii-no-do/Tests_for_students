import React from 'react';
import { InputLabel, MenuItem, FormControl, Select,FormHelperText } from '@material-ui/core';


function SelectionComp(props) {
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);

    function handleChange(event) {
        setValue(event.target.value);
        props.handle(event);
    }
    function handleClose() {
        setOpen(false);
    }
    function handleOpen() {
        setOpen(true);
    }
    const menuItems = props.items.map(item => {
        return <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
    });

    return (
        <FormControl style={props.style} error={props.error} className={props.className} disabled={props.disabled} fullWidth={true}>
            <InputLabel htmlFor="demo-controlled-open-select">{props.title}</InputLabel>
            <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={value}
                onChange={handleChange}
                inputProps={{
                    name: props.name,
                    id: 'demo-controlled-open-select',
                }}
            >
                {menuItems}
            </Select>
             <FormHelperText error>{props.helperText}</FormHelperText>

        </FormControl>
    );
}

export default SelectionComp;