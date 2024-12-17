use crate::context::Context;
use crate::controller::auth::Auth;
use crate::controller::{send_200, send_401};
use crate::models::user::{create_user, User};
use crate::models::Model;
use sha2::{Digest, Sha256};
use tauri::command;

#[command]
pub fn login(state: tauri::State<Context>, name: &str, password: &str) -> String {
    //let path = "./db2/users";
    let mut model = create_user("");
    let db = state.get_db();
    let user: User = db.get(name).unwrap();
    //db.put(b"admin", b"admin").unwrap();
    let mut hasher = Sha256::new();
    hasher.update(password);
    let result = hasher.finalize();
    let hash = format!("{:x}", result);
    if user.password == hash {
        let token = Auth::authorize(user.id().to_string());
        return send_200(
            token,
            format!("Hello, {}! You've been greeted from Rust!", name),
        )
        .unwrap();
        //return format!("Hello, {}! You've been greeted from Rust!", name)
    }
    return send_401("Username or Password incorrect".to_string()).unwrap();
}

#[command]
pub fn verify(state: tauri::State<Context>, token: &str) -> String {
    let valid = Auth::validate(token.to_string());
    if valid {
        return send_200("".to_string(), "Token Valid".to_string()).unwrap();
    }
    return send_401("Token Expired".to_string()).unwrap();
}
