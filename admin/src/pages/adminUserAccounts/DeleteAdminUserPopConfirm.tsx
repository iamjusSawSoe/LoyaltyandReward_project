import { AdminColumnType } from "@/api/features/adminUserAccount/adminUser.type";
import { useDeleteAdmin } from "@/api/features/adminUserAccount/useDeleteAdmin";
import { updateIsTableRefetch } from "@/store/adminUserSlice";
import { setToast } from "@/store/toastSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  record: AdminColumnType & { key: React.Key };
  index: number;
};

const DeleteAdminUserPopConfirm = (props: Props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const deleteAdminUserMutation = useDeleteAdmin();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    if (selectedItemIndex !== null) {
      deleteAdminUserMutation.mutateAsync(props.record.username);
    }
  };

  useEffect(() => {
    if (deleteAdminUserMutation.data) {
      setSelectedItemIndex(null);
      dispatch(updateIsTableRefetch(true));
      dispatch(
        setToast({
          toastContent: "Admin User deleted successfully!",
          toastType: "success",
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAdminUserMutation.data]);

  return (
    <Popconfirm
      title="Sure to delete?"
      onConfirm={handleConfirm}
      okButtonProps={{ loading: deleteAdminUserMutation.isPending }}
      open={selectedItemIndex === props.index}
      onCancel={() => setSelectedItemIndex(null)}
    >
      <Button
        icon={<DeleteOutlined />}
        onClick={() => setSelectedItemIndex(props.index)}
      >
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteAdminUserPopConfirm;
