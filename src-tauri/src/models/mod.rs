use serde::Serialize;

pub mod db;
pub mod product;
pub mod user;

pub trait Model: Serialize {
    fn none() -> Self;
    fn get_name(&self) -> String {
        Self::get_model_name()
    }
    fn get_model_name() -> String;
    fn get_string(&self) -> String
    where
        Self: Serialize,
    {
        let a = serde_json::to_string(&self).unwrap();
        return a.to_string();
        //eprint!("{}",serde_json::to_string(self).unwrap());
        //Ok(())
    }
    fn id(&self) -> i128;
    fn set_id(&mut self, id: i128);
}
