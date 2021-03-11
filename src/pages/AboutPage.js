import Banner from '../components/layout/user/blogPage/Banner';

function AboutPage() {
    return (
        <>
            <Banner title='Giới thiệu' />
            <h1 className='category-title'>
                Giới thiệu chung
                <div className='underlined-category-title'></div>
            </h1>

            <div className='info-detail'>
                {/* ==== Test ==== */}
                <p dir='ltr'>
                    Thành lập năm 1968, là DN độc lập trực thuộc Bộ NN và PTNT, thực hiện chủ trương của Đảng và Chính
                    phủ về đổi mới cơ chể quản lý DN, tháng 11/2003 Bộ Nông nghiệp và PTNT đã có Quyết định 5029 CPH
                    công ty với Vốn điều lệ ban đầu 13,5 tỷ đồng, quy mô kinh doanh chỉ có 50 tỷ đồng doanh thu. Với sự
                    đổi mới quản trị DN, chiến lược lấy KHCN làm nền tảng và động lực nâng cao năng lực cạnh tranh, huy
                    động tối đa các nguồn lực xã hội cùng tham gia phát triển công ty, sau 15 năm CPH, Vinaseed đã trở
                    thành Tập đoàn nông nghiệp có quy mô và thị phần lớn nhất Việt Nam:
                </p>

                <ul>
                    <li dir='ltr'>
                        <p dir='ltr' role='presentation'>
                            Quy mô kinh doanh đạt: 85.000 tấn hạt giống, tương đương 1 triệu ha gieo trồng.
                        </p>
                    </li>
                    <li dir='ltr'>
                        <p dir='ltr' role='presentation'>
                            Doanh thu: 1605 tỷ đồng. Trong đó, 80% là sản phẩm KHCN, tương đương 1200 tỷ đồng, chiếm 20%
                            thị phần cả nước.
                        </p>
                    </li>
                    <li dir='ltr'>
                        <p dir='ltr' role='presentation'>
                            Vốn chủ sở hữu: 1052 tỷ đồng.
                        </p>
                    </li>
                    <li dir='ltr'>
                        <p dir='ltr' role='presentation'>
                            Tốc độ tăng trưởng bình quân: 30%/năm.&nbsp;
                        </p>
                    </li>
                    <li dir='ltr'>
                        <p dir='ltr' role='presentation'>
                            Vinaseed nằm trong Top 10 doanh nghiệp có năng lực quản trị tốt nhất sàn chứng khoán VN,
                            quản trị tài chính đứng đầu DN ngành trồng trọt, TOP 500 doanh nghiệp lớn và tăng trưởng
                            nhanh nhất VN liên tục 6 năm liền, TOP 50 công ty kinh doanh hiệu quả nhất VN,&nbsp; và là 1
                            trong 200 công ty có doanh thu dưới 1 tỷ USD tốt nhất Châu Á – TBD.
                        </p>
                    </li>
                </ul>
            </div>

            {/* ==x==Test ==x== */}
        </>
    );
}
export default AboutPage;
