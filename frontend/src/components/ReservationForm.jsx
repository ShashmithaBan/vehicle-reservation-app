import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ReservationForm = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    email: "",
    location: "",
    vehicleNo: "",
    mileage: "",
    message: "",
    username: ""
    
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        ...formData,
        username: user.name || "",
        email: user.email,
      });
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    if (isAuthenticated) {
      let date1 = new Date(formData.date);
      let date2 = new Date();
      if (date1 > date2) {
        
        if (date1.getDay() === 0) {
          alert("Sunday is not a working day");

        } else {
          const response = await axios.post(
            "http://localhost:5000/reservation",
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          alert(response.data)
          navigate('/view')
        }
      } else alert("Enter Valid Date");
    } else {
      alert("Please Login");
    }
  };

  const sriLankaDistrict = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  return (
    <div className="mt-10">
      <h2 className="text-4xl font-semibold text-center my-2">Booking Form</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <div className="flex space-x-4">
        <div className="mb-4 w-[14rem] ">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            name="date"
            type="date"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4 w-[14rem] ">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="time">
            Time
          </label>
          <select
            name="time"
            onChange={handleChange}
            className="w-full px-3 py-[0.65rem] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="10AM">10AM</option>
            <option value="11AM">11AM</option>
            <option value="12PM">12PM</option>
          </select>
        </div>
        </div>
        

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <select
            name="location"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            {sriLankaDistrict.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="vehicleNo"
          >
            Vehicle No
          </label>
          <input
            name="vehicleNo"
            type="text"
            placeholder="Vehicle No"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="mileage"
          >
            Mileage
          </label>
          <input
            name="mileage"
            type="number"
            placeholder="Mileage"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            required
            placeholder="Message"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Booking
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
