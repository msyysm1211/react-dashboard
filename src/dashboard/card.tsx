// Laptop Page Component (Placeholimport React, { useState, useEffect } from 'react';

import { Breadcrumb, Card, Descriptions, Space } from 'antd';
import * as antd from 'antd';

import React from 'react';
const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: (
      <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>
    ),
  },
];
const MyCard = () => {
  return (
    <>
      <Breadcrumb
        items={[{ title: 'Home' }, { title: 'Laptop' }, { title: 'App' }]}
        style={{ margin: '16px 0' }}
      />
    </>
  );
};
export default MyCard;
