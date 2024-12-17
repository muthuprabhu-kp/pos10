import React from 'react'
import { MenuItem, Input, Menu, Button } from 'semantic-ui-react'

const Header = () => (
    <Menu borderless>
        <MenuItem>
            <h2>Pos 10</h2>
        </MenuItem>
        <MenuItem>
            <Input className='icon' icon='search' placeholder='Search...' />
        </MenuItem>
        <MenuItem position='right'>
            <Button circular icon='user outline' />
        </MenuItem>
    </Menu>
)

export default Header