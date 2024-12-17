import React, {useEffect, useState} from "react";
import {
    Button,
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
import {invoke} from "@tauri-apps/api/core";

const TOTAL_ITEM_PER_PAGE = 5
const Products = (props) => {
    const {handleAddProduct} = props
    const [data, setData] = useState({data: {data: []}})
    const [page, setPage] = useState(0)
    const {data: {data: nData, total_count=0, last_key:lastKey=''} = []} = data
    const pageCount = total_count === 0? 1: Math.ceil(total_count/TOTAL_ITEM_PER_PAGE)
    const options = [
        { key: 'clone', icon: 'hide', text: 'Clone', value: 'clone' },
        { key: 'delete', icon: 'delete', text: 'Delete', value: 'delete' },
    ]
    const handlePageClick = (e, {name}) => {
        setPage(name)
    }

    const onEdit = (e, i) => {
        const row = nData[i]
        props?.onEdit && props.onEdit(row)
    }

    useEffect(() => {
        const load = async () => {
            const res = await invoke("get_all_product", {pageNo: page, itemCount: TOTAL_ITEM_PER_PAGE})
            const response = JSON.parse(res)
            console.log(response)
            let new_data = {...response, data: JSON.parse(response?.data || '[]')}
            console.log(new_data)
            setData(new_data)
        }
        load()

    }, [page])
    return <Card className={'inventory'}>
        <CardContent>
            <CardHeader>
                <div className='inventory-header'>
                    <div className='header-name'><h3>Products</h3></div>
                    <div className='header-action'><Button onClick={handleAddProduct} floated='right'>Add</Button></div>
                </div>
            </CardHeader>
        </CardContent>
        <CardContent className={'inventory-content'}>
            <CardDescription>
                <div className={'product-list'}>
                    <Table celled>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderCell>Action</TableHeaderCell>
                                <TableHeaderCell>Thumbnail</TableHeaderCell>
                                <TableHeaderCell>Name</TableHeaderCell>
                                <TableHeaderCell>SKU</TableHeaderCell>
                                <TableHeaderCell>Stock</TableHeaderCell>
                                <TableHeaderCell>Price</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                nData.map((ele, i) => (<TableRow>
                                    <TableCell><ButtonGroup color='teal'>
                                        <Button onClick={e => onEdit(e, i)}>Edit</Button>
                                        <Dropdown
                                            className='button icon'
                                            floating
                                            options={options}
                                            trigger={<></>}
                                        />
                                    </ButtonGroup>
                                    </TableCell>
                                    <TableCell><Image src={ele?.image_path?ele?.image_path: '/no-image.png'} size='mini' /></TableCell>
                                    <TableCell>{ele?.name}</TableCell>
                                    <TableCell>{ele?.sku}</TableCell>
                                    <TableCell>{ele?.stock}</TableCell>
                                    <TableCell>{ele?.price}</TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableHeaderCell colSpan='6'>
                                    <Menu floated='right' pagination>{[...Array(pageCount).keys()].map(x => (<MenuItem
                                        name={x + 1}
                                        as ={'a'}
                                        active={page === x + 1}
                                        onClick={handlePageClick}
                                    />))}</Menu>
                                </TableHeaderCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </div>

            </CardDescription>
        </CardContent>
    </Card>
}

export default Products