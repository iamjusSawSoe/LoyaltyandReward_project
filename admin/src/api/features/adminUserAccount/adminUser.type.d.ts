import { Pagination, RouteParams } from "@/types/common.types";

// * for fetch admin user
export type AdminRouteParams = {
  username?: string;
  email?: string;
  point_collection?: string;
} & RouteParams;

export type AdminResponse = {
  admin: {
    data: AdminData[];
  } & Pagination;
};

export type AdminData = {
  username: string;
  name: string;
  permissions: string[];
  group: string[];
  enable: boolean;
};

export type AdminColumnType = {
  username: string;
  name: string;
  enable: boolean;
};

// * for post admin user
export type AdminCreateReqData = {
  username: string;
  password: string;
  confirm_password: string;
  name: string;
};

export type AdminCreateResData = {
  admin: AdminCreateReqData;
};

// * for delete admin user
export type AdminDeleteResponse = {};

// * for permission list

export type PermissionList = {
  permissions: [{ name: string }];
};

export type GetUserPermissionResponse = {
  admin: {
    username: string;
    permissions: string[];
  };
};

export type PostPermissionListRequest = {
  username: string;
  permissions: string[];
};

export type PostPermissionListResponse = {
  admin: {
    permissions: string[];
  };
};
