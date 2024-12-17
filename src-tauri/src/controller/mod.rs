mod auth;
mod product;
mod user;

pub use product::{get_all_product, new_product};
use serde::{Deserialize, Serialize};
use serde_json::Result;
pub use user::{login, verify};

#[derive(Serialize, Deserialize)]
struct Response {
    status_code: i16,
    data: String,
    message: String,
}

fn send_200(data: String, message: String) -> Result<String> {
    let res = Response {
        status_code: 200,
        data,
        message,
    };
    let j = serde_json::to_string(&res)?;
    return Ok(j);
}

fn send_401(message: String) -> Result<String> {
    let res = Response {
        status_code: 401,
        data: "".to_string(),
        message,
    };
    let j = serde_json::to_string(&res)?;
    return Ok(j);
}

fn send_403(message: String) -> Result<String> {
    let res = Response {
        status_code: 403,
        data: "".to_string(),
        message,
    };
    let j = serde_json::to_string(&res)?;
    return Ok(j);
}
