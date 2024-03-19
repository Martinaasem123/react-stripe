import React  from 'react';
import shirt from "../../Image/section2.jpeg"
import './Products.css'
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import  {useState} from 'react';
import axios from 'axios';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MySwal = withReactContent(Swal);


const Products = () => {
  const notify = () => toast("Your payment was successful!");
  const notifyError = () => toast("Your payment was not successful!");
  const [product,setProduct] = useState({
    name: 'ProdOne',
    price: 249
  })
  const [numberOfPieces, setNumberOfPieces] = useState(0);
  const [allow,setAllow] =useState(false);
  const priceForStripe = product.price *numberOfPieces* 100;
  function piecesInput(e){
    setNumberOfPieces(e.target.value)
    if(e.target.value > 0)
      setAllow(true)
    else
      setAllow(false)
  }
  const payNow = async token =>{
    try {
      const response = await axios({
        url:'https://stripe-ohlx.onrender.com/payment',
        method: 'post',
        data: {
          amount :product.price * numberOfPieces * 100,
          token,
        }
      })
      if(response.status === 200){
       notify()
       
      }
    } catch (error) {
      notifyError()
      
    }
  }
  return (
    <div className="mb-5">
      <div className='container'>
        <div className='row '>
<div className="col-lg-5 my-5  ">
<img src={shirt}  alt="" className="img w-100 mt-5 rounded-3 im"/>
</div>
<div className='col-lg-6 mt-5 m-auto text-center align-items-center'>
<h1 className='mb-3'><i> Smart T-shirt</i></h1>
<p> smart t-shirt
warming, cooling and massaging t-shirt runs via APP
anywhere anytime with only one button controls you climate
don't wait for the future with cool live it here and now Available for men, women and kids,
all sizes different colors
classic ,casual or sports all what you need just cool </p>

<form>
<label className='me-3'>Choose a Size:  </label>

<select id="Size">
  <option placeholder='Choose' value=""></option>
  <option value="S">S</option>
  <option value="M">M</option>
  <option value="L">L</option>
  <option value="XL">XL</option>
  <option value="2XL">2XL</option>
  <option value="3XL">3XL</option>

</select>

<label className='mx-3'>Choose a Color:  </label>
<input   type="color" className='mt-4' />

<div className="">
<label className='me-3'>Gender:  </label>

<select id="gender">

  <option value="S">Man</option>
  <option value="M">Women</option>
  <option value="L">Kids</option>


</select>
<label className='mx-3'>number of pieces</label>
<input type="Number" onChange={piecesInput} className='mt-4' />
</div>
<div>


</div>
</form>
<StripeCheckout
        stripeKey="pk_live_51OtxmARx4Xhzx0cQzDY6cSCsyqP3f0gZA531kP04HqZR9APSbbsdNVw5QALw9YktR66pJXvTA8eXHmbA6b88Vu9T00iYDRPcFp"
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price* numberOfPieces}`}
        token={payNow}
        disabled={!allow}
      />
</div>


  
        </div>
    </div>
</div>
  );
};

export default Products;