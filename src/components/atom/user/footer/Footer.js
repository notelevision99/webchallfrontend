import React from "react";
import GoogleMapReact from "google-map-react";

//Icons
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

//img
import Logo from "../../../../assets/images/logo-footer.png";

function Footer() {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  let defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="ft-brand">
          <div className="logo-ft">
            <img src={Logo} />
          </div>
          <div className="ft-brand__bottom">
            <p className="item">company</p>
            <p className="item">media</p>
            <p className="item">pr agencies</p>
          </div>
        </div>

        <div className="ft-content">
          <div className="ft-content--top">
            <div className="ft-c-item">
              <div className="ft-media">
                {/* <div style={{ height: "100vh", width: "100%" }}>
                  <GoogleMapReact
                    defaultCenter={defaultProps.center}
                    defaultZoom={this.props.zoom}
                  >
                    <AnyReactComponent
                      lat={59.955413}
                      lng={30.337844}
                      text="My Marker"
                    />
                  </GoogleMapReact>
                </div> */}
              </div>
            </div>

            <div className="ft-c-item">
              <div className="ft-c-item__name">
                <h4>tập đoàn giống cây trồng việt nam</h4>
              </div>
              <div className="ft-c-item__info m-l">
                <div className="ft-address">
                  <p className="ft-address--icon">
                    <InstagramIcon />
                  </p>

                  <p className="ft-address--title">Địa chỉ:&nbsp;</p>

                  <p className="ft-address--info">
                    Số 1 Lương Định Của, Phương Mai, Đống Đa, Hàng Nội
                  </p>
                </div>

                <div className="ft-address">
                  <p className="ft-address--icon">
                    <InstagramIcon />
                  </p>

                  <p className="ft-address--title">Đỉện thoại:&nbsp;</p>

                  <p className="ft-address--info">(024)-38523294</p>
                </div>

                <div className="ft-address">
                  <p className="ft-address--icon">
                    <InstagramIcon />
                  </p>

                  <p className="ft-address--title">Email:&nbsp;</p>

                  <p className="ft-address--info">nsc@vinaseed.com.vn</p>
                </div>

                <div className="ft-address">
                  <p className="ft-address--icon">
                    <InstagramIcon />
                  </p>

                  <p className="ft-address--title">Fax:&nbsp;</p>

                  <p className="ft-address--info">(024)-38527996</p>
                </div>
              </div>
            </div>

            <div className="ft-c-item">
              <div className="ft-c-item__name">
                <h4>theo dõi chúng tôi tại</h4>
              </div>

              <div className="ft-c-item__info">
                <div className="ft-media">
                  <p>
                    <FacebookIcon />
                  </p>
                  <p>
                    <InstagramIcon />
                  </p>
                  <p>
                    <TwitterIcon />
                  </p>
                  <p>
                    <LinkedInIcon />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="ft-content--policy">
            <small>Term & Condition</small>
            <small>Privacy Policy</small>
            <small>
              Copyright &copy; 2020,Ltd. All rights reserved. Site credit.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
