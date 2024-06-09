import { useState, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { encryptSymmetric } from "@/middlewares/encrypt";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { URLS } from "@/lib/urls";
import { dummyData } from "./dummyData";

const salt = genSaltSync(10);

const minimumLength = 12;
export default function Admin() {
  const [email, setemail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [message, setMessage] = useState<string>("");
  const [isMainAdmin, setIsMainAdmin] = useState<boolean>(false);

  const userEmail = Cookies.get("c&m-userEmail");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password.length < 12) {
      toast.error("Password must be at least 12 characters long");
      return;
    }
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      // Sending a POST request to the server with user registration details
      const { ciphertext, iv } = await encryptSymmetric(
        hashSync(password, salt),
        String(process.env.NEXT_PUBLIC_CRYPTOKEY),
      );
      const uploadUserDetails = new Promise(async (resolve, reject) => {
        const uploadRequest = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}${URLS.userSignUp}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                passwordNew: ciphertext,
                iv: iv,
                email: email,
                role: role,
              },
            }),
          },
        );

        const response = await uploadRequest.json();

        //console.log(response);
        if (response.success) {
          setemail("");
          setPassword("");
          setRole("user");
          setMessage("");

          resolve(response);
        } else {
          reject(response);
        }
      });

      // Displaying toast notifications based on form submission result
      await toast.promise(uploadUserDetails, {
        loading: "Creating Account...",
        success: <b>Account successfully created.</b>,
        error: <b>An error occured while creating account.</b>,
      });
    } catch (error) {
      //console.log(error);
    } finally {
    }
  };

  const [data, setData] = useState(dummyData);
  const addUser = () => {
    let newPerson: {
      id: number;
      email: string;
      password: string;
      role: string;
    } = {
      id: Number(new Date().getMilliseconds()),
      email,
      password,
      role,
    };
    setData((prevData: any) => {
      return [...prevData, newPerson];
    });
  };
  const removeUser = (id: number) => {
    let filter = data.filter((item) => item.id !== id);
    setData(filter);
  };

  // const [roleAssigned, changeRoleAssigned] = useState<string>('');

  // const changeRole = (e: any, id: number) => {
  //   const {name, value} = e.target;
  //   setRole(value);
  // };

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/auth/user/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("c&m-token")}`,
          },
        },
      );

      if (request.status === 401) {
        Cookies.remove("c&m-token");
        Cookies.remove("c&m-userEmail");
        Cookies.remove("c&m-isLoggedIn");
      }
      const response = await request.json();
      //console.log(response.data);
      if (response.success) {
        setIsMainAdmin(response.data.isMainAdmin);
      } else {
        router.push("/dashboard");
      }
    })();
  }, []);

  return (
    <>
      {isMainAdmin && (
        <>
          <div
            style={{ flexDirection: "column", marginLeft: "45px" }}
            className="m flex  w-[auto] justify-center"
          >
            <div
              style={{ width: "400px" }}
              className="w-[400px] w-full rounded-lg bg-white p-8 shadow-lg"
            >
              <h1 className="mb-4 text-center text-2xl font-bold">
                Main Admin Page
              </h1>
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="General Manager">General Manager</option>
                    <option value="General Secretary">General Secretary</option>
                  </select>
                </div>
                <button
                  style={{ width: "150px", alignItems: "center" }}
                  type="submit"
                  onClick={addUser}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Create User
                </button>
              </form>
              {message && (
                <p className="mt-4 text-center text-red-500">{message}</p>
              )}
            </div>
            {true && (
              <div style={{ marginTop: "30px", width: "75vw" }}>
                <table style={{ width: "inherit" }} className="shadow-sm">
                  <thead className="bg-gray-50">
                    <tr
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        padding: "10px",
                      }}
                    >
                      <td>Role</td>
                      <td>Email</td>
                      <td>Password</td>
                      <td>Action</td>
                      <td>Change Role</td>
                    </tr>
                  </thead>
                  <tbody style={{ display: "grid" }}>
                    {data.map((item) => {
                      const { id, age, role, email, password } = item;
                      return (
                        <tr
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            padding: "10px",
                          }}
                          key={id}
                        >
                          <td>{role}</td>
                          <td>{email}</td>
                          <td>{password}</td>
                          <button
                            onClick={() => {
                              removeUser(id);
                            }}
                            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Remove
                          </button>
                          {/* <select
               onChange={(e)=>changeRole(e, id)}
               value={role} className='className="py-2 ml-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"'>
                <option>{role}</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="finance">Finance Manager</option>
                <option value="manager">General Manager</option>
                <option value="secretary">General Secretary</option>
              </select> */}
                          {/* <button onClick={()=>{}} className="py-2 ml-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Change Role</button> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
