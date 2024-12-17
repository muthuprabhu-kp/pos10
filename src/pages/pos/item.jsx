import React, {useEffect, useState} from "react";
import {
    Button,
    CardGroup,
    CardMeta,
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
const Item = (props) => {
    const { product={} } = props
    const imageUrl = product?.image_path || 'https://react.semantic-ui.com/images/wireframe/white-image.png'
    const onItemClick = (e, product) => {
        props?.onClick && props.onClick(e, product)
    }
    return <Card raised onClick={e => onItemClick(e, product)}>
<div className='product-item' >
    <div className={'item-image'}><Image src={imageUrl} size='tiny' wrapped ui={false} /></div>
    <div className={'product-info'}>
        <div className={'item-name'}>{product?.name}</div>
        <div className={'item-price'}>{product?.price}</div>
        {/*<div>{product?.sku}</div>*/}
    </div>
</div>
        {/*<CardContent>*/}
        {/*    */}
        {/*    <CardHeader>{product?.name}</CardHeader>*/}
        {/*    <CardMeta>J{product?.sku}</CardMeta>*/}
        {/*    <CardDescription>*/}
        {/*        {product?.price}*/}
        {/*    </CardDescription>*/}
        {/*</CardContent>*/}
    </Card>
}
export default Item