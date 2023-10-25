import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

function SearchBar() {
  return (
    <div className="container">
        <Input size="large" className='searchbar' placeholder="Search services" prefix={<SearchOutlined />} />
    </div>
  )
}

export default SearchBar