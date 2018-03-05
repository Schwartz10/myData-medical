
import React from 'react';
import { Nav, NavIcon, NavText, withRR4 } from 'react-sidenav';
// import { Link } from 'react-router-dom';
import SvgIcon from 'react-icons-kit';

import { key } from 'react-icons-kit/icomoon/key';
import { ic_business } from 'react-icons-kit/md/ic_business';

const SideNav = withRR4()
//specify the base color/background of the parent container if needed
const MySideNav = () => (
    <div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
        <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected=''>
            <Nav id='setup'>
                <NavIcon><SvgIcon size={20} icon={key}/></NavIcon>
                <NavText> Setup </NavText>
            </Nav>
            <Nav id='ooga'>
                <NavIcon><SvgIcon size={20} icon={ic_business}/></NavIcon>
                <NavText> Home </NavText>
            </Nav>
        </SideNav>
    </div>
)

export default MySideNav;
