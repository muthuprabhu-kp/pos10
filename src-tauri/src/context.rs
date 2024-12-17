use crate::models::db::Db;

pub struct Context;

impl Context {
    pub fn new() -> Self {
        Context {}
    }

    pub fn get_db_path(&self) -> &str {
        return crate::config::DB_PATH;
    }
    pub fn get_db(&self) -> Db {
        return Db::new(self.get_db_path());
    }
}
