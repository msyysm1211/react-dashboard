// import React, { useState, useEffect } from 'react';
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu, theme, Table, Space, Slider } from 'antd';
// import {
//   Routes,
//   Route,
//   useSearchParams,
//   useNavigate,
//   useLocation,
// } from 'react-router-dom';
// import MyCard from './card';

// const { Header, Content, Sider } = Layout;

// // Sample data for the list
// const mockData = [
//   {
//     key: '1',
//     name: 'John Doe',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jane Smith',
//     age: 25,
//     address: 'London No. 2 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Mike Johnson',
//     age: 45,
//     address: 'Sydney No. 3 Lake Park',
//   },
// ];

// // Mock API function with adjustable delay
// const mockApi = (delay: number): Promise<typeof mockData> =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockData);
//     }, delay);
//   });

// // Table columns configuration
// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_: any, record: any) => (
//       <Space size="middle">
//         <a>Edit</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

// // Menu items with paths for navigation
// const menus: MenuProps['items'] = [
//   {
//     key: '1',
//     icon: <UserOutlined />,
//     label: '列表',
//     path: '/list',
//   },
//   {
//     key: '2',
//     icon: <LaptopOutlined />,
//     label: '展示',
//     path: '/laptop',
//   },
// ];

// // List Page Component
// const ListPage: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   // State for table data and loading
//   const [dataSource, setDataSource] = useState<typeof mockData>([]);
//   const [loading, setLoading] = useState(false);

//   // Handle URL query parameters
//   const [searchParams, setSearchParams] = useSearchParams();
//   const delayParam = searchParams.get('delay');
//   const delay = delayParam ? parseInt(delayParam, 10) : 1000;

//   // Fetch data when delay changes
//   useEffect(() => {
//     const effectiveDelay =
//       isNaN(delay) || delay < 100 || delay > 5000 ? 1000 : delay;
//     const fetchData = async () => {
//       setLoading(true);
//       const data = await mockApi(effectiveDelay);
//       setDataSource(data);
//       setLoading(false);
//     };
//     fetchData();
//   }, [delay]);

//   // Debounce function

//   return (
//     <>
//       <Breadcrumb
//         items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
//         style={{ margin: '16px 0' }}
//       />
//       <Content
//         style={{
//           padding: 24,
//           margin: 0,
//           minHeight: 280,
//           background: colorBgContainer,
//           borderRadius: borderRadiusLG,
//         }}
//       >
//         <Table
//           dataSource={dataSource}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           style={{ marginTop: 16 }}
//           loading={loading}
//         />
//       </Content>
//     </>
//   );
// };

// // Main App Component
// const App: React.FC = () => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // State for table data and loading
//   const [dataSource, setDataSource] = useState<typeof mockData>([]);
//   const [loading, setLoading] = useState(false);

//   // Handle URL query parameters
//   const [searchParams, setSearchParams] = useSearchParams();
//   const delayParam = searchParams.get('delay');
//   const delay = delayParam ? parseInt(delayParam, 10) : 1000;

//   // Handle menu click for navigation
//   const handleMenuClick: MenuProps['onClick'] = (e) => {
//     const menuItem = menus.find((item) => item?.key === e.key);
//     if (menuItem && 'path' in menuItem && menuItem.path) {
//       navigate(menuItem.path);
//     }
//   };

//   // Determine selected menu key based on current path
//   const selectedKey =
//     menus.find((item) => 'path' in item && item.path === location.pathname)
//       ?.key || '1';

//   const debounce = <T extends (...args: any[]) => void>(
//     func: T,
//     wait: number,
//   ) => {
//     let timeout: NodeJS.Timeout | null = null;
//     return (...args: Parameters<T>) => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), wait);
//     };
//   };

//   // Debounced slider change handler
//   const handleSliderChange = debounce((value: number) => {
//     setSearchParams({ delay: value.toString() });
//   }, 500);

