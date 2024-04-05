import { AdminData } from "@/api/features/adminUserAccount/adminUser.type";
import { FetchCampaignData } from "@/api/features/campaign/campaign.types";
import * as CustomerTypes from "@/api/features/customer/interface";
import { PointTransactionData } from "@/api/features/pointTransaction/IPointTransaction";
import DeleteAdminUserPopConfirm from "@/pages/adminUserAccounts/DeleteAdminUserPopConfirm";
import { formatDate, formatDateHour } from "@/utils/formatDate";
import { TableColumnsType } from "antd";

export const customerPointsTransitionColumns: TableColumnsType<
  CustomerTypes.CustomerPointTransactionData & { key: React.Key }
> = [
  {
    title: "No.",
    dataIndex: "key",
    rowScope: "row",
    key: "1",
    width: "5%",
    align: "center",
  },
  {
    title: "Item Name",
    dataIndex: "item_name",
    key: "2",
  },
  {
    title: "Points Quantity",
    dataIndex: "point_qty",
    key: "3",
    render: (text) => <>{text === null ? "0" : text}</>,
  },

  {
    title: "Transaction Type",
    dataIndex: "transaction_type",
    key: "4",
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction_date",
    key: "5",
    render: (text) => <>{formatDate(text)}</>,
  },
];

export const customersColumn: TableColumnsType<
  CustomerTypes.CustomerData & { key: React.Key }
> = [
  {
    title: "No.",
    dataIndex: "key",
    rowScope: "row",
    key: "1",
    width: "5%",
    align: "center",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "2",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Point Balance",
    dataIndex: "point_qty",
    key: "3",
    render: (text) => <>{text === null ? "0" : text}</>,
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "4",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  // {
  //   title: "Active",
  //   key: "enable",
  //   fixed: "right",
  //   width: 130,
  //   onCell: () => {
  //     return {
  //       onClick: (event) => {
  //         event.stopPropagation();
  //       },
  //     };
  //   },
  //   render: (_, record) => (
  //     <EnableDisableSwitch<CustomerTypes.CustomerData> record={record} />
  //   ),
  // },
];

export const campaignColumn: TableColumnsType<
  FetchCampaignData & { key: React.Key }
> = [
  {
    title: "No.",
    dataIndex: "key",
    rowScope: "row",
    key: "1",
    width: "5%",
    align: "center",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "2",
    ellipsis: true,
  },
  {
    title: "Points Balance",
    dataIndex: "point_qty",
    key: "3",
    render: (text) => <>{text === null ? "0" : text}</>,
  },
  {
    title: "Total Coupon",
    dataIndex: "total_coupon",
    key: "4",
  },
  {
    title: "Created Coupon",
    dataIndex: "created_coupon",
    key: "5",
  },
  {
    title: "Claimed Coupon",
    dataIndex: "claimed_coupon",
    key: "6",
  },
  {
    title: "Unclaimed Coupon",
    dataIndex: "unclaimed_coupon",
    key: "7",
  },
  {
    title: "Creation Status",
    dataIndex: "creation_status",
    key: "8",
  },
  {
    title: "Valid From Date",
    dataIndex: "from",
    render: (text) => <>{text ? formatDateHour(text) : "-"}</>,
    key: "9",
    responsive: ["sm"],
  },
  {
    title: "Valid To Date",
    dataIndex: "to",
    render: (text) => <>{text ? formatDateHour(text) : "-"}</>,
    key: "10",
    responsive: ["sm"],
  },
  {
    title: "Date Range Limit",
    dataIndex: "is_date_range_limit",
    render: (text) => <>{text ? "True" : "False"}</>,
    key: "8",
    responsive: ["sm"],
  },
  {
    title: "Prefix",
    dataIndex: "prefix",
    render: (text) => <>{text ? text : "-"}</>,
    key: "8",
    responsive: ["sm"],
  },
  {
    title: "Postfix",
    dataIndex: "postfix",
    key: "8",
    render: (text) => <>{text ? text : "-"}</>,
    responsive: ["sm"],
  },
  {
    title: "Character Only",
    dataIndex: "char_only",
    render: (text) => <>{text ? "True" : "False"}</>,
    key: "8",
    responsive: ["sm"],
  },
  {
    title: "Number Only",
    dataIndex: "number_only",
    render: (text) => <>{text ? "True" : "False"}</>,
    key: "8",
  },
  {
    title: "Mix Character & Number",
    dataIndex: "mix_char_num",
    render: (text) => <>{text ? "True" : "False"}</>,
    key: "8",
  },
  {
    title: "Length",
    dataIndex: "length",
    render: (text) => <>{text ? text : "-"}</>,
    key: "8",
  },
];

export const pointTransactionColumns: TableColumnsType<
  PointTransactionData & { key: React.Key }
> = [
  {
    title: "No.",
    dataIndex: "key",
    rowScope: "row",
    key: "1",
    width: "5%",
    align: "center",
  },
  {
    title: "Item Name",
    dataIndex: "item_name",
    key: "2",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Point Code",
    dataIndex: "point_code",
    key: "3",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Point Quantity",
    dataIndex: "point_qty",
    render: (text) => <>{text === null ? "0" : text}</>,
    key: "4",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Merchant Name",
    dataIndex: "merchant_username",
    key: "5",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Customer Phone Number",
    dataIndex: "customer_phone_number",
    key: "6",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Transaction Date",
    dataIndex: "transaction_date",
    render: (text) => <>{text ? formatDate(text) : "-"}</>,
    key: "7",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Transaction Type",
    dataIndex: "transaction_type",
    key: "8",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Channel",
    dataIndex: "channel",
    key: "9",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Initiator Type",
    dataIndex: "initiator_type",
    key: "10",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
];

export const adminColumn: TableColumnsType<AdminData & { key: React.Key }> = [
  {
    title: "No.",
    dataIndex: "key",
    rowScope: "row",
    key: "1",
    width: "5%",
    align: "center",
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Admin Name",
    dataIndex: "username",
    key: "2",
    ellipsis: true,
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "3",
    render: (text) => <>{text === null ? "0" : text}</>,
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Active",
    dataIndex: "enable",
    key: "4",
    render: (text) => <>{text ? "True" : "False"}</>,
    onCell: () => {
      return {
        className: "pointer-cursor ",
      };
    },
  },
  {
    title: "Action",
    dataIndex: "operation",
    render: (_, record: AdminData & { key: React.Key }, index) => (
      <DeleteAdminUserPopConfirm record={record} index={index} />
    ),
    onCell: () => {
      return {
        onClick: (event) => {
          event.stopPropagation();
        },
      };
    },
  },
];
