import {useEffect, useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/core";
import {Input, Button} from 'semantic-ui-react';
import "./App.css";
import LoginModel from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
    const [login, setLogin] = useState(false);
    const [greetMsg, setGreetMsg] = useState("");
    const [open, setOpen] = useState(false);
    // const [name, setName] = useState("");
    // const [password, setPassword] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", {name}));
    }

    async function handleLogin(name, password) {
        const res = await invoke("login", {name, password})
        const response = JSON.parse(res);
        if (response.status_code === 200) {
            localStorage.setItem("tmp_str", response.data)
        }
        setGreetMsg(response)
        return response
    }

    useEffect(() => {
        const req = async () => {
            const token = localStorage.getItem("tmp_str")
            if(!token){
                setOpen(true)
                return
            }
            const res = await invoke("verify", {token})
            const response = JSON.parse(res);
            if (response.status_code === 401) {
                localStorage.setItem("tmp_str", "")
                setOpen(true)
            }
        }
        req().then(() => {
            console.log("onload complete")
        })

    }, [])
    return (
        <div className="container">
            {(!login) && (<LoginModel open={open} login={handleLogin} setOpen={setOpen}/>)}
            <Dashboard/>
            {/*<h1>Login</h1>*/}

            {/*<div className="row row-break">*/}
            {/*    <Input placeholder='Username' value={name} onChange={(e) => setName(e.currentTarget.value)}/>*/}
            {/*</div>*/}
            {/*<div className="row row-break">*/}
            {/*    <Input type={'password'} placeholder='password' value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>*/}
            {/*</div>*/}
            {/*<div className="row">*/}
            {/*    <Button primary onClick={login}>Login</Button>*/}
            {/*</div>*/}


            {/*<form*/}
            {/*    className="row"*/}
            {/*    onSubmit={(e) => {*/}
            {/*        e.preventDefault();*/}
            {/*        greet();*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <input*/}
            {/*        id="greet-input"*/}
            {/*        onChange={(e) => setName(e.currentTarget.value)}*/}
            {/*        placeholder="Enter a name..."*/}
            {/*    />*/}
            {/*    <button type="submit">Greet</button>*/}
            {/*</form>*/}

            {/*<p>{greetMsg.message}</p>*/}
        </div>
    );
}

export default App;
