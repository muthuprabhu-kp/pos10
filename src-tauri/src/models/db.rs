use crate::models::Model;
use rocksdb::{
    DBWithThreadMode, Direction, IteratorMode, Options, ReadOptions, SingleThreaded, DB,
};
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use serde_json::Result;

pub struct Db {
    path: String,
}

impl Db {
    pub fn new(path: &str) -> Self {
        Db {
            path: path.to_string(),
        }
    }

    fn open(&self, db_path: String) -> DBWithThreadMode<SingleThreaded> {
        let db = DB::open_default(db_path).unwrap();
        db
    }

    fn close(&self, db_path: String) -> Result<()> {
        let _ = DB::destroy(&Options::default(), db_path);
        Ok(())
    }

    pub fn put(&self, key: &str, model: &mut impl Model) -> Result<()> {
        let name = model.get_name();
        let db_path: String = self.path.to_string() + &*format!("/{name}");
        if model.id() == -1 {
            let id = self.get_next_id();
            model.set_id(id);
        }
        let j = model.get_string();
        let db = self.open(db_path[..].to_string());
        //eprint!("{:?}:{:?}", key, j);
        db.put(key, j).expect("Not able to save {}");
        self.close(db_path[..].to_string())
            .expect("Cannot close connection");
        Ok(())
    }

    pub fn get<T: Model>(&self, key: &str) -> Result<T>
    where
        T: DeserializeOwned,
    {
        let name = T::get_model_name();
        let db_path: String = self.path.to_string() + &*format!("/{name}");
        let db = self.open(db_path[..].to_string());
        let p = db
            .property_value("rocksdb.estimate-num-keys")
            .unwrap()
            .unwrap();
        eprint!("count:{:?}", p);
        let value = match db.get(key) {
            Ok(Some(value)) => String::from_utf8(value).unwrap(),
            Ok(None) => "".to_string(),
            Err(e) => "".to_string(),
        };
        eprint!("{:?}:{:?}", key, value);
        self.close(db_path[..].to_string())
            .expect("Cannot close connection");
        if value == "" {
            return Ok(T::none());
        }
        let p: T = serde_json::from_str(&*value).unwrap();
        Ok(p)
    }

    pub fn get_all<T: Model>(
        &self,
        start_key: Option<&[u8]>,
        count: i64,
    ) -> Result<(i64, String, Vec<T>)>
    where
        T: DeserializeOwned,
    {
        let mut results: Vec<T> = Vec::new();
        let name = T::get_model_name();
        let db_path: String = self.path.to_string() + &*format!("/{name}");
        let db = self.open(db_path[..].to_string());
        let p = db
            .property_value("rocksdb.estimate-num-keys")
            .unwrap()
            .unwrap();
        let total_count = p.parse::<i64>().unwrap();
        let mut iter = db.iterator_opt(IteratorMode::Start, ReadOptions::default());
        if let Some(key) = start_key {
            iter.set_mode(IteratorMode::From(key, Direction::Forward));
            iter.next();
        }
        let mut last_key = "".to_string();
        for (index, item) in iter.enumerate() {
            let i_index: u32 = index as u32;
            if i_index >= count as u32 {
                break;
            }
            let (key, value) = item.unwrap();
            let vec_bytes: Vec<u8> = value.clone().into();
            let key_bytes: Vec<u8> = key.clone().into();
            let j_str = String::from_utf8(vec_bytes).unwrap();
            last_key = String::from_utf8(key_bytes).unwrap();
            eprint!("key:{:?},value:{:?}", key, value);
            let p: T = serde_json::from_str(&*j_str).unwrap();
            results.push(p);
        }
        eprint!("count:{:?}", total_count);

        let value = ""; /*match db.get(key) {
                            Ok(Some(value)) => String::from_utf8(value).unwrap(),
                            Ok(None) => "".to_string(),
                            Err(e) => "".to_string()
                        };*/
        self.close(db_path[..].to_string())
            .expect("Cannot close connection");
        // if value == ""{
        //     return Ok(T::none())
        // }
        // let p:T = serde_json::from_str(&*value).unwrap();
        Ok((total_count, last_key, results))
    }

    fn get_from_db(&self, path: String, key: &str) -> String {
        let db = self.open(path[..].to_string());
        let value = match db.get(key) {
            Ok(Some(value)) => String::from_utf8(value).unwrap(),
            Ok(None) => "".to_string(),
            Err(e) => "".to_string(),
        };
        self.close(path[..].to_string())
            .expect("Cannot close connection");
        return value;
    }

    fn put_to_db(&self, path: String, key: &str, value: String) {
        let db = self.open(path[..].to_string());
        db.put(key, value).expect("Not able to save {}");
        self.close(path[..].to_string())
            .expect("Cannot close connection");
    }

    fn get_next_id(&self) -> i128 {
        let db_path: String = self.path.to_string() + &*"/generic".to_string();
        let string_value: String = self.get_from_db(db_path[..].to_string(), "last_insert_id");
        let mut value: i128 = if string_value != "" {
            string_value.trim().parse().unwrap()
        } else {
            0
        };
        value += 1;
        self.put_to_db(db_path, "last_insert_id", value.to_string());
        return value;
    }
}

// pub trait Dbt {
//     fn put(model: &impl Model) -> Result<()> {
//         Ok(())
//     }
//     // fn put(&self, path:&str, key:&str) -> Result<()> where Self: Serialize {
//     //     let db = DB::open_default(path).unwrap();
//     //     let j = serde_json::to_string(&self)?;
//     //     db.put(key, j).expect("TODO: panic message");
//     //     //db.close().expect("TODO: panic message");
//     //     //eprint!("{:?}:{:?}", key, j);
//     //     let _ = DB::destroy(&Options::default(), path);
//     //     Ok(())
//     // }
//
//     fn get(&self, key:&str) -> Result<()> {
//         //eprint!("{:?}", &self);
//         //let p = serde_json::from_str("");
//         Ok(())
//     }
//
//     fn get_test<T>(path: &str,key:&str) -> Result<T> where  T: DeserializeOwned{
//         //eprint!("{:?}", &self);
//         let db = DB::open_default(path).unwrap();
//         let value = match db.get(key) {
//             Ok(Some(value)) => String::from_utf8(value).unwrap(),
//             Ok(None) => "".to_string(),
//             Err(e) => "-1".to_string()
//         };
//         //db.close().expect("TODO: panic message");
//         let p:T = serde_json::from_str(&*value).unwrap();
//         eprint!("{:?}", key);
//         Ok(p)
//     }
//
//     fn parse(&self, j_string: &str);
//
// }

// impl Raw for Db {
//
// }
