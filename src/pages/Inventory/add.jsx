import {useEffect, useState} from "react";
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Checkbox,
    Input,
    Modal,
    FormGroup, FormField, Divider, Form
} from 'semantic-ui-react'


const addProductsModel = (props) => {
    const initialState = {
        name:"",
        sku: "",
        imagePath: "",
        stock: 0,
        disableStock: false,
        active: true,
    }
    const {open,  setOpen, data = initialState, onSave} = props
    const [form, setForm] = useState(data)
    console.log(form)

    const onChange = (e, x) =>{
        //console.log(e, x)
        const  {name, value, checked} = x || e?.target
        let newValue = value || checked
        if(name === 'quantity'){
            newValue = parseInt(value)
        }
        if(name === 'price'){
            newValue = parseFloat(value)
        }
        setForm({...form, [name]: newValue})
    }
    const handleSubmit = (e) => {
        console.log(form)
        onSave(form)
    }

    useEffect(()=>{
        if(data !== form){
            setForm(data)
        }
    },[data])

    return (<Modal
        open={!!open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
    >
        <ModalHeader>Add Product</ModalHeader>
        <ModalContent image scrolling>

            <ModalDescription>
                <Form onSubmit={handleSubmit}>
                    <FormGroup grouped>
                        <FormField
                            required
                            label='Name'
                            name={'name'}
                            control='input'
                            value={form.name}
                            placeholder='Name'
                            onChange={onChange}
                        />
                        <FormField
                            required
                            label='SKU'
                            name={'sku'}
                            control='input'
                            value={form.sku}
                            placeholder='SKU'
                            onChange={onChange}
                        />
                        <FormField
                            label='Image Path'
                            name={'imagePath'}
                            value={form.imagePath}
                            control='input'
                            placeholder='Image Path'
                            onChange={onChange}
                        />
                        <FormField
                            label='Price'
                            name={'price'}
                            type={'number'}
                            value={form.price}
                            control='input'
                            placeholder='Quantity'
                            onChange={onChange}
                        />
                        <FormField
                            label='Stock'
                            name={'stock'}
                            type={'number'}
                            value={form.stock}
                            control='input'
                            disabled={form.disableStock}
                            placeholder='Stock'
                            onChange={onChange}
                        />
                        <FormField
                            label='Disable Quantity'
                            name={'disableStock'}
                            checked={form.disableStock}
                            control={Checkbox}
                            onChange={onChange}
                        />
                        <FormField
                            label='Active'
                            name={'active'}
                            checked={form.active}
                            control={Checkbox}
                            onChange={onChange}
                        />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                    <Divider hidden />
                </Form>
                {/*<div><Input label={"Name"} name={'name'} placeholder='Name' /></div>*/}
                {/*<div><Input name={'sku'} placeholder='SKU'/></div>*/}
                {/*<div><Input name={'quantity'} placeholder='Quantity'/></div>*/}
                {/*<div><Input name={'image_path'} placeholder='Image Path'/></div>*/}
                {/*<div><Checkbox label='Active'/></div>*/}
            </ModalDescription>
        </ModalContent>
        {/*<ModalActions>*/}
        {/*    <Button onClick={() => setOpen(false)} primary>*/}
        {/*        Proceed <Icon name='chevron right'/>*/}
        {/*    </Button>*/}
        {/*</ModalActions>*/}
    </Modal>)
}

export default addProductsModel