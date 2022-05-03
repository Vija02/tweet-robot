use std::env;

pub fn get_twitter_token() -> egg_mode::Token {
  let access_token = env::var("ACCESS_TOKEN").unwrap();
  let access_token_secret = env::var("ACCESS_TOKEN_SECRET").unwrap();
  let api_key = env::var("API_KEY").unwrap();
  let api_key_secret = env::var("API_KEY_SECRET").unwrap();

  let con_token = egg_mode::KeyPair::new(api_key, api_key_secret);
  let access_token = egg_mode::KeyPair::new(access_token, access_token_secret);
  let token = egg_mode::Token::Access {
    consumer: con_token,
    access: access_token,
  };

  return token;
}
