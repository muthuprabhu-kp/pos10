use chrono::Utc;
use jsonwebtoken::errors::ErrorKind;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

pub struct Auth;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    username: String,
    exp: usize,
    valid: bool,
}

impl Auth {
    pub fn authorize(client_id: String) -> String {
        let exp = (Utc::now().naive_utc() + chrono::naive::Days::new(1)).timestamp() as usize;
        let claims = Claims {
            username: client_id,
            exp,
            valid: true,
        };
        let token = encode(
            &Header::default(),
            &claims,
            &EncodingKey::from_secret("secret".as_ref()),
        )
        .unwrap();
        return token;
    }

    pub fn validate(token: String) -> bool {
        let claims = match decode::<Claims>(
            &*token,
            &DecodingKey::from_secret("secret".as_ref()),
            &Validation::default(),
        ) {
            Ok(c) => c.claims,
            Err(err) => Claims {
                valid: false,
                username: "".to_string(),
                exp: 0,
            },
        };
        return claims.valid;
    }
}
