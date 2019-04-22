import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(){
    return <div style={{ width: '100%', height: 'calc(100vh - 48px)', display: 'flex', justifyContent: 'center', alignItems: 'center', }}><CircularProgress /></div>
}
