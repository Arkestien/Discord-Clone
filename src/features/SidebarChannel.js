import React from 'react'
import './SidebarChannel.css'
import { useDispatch } from 'react-redux';
import { setchannelInfo } from './appSlice'

function SidebarChannel({ id, channelName }) {
    const dispatch = useDispatch();
    return (
        <div className='sidebarChannel' onClick={() =>
            dispatch(setchannelInfo({
                channelId: id, channelName: channelName
            }))}>
            <h4>
                <span className='sidebarChannel__hash'>#</span>{channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
