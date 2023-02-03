import React from 'react'
import Image from 'next/dist/client/image'
import { StarIcon } from '@heroicons/react/24/solid'
import CurrencyFormat from 'react-currency-format'
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({ 
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        };
        //push item into redux
        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () => {
        //Remove item from redux
        dispatch(removeFromBasket({ id }))
    };
  return (
    <div className='grid grid-cols-5'>
        <Image src={image} height={200} width={200} objectFit='contain' />

        {/* Middle */}
        <div className='col-span-3 mx-5'>
            <p>{title}</p>
            <div className='flex'>
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))}
            </div>

            <p className='text-xs my-2 line-clamp-3'>{description}</p>
            <CurrencyFormat prefix={'$'} value={price} currency="USD" displayType={'text'} decimalScale={2} fixedDecimalScale={true}/>

            {hasPrime && (
                <div>
                    <img 
                        loading='lazy'
                        className='w-12'
                        src='https://links.papareact.com/fdw'
                        alt='' 
                    />
                    <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
                </div>
            )}
        </div>

        {/* RIGHT SIDE ADD/REMOVE BUTTONS */}
        <div className='flex flex-col space-y-2 my-auto justify-self-end'>
            <button className='button' onClick={addItemToBasket}>Add to Basket</button>
            <button className='button'onClick={removeItemFromBasket}>Remove from Basket</button>
        </div>
    </div>
  )
}

export default CheckoutProduct