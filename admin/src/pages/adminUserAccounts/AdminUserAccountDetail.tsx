import { AdminData } from "@/api/features/adminUserAccount/adminUser.type";
import { usePostPermission } from "@/api/features/adminUserAccount/usePostPermission";
import { updateIsTableRefetch } from "@/store/adminUserSlice";
import { setToast } from "@/store/toastSlice";
import { Button, Checkbox, CheckboxProps, Divider, Flex, Spin } from "antd";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  dataInfo: AdminData & {
    key: React.Key;
  };
  permissionList?: [{ name: string }];
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
  setPermissionList?: Dispatch<React.SetStateAction<string[]>>;
  setDataInfo: Dispatch<React.SetStateAction<AdminData & { key: React.Key }>>;
};

const AdminUserAccountDetail = (props: Props) => {
  const dispatch = useDispatch();
  const [checkedList, setCheckedList] = useState<string[]>(
    props.dataInfo.permissions
  );
  const [permissionList, setPermissionList] = useState<string[]>([]);

  const indeterminate =
    checkedList.length > 0 && checkedList.length < permissionList.length;
  const checkAll = permissionList.length === checkedList.length;

  const createPermissionMutation = usePostPermission();

  // * fns
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? permissionList : []);
  };

  const handleUpdate = () => {
    createPermissionMutation.mutateAsync({
      username: props.dataInfo.username,
      permissions: checkedList,
    });
  };

  useEffect(() => {
    if (createPermissionMutation.data) {
      props.setDataInfo((prevState) => ({
        ...prevState,
        permissions: checkedList,
      }));
      dispatch(
        setToast({
          toastContent: "Permission updated successfully!",
          toastType: "success",
        })
      );
      dispatch(updateIsTableRefetch(true));
    }
  }, [checkedList, createPermissionMutation.data, dispatch, props]);

  useEffect(() => {
    if (props.permissionList) {
      const permissionListArr = props.permissionList.map(
        (permission) => permission.name
      );
      setPermissionList(permissionListArr);
    }
  }, [props.permissionList]);

  return (
    <div style={{ margin: "30px 20px 10px" }}>
      <Spin
        tip="Loading"
        spinning={createPermissionMutation.isPending}
        className="loading"
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Divider style={{ margin: "13px 0" }} />
        <Checkbox.Group
          style={{ flexDirection: "column-reverse", gap: 15 }}
          options={permissionList}
          value={checkedList}
          onChange={onChange}
        />
      </Spin>
      <Flex gap={10} justify="end" style={{ marginTop: 20, height: 30 }}>
        <Button type="default" onClick={() => props.setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleUpdate}
          loading={createPermissionMutation.isPending}
          disabled={props.dataInfo.permissions === checkedList}
        >
          Update
        </Button>
      </Flex>
    </div>
  );
};

export default AdminUserAccountDetail;
