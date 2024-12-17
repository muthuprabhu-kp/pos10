import React, {Component, useState} from 'react'
import {MenuItem, Icon, Menu} from 'semantic-ui-react'

const VerticalMenu = ({activeItem, setActiveItem}) => {


    const handleItemClick = (e, {name}) => {
        console.log(name)
        setActiveItem(name)
    }

    return (
        <Menu compact icon='labeled' vertical>
            <MenuItem
                name='pos'
                active={activeItem === 'pos'}
                onClick={handleItemClick}
            >
                <Icon name='btc'/>
                POS
            </MenuItem>

            <MenuItem
                name='inventory'
                active={activeItem === 'inventory'}
                onClick={handleItemClick}
            >
                <Icon name='boxes'/>
                Inventory
            </MenuItem>

            <MenuItem
                name='settings'
                active={activeItem === 'settings'}
                onClick={handleItemClick}
            >
                <Icon name='cogs'/>
                Settings
            </MenuItem>
        </Menu>
    )
}

export default VerticalMenu