//   return (
//     <Layout>
//       <Header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//         {/* <div className="demo-logo" /> */}
//         <div style={{ marginLeft: 'auto', color: '#fff' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
//             <div>API 延迟</div>
//             <Slider
//               min={100}
//               max={5000}
//               step={100}
//               value={delay}
//               onChange={handleSliderChange}
//               // tooltip={{ formatter: (value) => ${value}ms }}
//               style={{
//                 width: 150,
//                 display: 'inline-block',
//                 verticalAlign: 'middle',
//               }}
//             />
//           </div>
//         </div>
//       </Header>
//       <Layout>
//         <Sider width={200} style={{ background: colorBgContainer }}>
//           <Menu
//             mode="inline"
//             selectedKeys={[selectedKey]}
//             defaultOpenKeys={['sub1']}
//             style={{ height: '100%', borderRight: 0 }}
//             items={menus}
//             onClick={handleMenuClick}
//           />
//         </Sider>
//         <Layout>
//           <Routes>
//             <Route path="/list" element={<ListPage />} />
//             <Route path="/laptop" element={<MyCard />} />
//             <Route path="/" element={<ListPage />} /> {/* Default route */}
//           </Routes>
//         </Layout>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import * as Icons from '@ant-design/icons'; // 导入整个图标库
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Table, Space, Slider } from 'antd';
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { mockData } from './mockData';

const { Header, Content, Sider } = Layout;

// 模拟 API 函数，支持可调延迟
const mockApi = (delay: number): Promise<typeof mockData> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, delay);
  });

// 表格列配置
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: any) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

// 菜单项，包含导航路径
const menus: MenuProps['items'] = [
  {
    key: '1',
    icon: <Icons.UserOutlined />,
    label: '列表',
    path: '/list',
  },
  {
    key: '2',
    icon: <Icons.LaptopOutlined />,
    label: '笔记本',
    path: '/laptop',
  },
];

// 防抖函数
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// 列表页面组件
const ListPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 表格数据和加载状态
  const [dataSource, setDataSource] = useState<typeof mockData>([]);
  const [loading, setLoading] = useState(false);

  // 处理 URL 查询参数
  const [searchParams, setSearchParams] = useSearchParams();
  const delayParam = searchParams.get('delay');
  const delay = delayParam ? parseInt(delayParam, 10) : 1000;

  // 当延迟变化时获取数据
  useEffect(() => {
    const effectiveDelay =
      isNaN(delay) || delay < 100 || delay > 5000 ? 1000 : delay;
    const fetchData = async () => {
      setLoading(true);
      const data = await mockApi(effectiveDelay);
      setDataSource(data);
      setLoading(false);
    };
    fetchData();
  }, [delay]);

  // 防抖的滑块变更处理
  const handleSliderChange = debounce((value: number) => {
    setSearchParams({ delay: value.toString() });
  }, 500);

  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ marginLeft: 'auto', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>API 延迟</div>
            <Slider
              min={100}
              max={5000}
              step={100}
              value={delay}
              onChange={handleSliderChange}
              tooltip={{ formatter: (value) => `${value}ms` }}
              style={{
                width: 150,
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </div>
      </Header>
      <Breadcrumb
        items={[{ title: '首页' }, { title: '列表' }, { title: '应用' }]}
        style={{ margin: '16px 0' }}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 16 }}
          loading={loading}
        />
      </Content>
    </>
  );
};

// 笔记本页面组件（占位）
const LaptopPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ marginLeft: 'auto', color: '#fff' }}>
          <div>笔记本页面</div>
        </div>
      </Header>
      <Breadcrumb
        items={[{ title: '首页' }, { title: '笔记本' }, { title: '应用' }]}
        style={{ margin: '16px 0' }}
      />
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <h2>笔记本页面</h2>
        <p>这是一个笔记本页面的占位内容。</p>
        {/* 使用额外图标以确保图标库被打包 */}
        <div>
          <Icons.SmileOutlined style={{ fontSize: 24, marginRight: 8 }} />
          <Icons.HeartOutlined style={{ fontSize: 24, marginRight: 8 }} />
          <Icons.StarOutlined style={{ fontSize: 24 }} />
        </div>
      </Content>
    </>
  );
};

// 主应用组件
const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();

  // 处理菜单点击导航
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const menuItem = menus.find((item) => item?.key === e.key);
    if (menuItem && 'path' in menuItem && menuItem.path) {
      navigate(menuItem.path);
    }
  };

  // 根据当前路径确定选中的菜单项
  const selectedKey =
    menus.find((item) => 'path' in item && item.path === location.pathname)
      ?.key || '1';

  return (
    <Layout>
      <Sider width={200} style={{ background: colorBgContainer }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={menus}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/laptop" element={<LaptopPage />} />
          <Route path="/" element={<ListPage />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;
