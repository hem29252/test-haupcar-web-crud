import type { ICarCreateRequest } from "../../../types/car";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Breadcrumb,
  Button,
  Card,
  Row,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import { carService } from "../../../services/car.service";
import { API_STATUS } from "../../../constants/api";
import { NOTIFICATIONS } from "../../../constants/notification";

type FieldType = {
  registration_number: string;
  brand: string;
  model: string;
  notes?: string;
};

export const CarEditPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm<FieldType>();

  const getCarById = async (carId: string) => {
    setIsLoading(true);

    try {
      const response = await carService.getCarByCarId(carId);

      if (!response.data) {
        api.warning(NOTIFICATIONS.SomethingWrong);
        setIsLoading(false);

        return;
      }

      if (response.data.statusCode !== API_STATUS.SUCCESS) {
        api.warning(NOTIFICATIONS.SomethingWrong);
        setIsLoading(false);

        return;
      }

      const { data: carInfo } = response.data;

      form.setFieldsValue({
        brand: carInfo.brand,
        model: carInfo.model,
        notes: carInfo?.notes,
        registration_number: carInfo.registration_number,
      });
    } catch {
      api.warning(NOTIFICATIONS.SomethingWrong);
    }

    setIsLoading(false);
  };

  const handleFinish = async (values: FieldType) => {
    setIsLoading(true);

    try {
      const payload: ICarCreateRequest = {
        registration_number: values.registration_number,
        brand: values.brand,
        model: values.model,
        notes: values.notes,
      };
      const carId = params.carId as string;
      const response = await carService.putCarById(carId, payload);

      if (!response.data) {
        api.warning(NOTIFICATIONS.SomethingWrong);
        setIsLoading(false);

        return;
      }

      if (response.data.statusCode !== API_STATUS.SUCCESS) {
        api.warning(NOTIFICATIONS.SomethingWrong);
        setIsLoading(false);

        return;
      }

      api.success(NOTIFICATIONS.Success);

      navigate("/car");
    } catch {
      api.warning(NOTIFICATIONS.SomethingWrong);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!params.carId) {
      return;
    }

    getCarById(params.carId);
  }, [params.carId]);

  return (
    <>
      <Typography.Title level={2}>
        Edit Car - {form.getFieldValue("registration_number")}
      </Typography.Title>
      {contextHolder}
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Row justify={"space-between"} align={"middle"}>
          <Breadcrumb
            items={[{ title: "Car" }, { title: "Edit" }]}
            style={{ margin: "16px 0" }}
          />
          <Row style={{ gap: 6 }} align={"middle"}>
            <Link to="/car">
              <Button disabled={isLoading}>CANCEL</Button>
            </Link>
            <Button
              loading={isLoading}
              htmlType="submit"
              style={{ minWidth: 89 }}
              type="primary"
            >
              SAVE
            </Button>
          </Row>
        </Row>
        <Card>
          <div>
            <Form.Item<FieldType>
              label="Car registration number"
              name="registration_number"
              rules={[
                {
                  required: true,
                  message: "Please enter car registration number!",
                },
              ]}
            >
              <Input maxLength={200} />
            </Form.Item>
            <Form.Item<FieldType>
              label="Car brand"
              name="brand"
              rules={[{ required: true, message: "Please enter car brand!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Car model"
              name="model"
              rules={[
                {
                  required: true,
                  message: "Please enter car model!",
                },
              ]}
            >
              <Input maxLength={200} />
            </Form.Item>
          </div>
          <Form.Item<FieldType> label="Notes" name="notes">
            <Input.TextArea rows={10} maxLength={1000} />
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};
