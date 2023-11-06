import { useForm, type SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { WarningAlert } from "../alerts/Alerts";
import { useEffect, useState } from "react";
import { AddOperator, ChevronRight, ChevronLeft } from "../Icon/Icons";
import { Operator } from "../Operators/Operator";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

type User = {
  email: string;
  displayName: string;
  uid: string;
  // other properties if needed
};

type UserData = {
  users: User[];
  pageToken: string;
};

const HandleOperators = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertPsw, setShowAlertPsw] = useState(false);
  const [fetchedData, setFetchedData] = useState<UserData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageToken, setPageToken] = useState<string[]>([""]);

  useEffect(() => {
    if (errors.email) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    if (errors.password) {
      setShowAlertPsw(true);
    } else {
      setShowAlertPsw(false);
    }
  }, [errors.email, errors.password]);

  const fetchData = async (): Promise<any> => {
    try {
      let token = "";
      if (fetchedData?.pageToken) {
        token = fetchedData.pageToken;
      }
      const response = await fetch("http://localhost:4321/api/operators/list", {
        headers: {
          nextPageToken: token ? String(token) : "",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const pagesArray = [...pageToken, data.pageToken];
      await setPageToken(pagesArray);
      setFetchedData(data);
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };

  const fetchPrevData = async (token: string): Promise<any> => {
    try {
      const response = await fetch("http://localhost:4321/api/operators/list", {
        headers: {
          nextPageToken: token ? String(token) : "",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFetchedData(data);
    } catch (error) {
      console.error("There was a problem fetching data:", error);
    }
  };

  useEffect(() => {
    if (!fetchedData) {
      fetchData();
    }
  }, []);

  const fetchNextPage = async () => {
    const nextPageToken = fetchedData?.pageToken;
    if (nextPageToken) {
      await fetchData();
      setCurrentPage(currentPage + 1);
    }
    console.log("page token : ", pageToken);
  };

  const fetchPreviousPage = async () => {
    const prevPageToken = pageToken.slice(0, -1);
    if (prevPageToken) {
      await fetchPrevData(prevPageToken[currentPage - 1]);
      await setPageToken(prevPageToken);
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-center flex-col">
      {showAlert && (
        <WarningAlert text="Email is required" showAlert={setShowAlert} />
      )}
      {showAlertPsw && (
        <WarningAlert text="Password is required" showAlert={setShowAlertPsw} />
      )}
      <div className=" min-h-screen w-full h-full gap-2 grid px-4 py-10 overflow-scroll container">
        <form
          className="flex flex-col grow justify-center items-center w-full"
          action="/api/auth/register"
          method="post"
        >
          <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold text-center py-2 text-slate-500">
              Create Access to an new Operator
            </h2>
            <input
              type="text"
              id="name"
              placeholder="Identifier Operator / Name "
              {...register("name")}
              className="p-2 rounded-md w-full shadow-md border"
            />
            <input
              type="email"
              id="email"
              placeholder="Operatos Email..."
              {...register("email", { required: true })}
              className="p-2 rounded-md w-full shadow-md border"
            />
            <input
              type="password"
              id="password"
              placeholder="Password..."
              {...register("password", { required: true })}
              className="p-2 rounded-md w-full shadow-md border"
            />
            <button
              type="submit"
              className="bg-blue-500 flex flex-row gap-2 items-center justify-center py-4 px-2 w-full rounded-lg group hover:bg-blue-600 text-white shadow-md"
            >
              <AddOperator />
              <p>Create Operator</p>
            </button>
            <DevTool control={control} />
          </div>
        </form>
        <div className="flex flex-col gap-4 w-full bg-white p-4 rounded-lg justify-center h-max">
          <h2 className="text-xl font-bold text-center py-2 text-slate-500">
            List of Operators
          </h2>
          <div >
            {fetchedData && fetchedData.users ? (
              fetchedData.users.map((user: User) => (
                <Operator email={user.email} name={user.displayName} key={user.uid} />
              ))
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed w-full"
                disabled
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading Operators...
              </button>
            )}
          </div>
          <div className="bg-white p-2">
            {fetchedData?.pageToken ? (
              <div className="w-full flex flex-row-reverse items-center">
                <button
                  onClick={fetchNextPage}
                  className="bg-blue-500 hover:bg-blue-700 rounded-full p-4"
                >
                  <ChevronRight color="white" />
                </button>
                <p className="grow text-center">{currentPage}</p>
                {currentPage > 0 ? (
                  <button
                    onClick={fetchPreviousPage}
                    className="bg-blue-500 hover:bg-blue-700 rounded-full p-4"
                  >
                    <ChevronLeft color="white" />
                  </button>
                ) : (
                  <button disabled className="bg-blue-400 rounded-full p-4">
                    <ChevronLeft color="white" />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-row-reverse items-center">
                <button disabled className="bg-blue-400 rounded-full p-4">
                  <ChevronRight color="white" />
                </button>
                <p className="grow text-center">{currentPage}</p>
                {currentPage > 0 ? (
                  <button
                    onClick={fetchPreviousPage}
                    className="bg-blue-500 hover:bg-blue-700 rounded-full p-4"
                  >
                    <ChevronLeft color="white" />
                  </button>
                ) : (
                  <button disabled className="bg-blue-400 rounded-full p-4">
                    <ChevronLeft color="white" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { HandleOperators };
