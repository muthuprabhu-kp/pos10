use crate::models::Model;
use serde::{Deserialize, Serialize};

fn f_default() -> f64 {
    0.0
}
#[derive(Serialize, Deserialize)]
pub struct Product {
    id: i128,
    pub name: String,
    pub sku: String,
    #[serde(alias = "quantity", alias = "stock")]
    pub stock: i64,
    #[serde(default = "f_default")]
    pub price: f64,
    pub image_path: String,
    pub disable_stock: bool,
    pub active: bool,
}

impl Product {
    pub fn new(
        name: &str,
        sku: &str,
        image_path: &str,
        quantity: i64,
        price: f64,
        disable_stock: bool,
        active: bool,
    ) -> Self {
        Product {
            id: -1,
            name: name.to_string(),
            sku: sku.to_string(),
            stock: quantity,
            price,
            image_path: image_path.to_string(),
            disable_stock,
            active,
        }
    }
}

impl Model for Product {
    fn none() -> Self {
        Product::new("", "", "", 0, 0.0, false, false)
    }

    fn get_model_name() -> String {
        return "Products".to_string();
    }

    fn id(&self) -> i128 {
        self.id
    }

    fn set_id(&mut self, id: i128) {
        self.id = id;
    }
}
