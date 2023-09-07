import "./App.css";
import { Button, Form, Input, Modal, Avatar, Card, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  EllipsisOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  UilTornado,
  UilSun,
  UilTemperaturePlus,
} from "@iconscout/react-unicons";
import { useState } from "react";
import axios from "axios";
const { Meta } = Card;

function App() {
  const [modal, setModal] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({});
  const submit = async (data) => {
    // console.log(data);
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: data.Place },
      headers: {
        "X-RapidAPI-Key": "57bdef0a55msh853c7a6a08a5f89p14ce62jsnf28464dca64b",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherInfo(response.data);
      console.log(weatherInfo);
      setModal(true);
    } catch (error) {
      message.error(error.response.data.error.message);
    }
  };
  return (
    <div className="App">
      <Form className="Form" onFinish={submit}>
        <Form.Item>
          <h2>Sathish Weather Info</h2>
        </Form.Item>
        <Form.Item
          name="Place"
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input
            placeholder="Enter Your Location"
            prefix={<SearchOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Check Weather
          </Button>
        </Form.Item>
      </Form>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={[
          <Button key="btn" type="primary" onClick={() => setModal(false)}>
            Close
          </Button>,
        ]}
      >
        <Card
          style={{ padding: "10px" }}
          cover={
            <img
              style={{ height: "250px" }}
              alt="Weather icture"
              src="https://img.freepik.com/free-vector/girl-news-weather-forecast_1308-20992.jpg?w=740&t=st=1694088376~exp=1694088976~hmac=5d58722e8b483b43618024dad661f2b292ce9da2863bcbcdf0272e1d76b6929c"
            />
          }
          actions={[
            <h4>
              <UilTornado key="setting" /> <br />
              Max Wind:
              {weatherInfo.current !== undefined
                ? weatherInfo.forecast.forecastday[0].day.maxwind_kph
                : null}{" "}
              Km/h
              <br />
              Max Wind:
              {weatherInfo.current !== undefined
                ? weatherInfo.forecast.forecastday[0].day.maxwind_mph
                : null}{" "}
              m/h
            </h4>,
            <h4>
              <UilSun key="setting" /> <br />
              Sun Rise:
              {weatherInfo.current !== undefined
                ? weatherInfo.forecast.forecastday[0].astro.sunrise
                : null}
              <br />
              Sun Set:
              {weatherInfo.current !== undefined
                ? weatherInfo.forecast.forecastday[0].astro.sunset
                : null}
            </h4>,
            <h4>
              <UilTemperaturePlus key="setting" /> <br />
              Max Temp:
              {weatherInfo.current !== undefined
                ? weatherInfo.forecast.forecastday[0].day.maxtemp_c
                : null}{" "}
              (C)
              <br />
              Min Temp:
              {weatherInfo.current !== undefined
                ? weatherInfo.forecast.forecastday[0].day.mintemp_c
                : null}{" "}
              (C)
            </h4>,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={
                  weatherInfo.current !== undefined
                    ? weatherInfo.current.condition.icon
                    : null
                }
              />
            }
            title={
              weatherInfo.current !== undefined
                ? weatherInfo.location.name
                : null
            }
            description={
              weatherInfo.current !== undefined
                ? weatherInfo.current.condition.text
                : null
            }
          />
        </Card>
      </Modal>
    </div>
  );
}

export default App;
