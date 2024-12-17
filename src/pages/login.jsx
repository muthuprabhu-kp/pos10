import React, {useState} from 'react'
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Input,
    Header,
    Image,
    Modal,
} from 'semantic-ui-react'
import { invoke } from "@tauri-apps/api/core";

function LoginModel(props) {
    const {open, setOpen, login} = props
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit(){
        const response = await login(name, password)
        setGreetMsg(response)
        if(response.status_code === 200)
            setOpen(false)
    }
    return (
        <Modal
            open={open}
        >
            <ModalHeader><span style={{color: greetMsg.status_code === 200? 'green': 'red'}}>{greetMsg.message}</span></ModalHeader>
            <ModalContent image>
                <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
                <ModalDescription>
                    <Header>Login</Header>
                    <div className="row row-break">
                        <Input placeholder='Username' value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                    </div>
                    <div className="row row-break">
                        <Input type={'password'} placeholder='password' value={password}
                               onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </div>
                    {/*<div className="row">*/}
                    {/*    <Button primary onClick={login}>Login</Button>*/}
                    {/*</div>*/}
                </ModalDescription>
            </ModalContent>
            <ModalActions>
                {/*<Button color='black' onClick={() => setOpen(false)}>*/}
                {/*    Nope*/}
                {/*</Button>*/}
                <Button
                    content="Login"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={onSubmit}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}

export default LoginModel