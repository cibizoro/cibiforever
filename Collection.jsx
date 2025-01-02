import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const{products, search, showSearch}=useContext(ShopContext);
  const[showFilter,setshowFilter]=useState(false);
  const[filterProducts,setFilterProducts]=useState([]);
  const[category,setCategory]=useState([]);
  const[sortType,setSortType]=useState(['relevant'])
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }
  const applyFilter=()=>{
    let productsCopy=products.slice();

    if(showSearch&&search){
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length > 0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category));
    }
    setFilterProducts(productsCopy)
    }

  useEffect(()=>{
    setFilterProducts(products);

  },[])

  const sortProduct =()=>{
    let fpCopy=filterProducts.slice()
    switch(sortType){
      case'low-high':
      setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
      break

      case'high-low':
      setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
      break

      default:
        applyFilter();
        break;
    }
    
  }
  useEffect(()=>{
    applyFilter();
  },[category,search,showSearch])

  useEffect(()=>{
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor pointer gap-2'>
          FILTER
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}></div>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-3'>
            <input   className='w-3'type="checkbox" value={'Men'} onChange={toggleCategory}/>
             Men

          </p>
          <p className='flex gap-2'>
            <input   className='w-3'type="checkbox" value={'Women'} onChange={toggleCategory}/>
            Women

          </p>
          <p className='flex gap-2'>
            <input   className='w-3'type="checkbox" value={'Kids'} onChange={toggleCategory}/>
            kids

          </p>
        </div>
        </div>
      <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title  text1={'ALL'} text2={'COLLECTIONS'}/>
            <select  onChange={(e)=>setSortType(e.target.value)}className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">SORT BY:RELEVENT</option>
              <option value="low-high">SORT BY:LOW TO HIGH</option>
              <option value="high-low">SORT BY:HIGH TO LOW</option>
              

            </select>

          </div>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,index)=>(
                <ProductItem  key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>

              ))
            }


          </div>

        </div>
    </div>
  )
}

export default Collection