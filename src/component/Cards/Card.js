import { Button } from "@mui/material";
import "./card.css";

function Card({ title,catagory, image, description, rating, price, i, star, onClick, height }) {
  const descrip = description.slice(0, 130);

  return (
    <div key={i} className="card">
      <div className="productImg">
        <img src={image} alt={title} />
      </div>

      <div>
        <hr />
      </div>
      <div>
      <h3 className="title">{title}</h3>
      </div>
      <div>
        <h4>{catagory}</h4>
      </div>
        {
          onClick ? 
      <div>
          <p className={height || 'description'}>{descrip}</p>
          <Button onClick={onClick}>... see more</Button>
      </div>
        : <div>
          <p className={height || 'description'}>{description}</p>
        </div>
        } 
      <div className="btnMainRating">
        <button className="btn">Cart | ${price}</button>
        <button className="btn">
          {rating} <img src={star} width={15} alt="star" />
        </button>
      </div>
    </div>

  );
}

export default Card;
