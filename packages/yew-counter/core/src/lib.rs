mod app;
use app::{App, Props};
use gloo::utils::document;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn run_app(
    root_id: String,
    on_increment: js_sys::Function,
    on_decrement: js_sys::Function,
) -> Result<(), JsValue> {
    let root = match document().get_element_by_id(&root_id) {
        Some(v) => v,
        None => return Ok(()),
    };

    yew::Renderer::<App>::with_root_and_props(
        root,
        Props {
            on_increment,
            on_decrement,
        },
    )
    .render();

    Ok(())
}
