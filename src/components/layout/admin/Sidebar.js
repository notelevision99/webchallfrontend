import React from "react";
import  "../css/LeftNavBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBabyCarriage, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faAffiliatetheme } from "@fortawesome/free-brands-svg-icons";
import { API_URL } from "../../../helpers/admin/urlCallAxios";
 class SideBar extends React.Component{
   constructor(props){
     super(props)
      
     
   }
    render(){
      
        return (
        
            <header className="header">
              <div className="header_navbar">
                <div className="header_navbar_home">
                  <div className="header_navbar_home-icon">
                    {/* <i className="fab fa-affiliatetheme fa-2x " /> */}
                    <FontAwesomeIcon icon={faAffiliatetheme} size='2x' />
                  </div>
                  <div className="header_navbar_home-title">
                    <span>Admin</span>
                  </div>
                </div>
                <div className="header_navbar_profile">
                  <div className="header_navbar_profile-icon">
                    {/* <i className="far fa-user-circle fa-2x" /> */}
                    <FontAwesomeIcon icon={faUserCircle} size='2x'  />
                  </div>
                  <div className="header_navbar_profile-title">
                    <span>User</span>
                  </div>
                </div>
                <div className="container_list_item">
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon ">
                        <i className="fas fa-tachometer-alt" />
                      </div>
                      <div className="list_item_dashboard-title" id="dashboard_click">
                        <span><a className="link_header-dashboard" href="dashboard.html">Dashboard</a></span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="fas fa-user-friends " />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Quản lý sản phẩm</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="fas fa-magnet" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Growth Tools</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="far fa-comment-dots" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Live chat</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="fas fa-paper-plane" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Broadcasting</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="far fa-play-circle" />
                      </div>
                      <div className="list_item_dashboard-title" id="dropdown-contain">
                        <span>Automation</span>
                      </div>
                    </div>
        
                    <div id="drop-down-list">
                      <div className="list_item_dashboard_dropdown">
                        <div className="list_item_dashboard_dropdown-icon">
                          <i className="far fa-play-circle" />
                        </div>
                        <div className="list_item_dashboard_dropdown-title" id="keyword_click">
                          <span><a className="link_header-keyword" href="keyword.html" />Keywords</span>
                        </div>
                      </div>
                      <div className="list_item_dashboard_dropdown">
                        <div className="list_item_dashboard_dropdown-icon">
                          <i className="far fa-play-circle" />
                        </div>
                        <div className="list_item_dashboard_dropdown-title">
                          <span>drop test2</span>
                        </div>
                      </div>
                      <div className="list_item_dashboard_dropdown">
                        <div className="list_item_dashboard_dropdown-icon">
                          <i className="far fa-play-circle" />
                        </div>
                        <div className="list_item_dashboard_dropdown-title">
                          <span>drop test3</span>
                        </div>
                      </div>
                    </div>
                   
                  </div>
        
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="fab fa-facebook-square" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Ads</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="fas fa-cog" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="fas fa-synagogue" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Templates</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="far fa-user-circle" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>My profile</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_dashboard">
                      <div className="list_item_dashboard-icon">
                        <i className="far fa-question-circle" />
                      </div>
                      <div className="list_item_dashboard-title">
                        <span>Helps</span>
                      </div>
                    </div>
                  </div>
                  <div className="list_item">
                    <div className="list_item_btn">
                      <button className="list_item_btn-button">
                        <span>Upload to pro</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>

        

        )                 
    }
}
export default SideBar