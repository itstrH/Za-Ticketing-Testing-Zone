import {
  Box,
  Button,
  Icon,
  Page,
  Text,
  Swiper,
  Header,
  BottomNavigation,
} from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../static/bg.svg";
import axios from "axios";

function HomePage() {
  const [activeTab, setActiveTab] = useState("chat");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Gọi API khi load trang
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("Lỗi lấy danh sách sự kiện:", err);
      });
  }, []);

  // const handleEventClick = (event) => {
  //   navigate("/event-detail", { state: { event } });
  // };
  const handleEventClick = (event) => {
    navigate("/event-detail", { state: { eventId: event.event_id } });
  };


  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "chat") navigate("/");
    if (key === "contact") navigate("/ticket");
    if (key === "me") navigate("/profiles");
  };

  return (
    <Page
      className="flex flex-col items-center justify-center bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Header title="Za Ticketing" />

      {/* Swiper */}
      <Text.Title size="small" className="mt-4 px-4">
        Sự kiện sắp diễn ra
      </Text.Title>
      <Box className="w-full px-4 mt-2">
        <Swiper autoplay duration={6000} loop>
          {events.slice(0, 5).map((event, idx) => (
            <Swiper.Slide key={idx}>
              <img
                src={event.banner_url}
                alt={`slide-${idx}`}
                className="w-full rounded-xl shadow-md object-cover h-[200px]"
              />
            </Swiper.Slide>
          ))}
        </Swiper>
      </Box>

      {/* Sự kiện đặc biệt */}
      <Text.Title size="small" className="mt-6 px-4">
        Sự kiện đặc biệt
      </Text.Title>
      <Box
        className="flex overflow-x-auto gap-4 px-4 py-4 w-full"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {events.map((event, idx) => (
          <Box
            key={idx}
            onClick={() => handleEventClick(event)}
            className="min-w-[140px] max-w-[160px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={event.banner_url}
              // alt={`event-${idx}`}
              className="w-full h-[200px] object-cover"
            />
            <Box className="p-2">
              <Text.Title size="xSmall" className="truncate">
                {event.event_name}
              </Text.Title>
              <Text className="text-xs text-gray-500 truncate">
                {event.event_date}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => handleTabChange(key)}
      >
        <BottomNavigation.Item key="chat" label="Trang chủ" icon={<HomeIcon />} activeIcon={<HomeIcon />} />
        <BottomNavigation.Item key="contact" label="Vé của tôi" icon={<TicketIcon />} activeIcon={<TicketIcon />} />
        <BottomNavigation.Item key="me" label="Cá nhân" icon={<UserIcon />} activeIcon={<UserIcon />} />
      </BottomNavigation>
    </Page>
  );
}

// Icon components
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

export default HomePage;
