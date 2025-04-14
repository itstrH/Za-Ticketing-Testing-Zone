// EventDetail.js
import { Page, Header, Box, Text, Button } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const EventDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Lấy eventId từ state được truyền khi điều hướng từ trang chủ
    const eventId = location.state?.eventId;

    // State để lưu trữ thông tin chi tiết sự kiện lấy từ API
    const [event, setEvent] = useState(null);
    // State để theo dõi trạng thái tải dữ liệu
    const [loading, setLoading] = useState(true);
    // State để lưu trữ lỗi nếu có lỗi xảy ra trong quá trình gọi API
    const [error, setError] = useState(null);

    // useEffect hook để gọi API lấy chi tiết sự kiện khi component được mount hoặc khi eventId thay đổi
    // useEffect(() => {
    //     // Kiểm tra xem có eventId hay không
    //     if (!eventId) {
    //         setError("Không có eventId");
    //         setLoading(false);
    //         return;
    //     }

    //     // Hàm bất đồng bộ để gọi API
    //     const fetchEventDetails = async () => {
    //         setLoading(true); // Bắt đầu trạng thái tải
    //         setError(null); // Reset lỗi trước mỗi lần gọi API
    //         try {
    //             // Gọi API GET để lấy chi tiết sự kiện dựa trên eventId
    //             const response = await axios.get(`http://localhost:3001/api/events/${eventId}`);
    //             // Nếu gọi API thành công, cập nhật state event với dữ liệu nhận được
    //             setEvent(response.data);
    //         } catch (err) {
    //             // Nếu có lỗi xảy ra trong quá trình gọi API, cập nhật state error
    //             setError("Lỗi khi tải chi tiết sự kiện");
    //         } finally {
    //             // Dù thành công hay thất bại, kết thúc trạng thái tải
    //             setLoading(false);
    //         }
    //     };

    //     // Gọi hàm fetchEventDetails khi component mount hoặc eventId thay đổi
    //     fetchEventDetails();
    // }, [eventId]); // Dependency array: useEffect sẽ chạy lại nếu giá trị của eventId thay đổi


    useEffect(() => {
        axios
          .get(`http://localhost:3001/api/events/${eventId}`)
          .then((response) => {
            setEvent(response.data);
            setLoading(false); // Giả sử thành công thì ngừng loading
          })
          .catch((err) => {
            setError("Lỗi khi tải chi tiết sự kiện");
            setLoading(false); // Dừng loading khi có lỗi
          });
      
        // Chúng ta KHÔNG có cleanup function ở đây
      }, [eventId]);

    // Hiển thị trạng thái tải
    if (loading) {
        return (
            <Page className="bg-white dark:bg-black flex items-center justify-center">
                <Text>Đang tải chi tiết sự kiện...</Text>
            </Page>
        );
    }

    // Hiển thị lỗi nếu có lỗi xảy ra
    if (error) {
        return (
            <Page className="bg-white dark:bg-black flex items-center justify-center">
                <Text variant="error">Lỗi: {error}</Text>
            </Page>
        );
    }

    // Hiển thị thông báo nếu không có dữ liệu sự kiện
    if (!event) {
        return (
            <Page className="bg-white dark:bg-black">
                <Box className="p-4">
                    <Text size="large" className="text-center">
                        Không tìm thấy dữ liệu sự kiện.
                    </Text>
                </Box>
            </Page>
        );
    }

    // Hiển thị chi tiết sự kiện nếu dữ liệu đã được tải thành công
    return (
        <Page className="bg-white dark:bg-black">
            {/* Header với nút back để quay lại trang trước */}
            <Header title="Chi tiết sự kiện" back={() => navigate(-1)} />
            <Box className="p-4">
                {/* Hiển thị ảnh banner của sự kiện */}
                <img
                    src={event.banner_url}
                    alt={event.event_name}
                    className="rounded-xl shadow-xl w-full h-[300px] object-cover mb-4"
                />

                {/* Hiển thị tiêu đề sự kiện */}
                <Text.Title size="large" className="text-center mb-4">
                    {event.event_name}
                </Text.Title>

                {/* Hiển thị địa điểm sự kiện */}
                <Text className="text-gray-500 text-base mb-6">{event.event_location}</Text>
                {/* Hiển thị thời gian sự kiện (định dạng lại ngày giờ) */}
                <Text className="text-sm text-gray-400 mb-4">
                    <strong>Thời gian: </strong>{new Date(event.event_date).toLocaleString()}
                </Text>
                {/* Hiển thị lại địa điểm sự kiện */}
                <Text className="text-sm text-gray-400 mb-4">
                    <strong>Địa điểm: </strong>{event.event_location}
                </Text>

                {/* Button để chuyển đến trang mua vé, truyền eventId qua state */}
                <Button
                    className="w-full bg-green-500 text-white rounded-full mt-4"
                    onClick={() => navigate("/ticket", { state: { eventId: event.event_id } })}
                >
                    Mua vé ngay
                </Button>
            </Box>
        </Page>
    );
};

export default EventDetail;