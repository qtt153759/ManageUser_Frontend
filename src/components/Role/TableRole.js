import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { fetchRoles, deleteRoles } from "../../Service/roleService";
const TableRole = (props, ref) => {
    const [listRoles, setListRoles] = useState([]);
    useEffect(() => {
        getAllRole();
    }, []);
    useImperativeHandle(ref, () => ({
        // ko dung arrow
        fetchListRole() {
            getAllRole();
        },
    }));
    const getAllRole = async () => {
        let res = await fetchRoles();
        if (res && res.EC === 0) {
            setListRoles(res.DT);
        }
    };
    const handleDeleteRole = async (id) => {
        console.log(id);
        let res = await deleteRoles(id);
        if (res && res.EC === 0) {
            await getAllRole();
        }
    };
    return (
        <div className="container">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col-1">#Id</th>
                        <th scope="col-4">Url</th>
                        <th scope="col-5">Description</th>
                        <th scope="col-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listRoles && listRoles.length > 0 ? (
                        <>
                            {listRoles.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td className="">
                                            <button
                                                className="btn btn-warning mx-2"
                                                // onClick={() => handleEditRole(item)}
                                            >
                                                <i className="fa fa-pencil pe-2 fs-6" />
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDeleteRole(item.id)}
                                            >
                                                <i className="fa fa-trash-o pe-2 fs-6" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    ) : (
                        <>
                            <tr>
                                <td colSpan={6} className="text-center text-danger">
                                    Not found users
                                </td>
                            </tr>
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default forwardRef(TableRole);
