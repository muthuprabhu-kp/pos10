import React, {useEffect, useState} from 'react'
import {MenuItem, Icon, Menu, Card, CardHeader, CardDescription, Button, CardContent, ListItem, ListContent, Image, List} from 'semantic-ui-react'
import AddProductsModel from "./Inventory/add";
import {invoke} from "@tauri-apps/api/core";
import Products from "./Inventory/products"
import {configDir} from "@tauri-apps/api/path";

const Inventory = (props) => {
    const [activeItem, setActiveItem] = useState('products')
    const [showProduct, setShowProduct] = useState(false)
    const [message, setMessage] = useState({})
    const handleItemClick = (e, {name}) => {
        console.log(name)
        setActiveItem(name)
    }
    const handleAddProduct = (e) =>{
        setShowProduct(true)
        console.log('click')
    }

    const onEdit = (data) => {
        console.log(data)
        setShowProduct(data)
    }

    const saveProduct = async form => {
        const res = await invoke("new_product", {...form})
        console.log(res)
        const response = JSON.parse(res);
        if (response.status_code === 200) {
            setMessage({type: 'success', message: response.message})
            return
            //localStorage.setItem("tmp_str", response.data)
        }
        console.log(response.message)
    }



    return (<div id='inventory'>
            <Menu borderless>
                <MenuItem
                    name='products'
                    active={activeItem === 'products'}
                    onClick={handleItemClick}
                >
                    Products
                </MenuItem>

                <MenuItem
                    name='category'
                    active={activeItem === 'category'}
                    onClick={handleItemClick}
                >
                    Category
                </MenuItem>
            </Menu>
            <div className='inventory-body'>
                {/*<Card>*/}
                {/*    <CardContent>*/}
                {/*        <CardHeader>*/}
                {/*            <div className='inventory-header'>*/}
                {/*                <div className='header-name'><h3>Products</h3></div>*/}
                {/*                <div className='header-action'><Button onClick={handleAddProduct} floated='right'>Add</Button></div>*/}
                {/*            </div>*/}
                {/*        </CardHeader>*/}
                {/*    </CardContent>*/}
                {/*    <CardContent>*/}
                {/*        <CardDescription>*/}
                {/*            <List divided verticalAlign='middle'>*/}
                {/*                <ListItem>*/}
                {/*                    <ListContent floated='right'>*/}
                {/*                        <Button>Add</Button>*/}
                {/*                    </ListContent>*/}
                {/*                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lena.png'/>*/}
                {/*                    <ListContent>Lena</ListContent>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListContent floated='right'>*/}
                {/*                        <Button>Add</Button>*/}
                {/*                    </ListContent>*/}
                {/*                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/lindsay.png'/>*/}
                {/*                    <ListContent>Lindsay</ListContent>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListContent floated='right'>*/}
                {/*                        <Button>Add</Button>*/}
                {/*                    </ListContent>*/}
                {/*                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/mark.png'/>*/}
                {/*                    <ListContent>Mark</ListContent>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListContent floated='right'>*/}
                {/*                        <Button>Add</Button>*/}
                {/*                    </ListContent>*/}
                {/*                    <Image avatar src='https://react.semantic-ui.com/images/avatar/small/molly.png'/>*/}
                {/*                    <ListContent>Molly</ListContent>*/}
                {/*                </ListItem>*/}
                {/*            </List>*/}
                {/*        </CardDescription>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
                <Products onEdit={onEdit} handleAddProduct={handleAddProduct} />
            </div>
        <AddProductsModel open={showProduct} data={showProduct} onSave={saveProduct} setOpen={setShowProduct}/>
        </div>)
}

export default Inventory