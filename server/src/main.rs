#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

use std::process::Command;
use std::io::{self, Write};
use std::error::Error;
use rocket::http::Method;
use rocket::{get, post, routes};
use rocket_cors::{AllowedHeaders, AllowedOrigins};
use std::str;
use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};


#[derive(Deserialize)]
struct Gather {
    location: String
}

#[post("/gather", data = "<input>")]
fn gather(input: Json<Gather>) -> String {
    acquire(input.location.to_string());
    return input.location.to_string();
}

#[get("/")]
fn index() -> String {
    return "hi".to_string();
}

fn main()  -> Result<(), Box<dyn Error>> {
    let allowed_origins = AllowedOrigins::some_exact(&["http://localhost", "https://localhost", "https://localhost:3000"]);
    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()?;
    rocket::ignite()
        .mount("/api", routes![index, gather])
        .attach(cors)
        .launch();
    
    Ok(())
}

fn acquire(location: String) -> String {
    let invokee = format!("youtube-dl --extract-audio --audio-format mp3 -o '~/Downloads/music-discoverer/%(title)s.%(ext)s' {}", location);
    let output = Command::new("sh ")
    .arg("-c")
    .arg(invokee)
    .output()
    .expect("failed to execute process");
    println!("status: {}", output.status);
    io::stdout().write_all(&output.stdout).unwrap();
    io::stderr().write_all(&output.stderr).unwrap();
    println!("status: {}", output.status);
    println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
    println!("stderr: {}", String::from_utf8_lossy(&output.stderr));

    assert!(output.status.success());

    let s = match str::from_utf8(&output.stdout) {
        Ok(v) => v,
        Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
    };
 
    println!("result: {}", s.to_owned());
    
    return s.to_string();
}`