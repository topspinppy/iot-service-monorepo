'use client'

import AuthGuard from "@/guards/AuthGuard";
import useAuth from "@/hooks/useAuth";
import DashboardModule from "@/modules/Dashboard/DashboardModule";
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;



export default function Dashboard() {
  const auth = useAuth()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <AuthGuard>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            items={[
              {
                key: '1',
                label: 'Logout',
                onClick: () => {
                  auth.logout();
                }
              }
            ]}
            defaultSelectedKeys={['2']}
            style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'end' }}
          />
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="h-screen"
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <DashboardModule />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </AuthGuard>
  );
}