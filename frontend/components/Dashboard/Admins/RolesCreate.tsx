import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

type Role = {
  role: string;
  rolesAssignable: string[];
};

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([
    { role: "", rolesAssignable: [""] },
  ]);
  const [uploadedRoles, setUploadedRoles] = useState<Role[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploaded, setUploaded] = useState<Boolean>(false);

  const handleRoleNameChange = (index: number, value: string) => {
    const newRoles = [...roles];
    newRoles[index].role = value;
    setRoles(newRoles);
  };

  const handleSubRoleChange = (
    roleIndex: number,
    subRoleIndex: number,
    value: string,
  ) => {
    const newRoles = [...roles];
    newRoles[roleIndex].rolesAssignable[subRoleIndex] = value;
    setRoles(newRoles);
  };

  const addSubRole = (roleIndex: number) => {
    const newRoles = [...roles];
    newRoles[roleIndex].rolesAssignable.push("");
    setRoles(newRoles);
  };

  const addNewRole = () => {
    setRoles([...roles, { role: "", rolesAssignable: [""] }]);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setRoles(
      uploadedRoles.map((role, i) => (i === index ? { ...role } : role)),
    );
  };

  const handleSaveEdit = () => {
    setEditingIndex(null);
    setUploadedRoles(roles);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setRoles(uploadedRoles);
  };

  const handleUpload = async () => {
    try {
      setUploaded(false);
      toast.loading("Uploading Roles");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/upload-roles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roles, email: Cookies.get("c&m-userEmail") }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setUploaded(true);
        setUploadedRoles([...uploadedRoles, ...roles]);
        setRoles([{ role: "", rolesAssignable: [""] }]);
        toast.dismiss();
        toast.success("Roles successfully uploaded");
      } else {
        toast.dismiss();
        toast.error(data.message || data.error || data.data);
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("An error occurred!");
    }
  };

  const getRoles = async () => {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/roles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Cookies.get("c&m-userEmail") }),
        },
      );

      const data = await request.json();
      if (data.success) {
        setUploadedRoles(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (role: string) => {
    try {
      toast.loading("Deleting Role");
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/delete-role`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: Cookies.get("c&m-userEmail"),
            roleTitle: role,
          }),
        },
      );

      const data = await request.json();
      if (data.success) {
        toast.dismiss();
        toast.success("Role deleted");
        setUploadedRoles(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (uploaded) getRoles;
  }, [uploaded]);
  useEffect(() => {
    getRoles();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Create Roles</h1>
      {roles.map((role, roleIndex) => (
        <div key={roleIndex} className="mb-6 rounded-lg border p-4 shadow-md">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              type="text"
              value={role.role}
              onChange={(e) => handleRoleNameChange(roleIndex, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {role.rolesAssignable.map((subRole, subRoleIndex) => (
            <div key={subRoleIndex} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Sub Role
              </label>
              <input
                type="text"
                value={subRole}
                onChange={(e) =>
                  handleSubRoleChange(roleIndex, subRoleIndex, e.target.value)
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addSubRole(roleIndex)}
            className="mt-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Sub Role
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addNewRole}
        className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Add More Role
      </button>
      <button
        type="button"
        onClick={handleUpload}
        className="ml-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Upload Roles
      </button>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Uploaded Roles</h2>
        {uploadedRoles?.map((role, index) => (
          <div key={index} className="mb-4 rounded-lg border p-4 shadow-md">
            <div>
              <span className="font-bold">Role Name:</span> {role.role}
            </div>
            <div className="mt-2">
              <span className="font-bold">Sub Roles:</span>
              <ul className="ml-6 list-disc">
                {role?.rolesAssignable?.map((subRole, subIndex) => (
                  <li key={subIndex}>{subRole}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              {editingIndex !== index ? (
                <>
                  <button
                    onClick={() => handleEdit(index)}
                    className="mr-4 inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(role.role)}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="mr-4 inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm
                    hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesPage;
