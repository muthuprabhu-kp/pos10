import React, {useEffect, useState} from "react";
import {
    Button,
    CardGroup,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    Image,
    ButtonGroup,
    Dropdown,
    Table,
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Menu
} from "semantic-ui-react";
import {
    ListItem,
    ListIcon,
    ListHeader,
    ListDescription,
    ListContent,
    List,
} from 'semantic-ui-react'

import {invoke} from "@tauri-apps/api/core";
import Item from "./item.jsx";
import Cart from "./cart.jsx";
import './styles.css'

const Pos = (props) => {
    const src = '/images/wireframe/image.png'
    const [data, setData] = useState({data: {data: []}})
    const [page, setPage] = useState(0)
    const [activeItem, setActiveItem] = useState('all')
    const [cart, setCart] = useState([])
    const {data: {data: nData, total_count=0, last_key:lastKey=''} = []} = data
    const handleItemClick =(e, product) => {
        console.log(e, product)
        setCart([...cart, product])
    }

    const handleCategory = (e) =>{
        console.log(e)
    }

    useEffect(() => {
        const load = async () => {
            const res = await invoke("get_all_product", {pageNo: page, itemCount: 20})
            const response = JSON.parse(res)
            console.log(response)
            let new_data = {...response, data: JSON.parse(response?.data || '[]')}
            console.log(new_data)
            setData(new_data)
        }
        load()

    }, [page])
    return <div id='pos'>
        <Menu borderless>
            <MenuItem
                name='all'
                active={activeItem === 'all'}
                onClick={handleCategory}
            >
                All
            </MenuItem>

            <MenuItem
                name='frequent'
                active={activeItem === 'category'}
                onClick={handleCategory}
            >
                Frequent
            </MenuItem>
        </Menu>
        <div className='pos-body'>
            <Card className={'pos-product'}>
                {/*<CardContent>*/}
                {/*    <CardHeader>*/}
                {/*        <div className='pos-header'>*/}
                {/*            <div className='header-name'><h3>Products</h3></div>*/}
                {/*            <div className='header-action'><Button onClick={handleItemClick} floated='right'>Add</Button></div>*/}
                {/*        </div>*/}
                {/*    </CardHeader>*/}
                {/*</CardContent>*/}
                <CardContent className={'pos-content'}>
                    <CardGroup itemsPerRow={6}>
                        {
                            nData.map((ele) => <Item raised product={ele} onClick={handleItemClick} />)
                        }
                    </CardGroup>
                </CardContent>
            </Card>
            <Card className={'pos-billing'}>
                <Cart cart={cart} setCart={setCart}/>
            </Card>
        </div>
    </div>
    // return <div id={'pos-body'}>
    // </div>
}

export default Pos