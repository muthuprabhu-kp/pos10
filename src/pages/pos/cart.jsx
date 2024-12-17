
import React from "react";
import {List, ListContent, ListDescription, ListHeader, ListIcon, ListItem, Image} from "semantic-ui-react";
import './styles.css';
const Cart = (props) => {
    const { cart = [], setCart } = props
    return <List id={'cart'} divided relaxed>
        {
            cart.map((item) => (<ListItem>
                <Image avatar src={item.image_path} verticalAlign='middle' />
                {/*<ListIcon name='github' size='large' verticalAlign='middle' />*/}
                <ListContent>
                    <ListHeader as='a'>{item.name}</ListHeader>
                    <ListDescription as='a'>{item.sku}</ListDescription>
                </ListContent>
            </ListItem>))
        }

        {/*<ListItem>*/}
        {/*    <ListIcon name='github' size='large' verticalAlign='middle' />*/}
        {/*    <ListContent>*/}
        {/*        <ListHeader as='a'>Semantic-Org/Semantic-UI-Docs</ListHeader>*/}
        {/*        <ListDescription as='a'>Updated 22 mins ago</ListDescription>*/}
        {/*    </ListContent>*/}
        {/*</ListItem>*/}
        {/*<ListItem>*/}
        {/*    <ListIcon name='github' size='large' verticalAlign='middle' />*/}
        {/*    <ListContent>*/}
        {/*        <ListHeader as='a'>Semantic-Org/Semantic-UI-Meteor</ListHeader>*/}
        {/*        <ListDescription as='a'>Updated 34 mins ago</ListDescription>*/}
        {/*    </ListContent>*/}
        {/*</ListItem>*/}
    </List>
}

export default Cart