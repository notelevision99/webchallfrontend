import React from 'react'
import Header from '../../../layout/admin/Header';
import Menu from '../../../layout/admin/Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../../layout/admin/Footer';
export default class Home extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = false;
    }
    render() {
        return (
            <>
            <ToastContainer/>
            <Header/>
            <Menu/>
            <div className='content-wrapper'>
                Admin Home
            </div>
           
            </>
            
        )
    }
    
}
