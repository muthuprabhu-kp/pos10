use crate::context::Context;
use crate::controller::auth::Auth;
use crate::controller::{send_200, send_401, send_403};
use crate::models::product::Product;
use crate::models::Model;
use serde::{Deserialize, Serialize};
use tauri::command;

#[derive(Serialize, Deserialize)]
struct PageResult {
    total_count: i64,
    last_key: String,
    data: Vec<Product>,
}

#[command]
pub fn new_product(
    state: tauri::State<Context>,
    name: &str,
    sku: &str,
    price: f64,
    stock: i64,
    image_path: &str,
    active: bool,
    disable_stock: bool,
) -> String {
    let db = state.get_db();
    let key = format!("{name}:{sku}");
    let existing_product: Product = db.get(key.as_str()).unwrap();
    if existing_product.name != "" && sku == "" {
        return send_403(format!("{name},{sku} already exist in db. Try editing it.")).unwrap();
    }
    let mut product = Product::new(name, sku, image_path, stock, price, disable_stock, active);
    let result = db.put(key.as_str(), &mut product).unwrap();
    return send_200("".to_string(), "Created Successfully".to_string()).unwrap();
}

#[command]
pub fn get_all_product(state: tauri::State<Context>, page_no: i64, item_count: i64) -> String {
    let db = state.get_db();
    let mut end_num = if page_no != 0 {
        page_no * item_count
    } else {
        item_count
    };
    let mut start_num = end_num - item_count;
    let mut last_key = "".to_string();
    let mut n = 0;
    while n < end_num {
        let start_key: Option<&[u8]> = if last_key != "" {
            Some(last_key.as_ref())
        } else {
            None
        };
        let results = db.get_all(start_key, item_count).unwrap();
        last_key = results.1[..].to_string();
        eprint!("{:?}", last_key);
        if start_num == n {
            let res = PageResult {
                total_count: results.0,
                last_key: results.1,
                data: results.2,
            };
            let json = serde_json::to_string(&res).unwrap();
            return send_200(json, "Listed Successfully".to_string()).unwrap();
        }
        n += item_count;
    }
    //let start_key: Option<&[u8]> = if last_key != "" { Some(last_key.as_ref())} else { None };
    //let results = db.get_all(start_key, item_count).unwrap();
    // let res = PageResult {
    //     total_count:  results.0,
    //     last_key: results.1,
    //     data: results.2,
    // };

    /*let key = format!("{name}:{sku}");
    let existing_product: Product = db.get(key.as_str()).unwrap();
    if existing_product.name != "" {
        return send_403(format!("{name},{sku} already exist in db. Try editing it.")).unwrap();
    }*/
    //let mut product = Product::new(name, sku, image_path, quantity, disable_stock, active);
    //let result = db.put(key.as_str(), &mut product).unwrap();
    //let json = serde_json::to_string(&res).unwrap();
    //eprint!("{:?}", json);
    return send_200("".to_string(), "Nothing to list".to_string()).unwrap();
}
