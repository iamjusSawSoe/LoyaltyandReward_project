import * as AdminTypes from "@/api/features/adminUserAccount/adminUser.type";
import { useFetchAdmin } from "@/api/features/adminUserAccount/useFetchAdmin";
import { useFetchPermission } from "@/api/features/adminUserAccount/useFetchPermissionList";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import { adminColumn } from "@/components/table/tableColumns";
import useCreateAdminUserAccount from "@/hooks/adminUserAccount/useCreateAdmin";
import { RootState } from "@/store";
import { updateIsTableRefetch } from "@/store/adminUserSlice";
import {
  Breadcrumb,
  Button,
  Flex,
  Modal,
  Pagination,
  PaginationProps,
  Table,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import AdminUserAccountDetail from "./AdminUserAccountDetail";
import CreateAdminUserAccForm from "./CreateAdminUserAccForm";

const AdminUserAccountsListing = () => {
  const [campaignRouteParams, setCampaignRouteParams] =
    useState<AdminTypes.AdminRouteParams>({
      page: 0,
      pageSize: 10,
    });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedAcc, setSelectedAcc] = useState<
    AdminTypes.AdminData & {
      key: React.Key;
    }
  >({
    username: "",
    name: "",
    enable: false,
    permissions: [],
    group: [],
    key: "",
  });

  const tableRefetch = useSelector(
    (state: RootState) => state.adminUser.isTableRefetch
  );
  const dispatch = useDispatch();

  const fetchAdminQuery = useFetchAdmin(campaignRouteParams);
  const adminUserAccountMutation = useCreateAdminUserAccount({
    refetch: fetchAdminQuery.refetch,
    setIsModalOpen: setIsModalOpen,
  });
  const fetchPermissionListQuery = useFetchPermission();

  const tableDataSource = useMemo(() => {
    if (fetchAdminQuery.data) {
      if (fetchAdminQuery.data.admin.data) {
        const modifiedData = fetchAdminQuery.data.admin.data.map(
          (item, index) => {
            const newItem = {
              ...item,
              key: index + 1,
            };
            return newItem;
          }
        );
        return modifiedData;
      } else {
        return undefined;
      }
    }
  }, [fetchAdminQuery.data]);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setCampaignRouteParams((prevState) => ({
      ...prevState,
      page: pageNumber - 1,
      pageSize: pageSize,
    }));
  };

  const submitCampaignForm = (values: AdminTypes.AdminCreateReqData) => {
    adminUserAccountMutation.handleCreateCampaign(values);
  };

  useEffect(() => {
    if (tableRefetch) fetchAdminQuery.refetch();
    if (fetchAdminQuery.data) dispatch(updateIsTableRefetch(false));
  }, [dispatch, fetchAdminQuery, fetchAdminQuery.data, tableRefetch]);

  return (
    <>
      <Flex align="center" justify="space-between">
        <Breadcrumb items={CustomBreadCrumb()} className="breadcrumb" />
        <Button
          className="icon-btn"
          htmlType="submit"
          onClick={() => setIsModalOpen(true)}
        >
          <TiPlus />
        </Button>
      </Flex>

      <Table
        columns={adminColumn}
        dataSource={tableDataSource}
        scroll={{ x: 1000, y: 390 }}
        pagination={false}
        loading={fetchAdminQuery.isFetching}
        onRow={(record) => {
          return {
            onClick: () => {
              setIsDetailModalOpen(true);
              setSelectedAcc(record);
            },
          };
        }}
      />
      <Pagination
        className="pagination"
        defaultCurrent={
          fetchAdminQuery.data?.admin.currentPage
            ? fetchAdminQuery.data?.admin.currentPage + 1
            : 1
        }
        defaultPageSize={fetchAdminQuery.data?.admin?.pageSize}
        total={fetchAdminQuery.data?.admin?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChange}
      />

      {isModalOpen && (
        <Modal
          width={1000}
          closeIcon={true}
          centered
          open={isModalOpen}
          closable={true}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          title={"Create Admin User Account"}
        >
          <CreateAdminUserAccForm
            onFormSubmit={submitCampaignForm}
            setIsModalOpen={setIsModalOpen}
            submitBtnLoading={adminUserAccountMutation.isLoading}
          />
        </Modal>
      )}

      {isDetailModalOpen && (
        <Modal
          width={600}
          closeIcon={true}
          centered
          open={isDetailModalOpen}
          closable={true}
          footer={null}
          onCancel={() => setIsDetailModalOpen(false)}
          title={`User Account  Permissions Detail for ${selectedAcc.username}`}
        >
          <AdminUserAccountDetail
            dataInfo={selectedAcc}
            setDataInfo={setSelectedAcc}
            permissionList={fetchPermissionListQuery.data?.permissions}
            setIsModalOpen={setIsDetailModalOpen}
          />
        </Modal>
      )}
    </>
  );
};

export default AdminUserAccountsListing;
