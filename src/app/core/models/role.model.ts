
export interface Role {
    id: number;
    name: string;
}

export interface RolePermission extends Role {
    permissions: Permission[];
}

export interface Permission {
    id: number;
    name: string;
}

export const emptyRole: Role = {
    id: 0,
    name: '',
}

export const emptyRolePermission = {
    id: 0,
    name: '',
    permission: [],
}

export interface RoleId {
    id: number;
}