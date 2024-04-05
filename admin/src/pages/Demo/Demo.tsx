import type { TableColumnsType } from "antd";
import { Button, Flex, Input, Modal, Popconfirm, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateCustomModal } from "../../store/customModalSlice";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Column 1",
    dataIndex: "address",
    key: "1",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 2",
    dataIndex: "address",
    key: "2",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 3",
    dataIndex: "address",
    key: "3",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 4",
    dataIndex: "address",
    key: "4",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 5",
    dataIndex: "address",
    key: "5",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 6",
    dataIndex: "address",
    key: "6",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 7",
    dataIndex: "address",
    key: "7",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Column 8",
    dataIndex: "address",
    key: "8",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    onCell: () => {
      return {
        onClick: (event) => {
          event.stopPropagation();
        },
      };
    },
    render: () => (
      <Popconfirm title="Sure to delete?">
        <a>Delete</a>
      </Popconfirm>
    ),

    // render: (_, __, index) => (
    //   <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(index)}>
    //     <a onClick={(e) => e.stopPropagation()}>Delete</a>
    //   </Popconfirm>
    // ),
  },
];

const dataSource: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 40,
    address: "London Park",
  },
];

const Demo: React.FC = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const alltoken = useSelector((state: RootState) => state.token);

  console.log(token);
  console.log(alltoken);
  const isModalOpen = useSelector(
    (state: RootState) => state.customModal.isCustomModal
  );

  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(updateCustomModal(false));
  };

  return (
    <>
      <Button type="primary" onClick={() => dispatch(updateCustomModal(true))}>
        Create
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              dispatch(updateCustomModal(true));
            },
          };
        }}
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              dispatch(updateCustomModal(true));
            },
          };
        }}
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              dispatch(updateCustomModal(true));
            },
          };
        }}
      />

      <Modal
        width={1000}
        closeIcon={true}
        title="Create Some Demo"
        centered
        open={isModalOpen}
        onOk={() => dispatch(updateCustomModal(false))}
        onCancel={() => dispatch(updateCustomModal(false))}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary">
            Submit
          </Button>,
        ]}
      >
        <Flex gap={40} justify="space-around">
          <div style={{ width: "100%" }}>
            <div className="text-box">
              <label>Something</label>
              <Input placeholder="Outlined" />
            </div>

            <div className="text-box">
              <label>Something</label>
              <Input placeholder="Outlined" />
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <div className="text-box">
              <label>Something</label>
              <Input placeholder="Outlined" />
            </div>

            <div className="text-box">
              <label>Something</label>
              <Input placeholder="Outlined" />
            </div>
          </div>
        </Flex>
      </Modal>
    </>
  );
};

export default Demo;
