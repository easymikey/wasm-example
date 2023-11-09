use stylist::css;
use stylist::yew::styled_component;
use wasm_bindgen::JsValue;
use yew::prelude::*;

#[derive(Properties, Clone, PartialEq)]
pub struct Props {
    pub on_increment: js_sys::Function,
    pub on_decrement: js_sys::Function,
}

#[styled_component]
pub fn YewCounter(props: &Props) -> Html {
    let on_increment = {
        let on_increment = props.on_increment.clone();
        Callback::from(move |_| {
            let _ = on_increment.call0(&JsValue::NULL);
        })
    };
    let on_decrement = {
        let on_decrement = props.on_decrement.clone();
        Callback::from(move |_| {
            let _ = on_decrement.call0(&JsValue::NULL);
        })
    };

    let layout = css!(
        r#"
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;"#
    );

    let button = css!(
        r#"
		height: 65px;
		width: 65px;
		padding: 0;
		border: none;
		background-color: #aee18b;
		color: #e16541;
		font-size: 40px;
		text-align: center;
		box-shadow:
			rgb(50 50 93 / 25%) 0px 2px 5px -1px,
			rgb(0 0 0 / 30%) 0px 1px 3px -1px;
		cursor: pointer;

		& + & {
			margin-left: 8px;
		}"#
    );

    html! {
        <div class={layout}>
            <button class={button.clone()} onclick={on_increment}>{"+"}</button>
            <button class={button} onclick={on_decrement}>{"-"}</button>
        </div>
    }
}
