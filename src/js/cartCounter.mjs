import { getLocalStorage } from "./utils.mjs";



export async function getItemCount() {
    const cartItems = await getLocalStorage("so-cart") || [];
    let itemCount = cartItems.length;
    console.log(itemCount); 
    const countIndicator = document.querySelector("#itemCount");
    countIndicator.innerHTML = itemCount;

}
