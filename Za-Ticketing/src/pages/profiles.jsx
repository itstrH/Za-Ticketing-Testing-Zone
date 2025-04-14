import { useState } from "react";
import { Page, Input, Button, Icon, Radio } from "zmp-ui";
import { useNavigate } from "react-router-dom";  

const Profile = () => {
  const navigate = useNavigate();  
  const [fullName, setFullName] = useState("Khoa Nguyen");
  const [phone, setPhone] = useState("364923127");
  const [email] = useState("khoa95905@gmail.com");
  const [dob, setDob] = useState("2004-09-19");
  const [gender, setGender] = useState("male");
  const [countryCode, setCountryCode] = useState("+84");

  return (
    <Page className="bg-black text-white p-4">
      <div className="flex items-center mb-4">
        <Icon
          icon="zi-arrow-left"
          className="text-white mr-2 cursor-pointer"
          onClick={() => navigate("/")}  // ve trang chu
        />
        <h1 className="text-lg font-semibold">Trang chủ</h1>
      </div>

      {/* profile pic */}
      <div className="flex flex-col items-center mb-6 mt-4">
        <img
          src="https://i.pinimg.com/736x/b4/bb/b2/b4bbb2198b036fe1024571ec6b60f8b8.jpg"
          alt="avatar"
          className="w-24 h-24 rounded-full mb-2"
        />
        <div className="bg-green-500 p-1 rounded-full -mt-6 ml-16">
          <Icon icon="zi-camera" className="text-white text-xs" />
        </div>
        <p className="text-center mt-2 text-sm text-white px-4">
          Cung cấp thông tin chính xác sẽ hỗ trợ bạn trong quá trình mua vé, hoặc khi cần xác thực vé
        </p>
      </div>

      {/* form info */}
      <div className="space-y-4">
        <Input
          label="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        {/* Input SDT */}
        <div className="flex items-center bg-white rounded-lg overflow-hidden border border-gray-300 w-full">
          {/* chọn tiền tố sdt */}
          <select
            className="bg-gray-100 px-3 py-2 outline-none text-black text-sm border-r border-gray-300"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+84">+84</option>
            <option value="+1">+1</option>
            <option value="+61">+61</option>
            {/* thêm mã vùng khác */}
          </select>

          {/* Phone input */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            className="flex-1 px-3 py-2 outline-none text-black text-sm bg-white"
          />

          {/* Clear button */}
          {phone && (
            <button
              onClick={() => setPhone("")}
              className="px-3 text-gray-500 hover:text-red-500"
            >
              <Icon icon="zi-close-circle" />
            </button>
          )}
        </div>

        {/* Email input */}
        <div className="relative w-full">
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 pr-10 py-3 rounded-lg bg-white text-black border border-gray-300 disabled:bg-white disabled:text-black"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-green-500 text-xl pointer-events-none">
            <Icon icon="zi-check-circle-solid" />
          </span>
        </div>

        {/* dob input */}
        <Input
          label="Ngày tháng năm sinh"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        {/* gender select */}
        <div className="mt-4">
          <Radio.Group value={gender} onChange={setGender} className="text-white space-x-4">
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </div>
      </div>

      {/* submit btn */}
      <Button className="mt-8 w-full bg-green-500 text-white font-semibold rounded-full">
        Hoàn thành
      </Button>
    </Page>
  );
};

export default Profile;