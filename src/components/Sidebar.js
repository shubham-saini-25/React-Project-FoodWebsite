import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeMenu } from '../constants/data';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';

const Sidebar = () => {
    return (
        <div style={{ height: '100%', maxHeight: '100%' }}>
            <CDBSidebar textColor="#fff" className="bg-dark">
                <hr className="text-secondary" />
                <CDBSidebarHeader prefix={<i className='fa fa-bars mt-2'></i>} style={{ marginTop: '-1rem' }}>
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit', marginLeft: '1rem', fontSize: '20px' }}>Food Corner</a>
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        {HomeMenu.map((item, idx) => (
                            <NavLink exact={item.toString()} key={idx} to={item.name !== 'Home' ? `/category/${item.link}` : '/'}>
                                <CDBSidebarMenuItem className={`${item.name !== 'Home' ? 'selectNav' : 'activeNav'}`} icon={item.icon}>{item.name}</CDBSidebarMenuItem>
                            </NavLink>
                        ))}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;