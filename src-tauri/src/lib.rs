mod config;
mod context;
mod controller;
mod models;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use crate::controller::{get_all_product, login, new_product, verify};
use crate::models::user::{create_user, User};
use base64ct::Encoding;
use context::Context;
use sha2::{Digest, Sha256};
use std::str;
use tauri::{command, App, Manager};

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}
// #[command]
// fn login(state: tauri::State<Context>, name: &str, password: &str) -> String {
//     //let path = "./db2/users";
//     let mut model = create_user("");
//     let db = state.get_db();
//     let user: User = db.get(name, &model).unwrap();
//     //db.put(b"admin", b"admin").unwrap();
//     let mut hasher = Sha256::new();
//     hasher.update(password);
//     let result = hasher.finalize();
//     let hash = format!("{:x}", result);
//     if user.password == hash {
//         return format!("Hello, {}! You've been greeted from Rust!", name)
//     }
//     // let value = match db.get(name) {
//     //     Ok(Some(value)) => String::from_utf8(value).unwrap(),
//     //     Ok(None) => "".to_string(),
//     //     Err(e) => "-1".to_string()
//     // };
//     // if value == hash {
//     //     return format!("Hello, {}! You've been greeted from Rust!", name)
//     // }
//     return format!("Hello, {}! Not Found", name)
//
// }
fn load(app: &mut App) {
    let app_context = Context::new();
    let db = app_context.get_db();
    let mut user = create_user("admin");
    let g_user: User = db.get("admin").unwrap();
    if !g_user.active {
        let mut hasher = Sha256::new();
        hasher.update(b"admin");
        let result = hasher.finalize();
        let base64_hash = format!("{:x}", result);
        user.active = true;
        user.role = 1;
        user.password = base64_hash;
        db.put("admin", &mut user).expect("Not able to save");
    }

    app.manage(app_context);
    //let db = DB::open_default(path).unwrap();

    // user.put(path, "test_user:/muthu").expect("TODO: panic message");
    // let o_user = get_user(path, "test_user:/muthu");
    // let value = match db.get("admin") {
    //     Ok(Some(value)) => String::from_utf8(value).unwrap(),
    //     Ok(None) => "".to_string(),
    //     Err(e) => "-1".to_string()
    // };
    // if value == "" {
    //
    //
    //     print_type_of(&result);
    //
    //     println!("{:?}", base64_hash);
    //     //let hash = &result;
    //     db.put(b"admin", base64_hash).unwrap();
    //
    // }
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            load(app);
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        //.invoke_handler(tauri::generate_handler![greet, login])
        .invoke_handler(tauri::generate_handler![
            login,
            verify,
            new_product,
            get_all_product
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
