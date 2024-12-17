use crate::models::Model;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    id: i128,
    pub active: bool,
    username: String,
    pub email: String,
    pub role: i8,
    pub password: String,
}

impl User {
    pub fn new(username: &str) -> Self {
        User {
            id: -1,
            active: false,
            username: username.to_string(),
            email: "".to_string(),
            role: -1,
            password: "".to_string(),
        }
    }
}

impl Model for User {
    fn none() -> Self {
        return User::new("");
    }

    fn get_model_name() -> String {
        return "Users".to_string();
    }

    fn id(&self) -> i128 {
        self.id
    }

    fn set_id(&mut self, id: i128) {
        self.id = id;
    }
}

pub fn create_user(username: &str) -> User {
    //let u = create_user("No user", "No password");
    User::new(username)
}

pub fn get_user(path: &str, username: &str) -> User {
    //let user:User = User::get_test(path, username).unwrap();
    return User::new(username);
}
