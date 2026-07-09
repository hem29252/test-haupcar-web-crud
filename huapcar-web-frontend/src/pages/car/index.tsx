import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Pagination,
  Row,
  Table,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { carService } from "../../services/car.service";
import type { ICar, ICarResponse } from "../../types/car";
import { Link } from "react-router";
import { NOTIFICATIONS } from "../../constants/notification";
import { API_STATUS } from "../../constants/api";
import dayjs, { Dayjs } from "dayjs";

const useCarList = () => {
  const [searchForm] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [carResponse, setCarResponse] = useState<ICarResponse>({
    rows: [],
    pagination: {
      page: 1,
      limit: 10,
      next: true,
      prev: false,
      totalPage: 1,
      totalRaws: 0,
    },
  });

  const [api, contextHolder] = notification.useNotification();

  const getCars = async (
    page: number,
    limit: number,
    filter: { search?: string; startDate?: string; endDate?: string } = {},
  ) => {
    setIsLoading(true);
    try {
      const { endDate, search, startDate } = filter;
      const response = await carService.getCars({
        page,
        limit,
        endDate,
        search,
        startDate,
      });
      if (!response.data.data) {
        return;
      }

      const { data } = response.data;
      setCarResponse(data);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleDeleteCar = async (carId: string) => {
    const response = await carService.deleteCarByCarId(carId);

    if (!response.data) {
      api.warning(NOTIFICATIONS.SomethingWrong);

      return;
    }

    if (response.data.statusCode !== API_STATUS.SUCCESS) {
      api.warning(NOTIFICATIONS.SomethingWrong);

      return;
    }

    api.success(NOTIFICATIONS.Success);

    getCars(carResponse.pagination.page, carResponse.pagination.limit);
  };

  return {
    carResponse,
    getCars,
    isLoading,
    contextHolder,
    handleDeleteCar,
    searchForm,
  };
};

type CarListContextValue = ReturnType<typeof useCarList>;

const CarListContext = createContext<CarListContextValue | undefined>(
  undefined,
);

const CarListContextProvider: FC<PropsWithChildren> = (props) => {
  const carList = useCarList();

  return <CarListContext value={carList}>{props.children}</CarListContext>;
};

const useCarListContext = () => {
  const carListContext = useContext(CarListContext);

  if (!carListContext) {
    throw new Error("CarListContext undefined");
  }

  return carListContext;
};

const CarListTable = () => {
  const { carResponse, getCars, isLoading, handleDeleteCar, searchForm } =
    useCarListContext();
  const { pagination, rows } = carResponse;

  const handleChangePagination = (page: number, pageSize: number) => {
    const values = searchForm.getFieldsValue();
    const filter = {
      search: "",
      startDate: "",
      endDate: "",
    };

    if (values.search) {
      filter.search = values.search.trim();
    }

    if (values.dateRange?.[0]) {
      filter.startDate = dayjs(values.dateRange[0]).format("YYYY-MM-DD");
    }

    if (values.dateRange?.[1]) {
      filter.endDate = dayjs(values.dateRange[1]).format("YYYY-MM-DD");
    }

    getCars(page, pageSize, filter);
  };

  const columns: ColumnsType<ICar> = [
    {
      title: "#",
      render: (_, __, index) => {
        let no = pagination.limit * pagination.page;
        no = no - pagination.limit;
        no = no + index;
        no = no + 1;

        return <>{no}</>;
      },
    },
    {
      title: "Registration Number",
      dataIndex: "registration_number",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    { title: "Notes", dataIndex: "notes" },
    {
      title: "Date",
      dataIndex: "updated_at",
      render: (_, record) => (
        <>{dayjs(record.created_at).format("DD/MM/YYYY HH:mm")}</>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (carId) => (
        <Row style={{ gap: 6, flexWrap: "nowrap" }}>
          <Link to={`/car/edit/${carId}`}>
            <Button size="small" icon={<EditOutlined />}>
              EDIT
            </Button>
          </Link>
          <Button
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDeleteCar(carId);
            }}
          >
            DELETE
          </Button>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Table
        rowKey={"id"}
        scroll={{
          x: true,
          y: 680,
        }}
        loading={isLoading}
        columns={columns}
        dataSource={rows || []}
        pagination={false}
      />
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <Pagination
          onChange={handleChangePagination}
          current={pagination.page}
          total={pagination.totalRaws}
          pageSize={pagination.limit}
          showSizeChanger
        />
      </div>
    </div>
  );
};

const CarListSearch = () => {
  const { getCars, searchForm } = useCarListContext();

  const handleFinish = (values: {
    search: string;
    dateRange: [Dayjs, Dayjs];
  }) => {
    const filter = {
      search: "",
      startDate: "",
      endDate: "",
    };

    if (values.search) {
      filter.search = values.search.trim();
    }

    if (values.dateRange?.[0]) {
      filter.startDate = dayjs(values.dateRange[0]).format("YYYY-MM-DD");
    }

    if (values.dateRange?.[1]) {
      filter.endDate = dayjs(values.dateRange[1]).format("YYYY-MM-DD");
    }

    getCars(1, 10, filter);
  };

  return (
    <>
      <Form form={searchForm} onFinish={handleFinish}>
        <Row style={{ marginBlock: 16, gap: 16 }} justify={"space-between"}>
          <Col md={20} xs={24}>
            <Row style={{ gap: 6 }} align={"middle"}>
              <Col xs={24} md={10}>
                <Form.Item noStyle name="search" label="Date Range">
                  <Input
                    width={"100%"}
                    placeholder="Search by registration number, brand, or model"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item noStyle name="dateRange" label="Date Range">
                  <DatePicker.RangePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={1}>
                <Button
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ minWidth: "100%" }}
                  type="primary"
                >
                  SEARCH
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const CarList = () => {
  const { getCars, contextHolder } = useCarListContext();

  useEffect(() => {
    getCars(1, 10);
  }, []);

  return (
    <>
      {contextHolder}
      <Typography.Title level={2}>Car Information</Typography.Title>
      <Row justify={"space-between"} align={"middle"}>
        <Breadcrumb
          items={[
            {
              title: "Car",
            },
          ]}
          style={{ marginBlock: 16 }}
        />
        <Link to="/car/add">
          <Button icon={<PlusOutlined />} type="primary">
            ADD CAR
          </Button>
        </Link>
      </Row>
      <Card>
        <CarListSearch />
        <CarListTable />
      </Card>
    </>
  );
};

export function CarListPage() {
  return (
    <CarListContextProvider>
      <CarList />
    </CarListContextProvider>
  );
}
