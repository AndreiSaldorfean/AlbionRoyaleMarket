import '../css/ItemImage.css';
export default function ItemImage(item){
    let url = "https://render.albiononline.com/v1/item/"+item.id+".png"
    return (
        <img
            className = {`item-image ${item.class}`}
            src = {url}
            alt = {item.ign}
        />
    );
}