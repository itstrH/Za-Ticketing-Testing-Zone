// src/pages/Ticket.jsx
import { Box, Page, Tabs, Text, Button, Icon } from "zmp-ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Ticket = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();  // Hook để điều hướng

  const EmptyState = () => (
    <Box className="flex flex-col items-center justify-center py-12 space-y-4">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eFoeD1oksLrWk6ucGb6cOOUL1yfYqbhOhw&s"
        alt="empty"
        className="w-40 h-40 object-contain"
      />
      <Text size="large" className="text-center font-medium">
        Bạn chưa có vé nào
      </Text>
      <Button type="primary">Mua vé ngay</Button>
    </Box>
  );

  return (
    <Page className="bg-white dark:bg-black">
      {/* Nút back */}
      <Box className="px-4 pt-4 flex items-center">
        <Icon
          icon="zi-arrow-left"
          className="text-black dark:text-white mr-2 cursor-pointer"
          onClick={() => navigate("/")}  // Điều hướng về trang chủ
        />
        <Text.Title className="text-lg">Vé của tôi</Text.Title>
      </Box>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="px-4 pt-2"
      >
        <Tabs.Tab key="upcoming" label="Sắp diễn ra">
          <EmptyState />
        </Tabs.Tab>
        <Tabs.Tab key="past" label="Đã kết thúc">
          <EmptyState />
        </Tabs.Tab>
      </Tabs>
    </Page>
  );
};

export default Ticket;