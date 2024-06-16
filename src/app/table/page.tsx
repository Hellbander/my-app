'use client'
import React, { useState, useEffect } from 'react'
import { notFound } from "next/navigation"
import Loader from '@/app/components/loader.tsx';

const currencyAbbreviation = require('./data.json');

const CurrencyTable = () => {
  const [tableData, setTableData] = useState<any[]>([])
  const [tableDataBySearch, setTableDataBySearch] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(true)

  const sortAbbreviations = () => {
    const newTable:any[] = []
    tableData.forEach((element) => {
      if (element.abbreviation.search(searchValue.toUpperCase()) !== -1) {
        newTable.push(element)
      }
    })

    if (newTable) {
      setTableDataBySearch(tableData)
    }
    
    setTableDataBySearch(newTable)
  }

  const createData = (currencies: any[]) => {
    const newData:any[] = []
    currencies.forEach((e, index) => {
      newData.push(
        {
          amount: e.amount,
          abbreviation: currencyAbbreviation[index+1]
        }
      )
    })
    setTableData(newData)
    setTableDataBySearch(newData)
  }
 
  useEffect(() => {
    fetch('https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies')
      .then((res) => res.json())
      .then((currencies) => {
        createData(currencies)
      })
      .then(() => {
        setLoading(false)
      })
  }, [])
 
  if (loading) return <Loader />
  if (!tableData) notFound()

  const table = searchValue.length > 0 ? tableDataBySearch : tableData

  return (
    <div className='w-1/3 bg-gray-300 rounded p-2'>
      <h2 className="mb-5 text-2xl font-bold text-gray-900">
        Balances
      </h2>
      <div className='flex'>
        <input
          id="search"
          className="block w-40 rounded-md border-0 mr-2 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          value={searchValue}
          placeholder="Search by name"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="flex w-14 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={sortAbbreviations}
        >
          Search
        </button>
      </div>
      <div>
       {
        table.length !== 0 &&
          <div className='flex justify-between border-b-2 border-gray-800'>
            <p className='text-gray-700 font-medium'>Name</p>
            <p className='text-gray-700 font-medium'>Balance</p>
          </div>
        }
        <>
          {
            table.map((e, index) => (
              <div key={index} className='flex justify-between'>
                <p className='text-gray-900 font-bold'>{e.abbreviation}</p>
                <p className='text-gray-500'>{e.amount}</p>
              </div>
            ))
          }
        </>
      </div>
    </div>
  )
}

export default CurrencyTable