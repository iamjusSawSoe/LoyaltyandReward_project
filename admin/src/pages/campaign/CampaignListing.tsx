import * as CampaignType from "@/api/features/campaign/campaign.types";
import { useGetCampaign } from "@/api/features/campaign/useGetCampaign";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import { campaignColumn } from "@/components/table/tableColumns";
import useCreateCampaign from "@/hooks/campaign/useCreateCampaign";
import {
  Breadcrumb,
  Button,
  Flex,
  Modal,
  Pagination,
  PaginationProps,
  Table,
} from "antd";
import { useMemo, useState } from "react";
import { TiPlus } from "react-icons/ti";
import CreateCampaignForm from "./CreateCampaignForm";

const CampaignListing = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [campaignRouteParams, setCampaignRouteParams] =
    useState<CampaignType.CampaignReqData>({
      page: 0,
      pageSize: 10,
    });

  const fetchCampaignQuery = useGetCampaign(campaignRouteParams);
  const campaignMutation = useCreateCampaign({
    refetch: fetchCampaignQuery.refetch,
    setIsModalOpen: setIsModalOpen,
  });

  const tableDataSource = useMemo(() => {
    if (fetchCampaignQuery.data) {
      if (fetchCampaignQuery.data.campaigns.data) {
        const modifiedData = fetchCampaignQuery.data.campaigns.data.map(
          (item, index) => {
            const newItem = {
              ...item,
              ...item.valid,
              ...item.format,
              key: index + 1,
            };
            delete newItem.valid;
            delete newItem.format;
            return newItem;
          }
        );
        return modifiedData;
      } else {
        return undefined;
      }
    }
  }, [fetchCampaignQuery.data]);

  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    setCampaignRouteParams((prevState) => ({
      ...prevState,
      page: pageNumber - 1,
      pageSize: pageSize,
    }));
  };

  const submitCampaignForm = (values: CampaignType.CampaignFieldType) => {
    campaignMutation.handleCreateCampaign(values);
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <Breadcrumb items={CustomBreadCrumb()} className="breadcrumb" />

        <Button
          className="icon-btn"
          onClick={() => setIsModalOpen(true)}
          htmlType="submit"
        >
          <TiPlus />
        </Button>

        {isModalOpen && (
          <Modal
            width={1000}
            closeIcon={true}
            centered
            open={isModalOpen}
            closable={true}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            title={"Create Campaign"}
          >
            <CreateCampaignForm
              onFormSubmit={submitCampaignForm}
              setIsModalOpen={setIsModalOpen}
              submitBtnLoading={campaignMutation.isLoading}
            />
          </Modal>
        )}
      </Flex>

      <Table
        columns={campaignColumn}
        dataSource={tableDataSource}
        scroll={{ x: 2800, y: 390 }}
        pagination={false}
        loading={fetchCampaignQuery.isFetching}

        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       setCampaignRouteParams((prevParams) => ({
        //         ...prevParams,
        //       }));
        //       setIsModalOpen(true);
        //     },
        //   };
        // }}
      />
      <Pagination
        className="pagination"
        defaultCurrent={
          fetchCampaignQuery.data?.campaigns.currentPage
            ? fetchCampaignQuery.data?.campaigns.currentPage + 1
            : 1
        }
        defaultPageSize={fetchCampaignQuery.data?.campaigns?.pageSize}
        total={fetchCampaignQuery.data?.campaigns?.totalElements}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        responsive={true}
        onChange={onChange}
      />
    </>
  );
};

export default CampaignListing;
