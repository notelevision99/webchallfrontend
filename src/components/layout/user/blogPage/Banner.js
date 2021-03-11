import banner from '../../../../assets/images/banner/banner-1.jpg';

function Banner(props) {
    return (
        <>
            <div className='after-header'></div>
            <div className='banner-box'>
                <div className='banner'>
                    <h1 className='title-page'>
                        {props.title} <div className='underlined-title'></div>
                    </h1>

                    <img src={banner} />
                </div>
            </div>
        </>
    );
}
export default Banner;
