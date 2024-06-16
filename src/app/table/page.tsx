'use client'
import React, { useState, useEffect } from 'react'
import { notFound } from "next/navigation"
import Loader from '@/app/components/loader.tsx';

const CurrencyTable = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (loading) return <Loader />
  if (!data) return <p>No profile data</p>
 
  console.log(data, 'data------------>')
  return (
    <div>
      <h1>sadfdFSD</h1>
      <p>sdcfSDF</p>
    </div>
  )
}

export default CurrencyTable

// const fetchData = async () => {
//   try {
//     const response = await fetch('https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies')
//     const data = await response.json()
//     console.log(data, '----------->')
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }

// const currencyTable = () => {
//   const currencies = fetchData()

//   if (!currencies) notFound()

//   return (
//     <div>
//       Table
      
//     </div>
//   )
// }