import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { useAuthContext } from "context/AuthProvider";
import { useToastContext } from "context/ToastProvider";
import { useAxiosPrivate, useGetItemData } from "customHooks";

import { EmployeeForm } from "components/EmployeeForm";
import { Loader } from "components/Loader";
import { Error } from "components/Error";

const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  surname: yup.string().required("surname is required"),
});

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
};

const UpdateEmployee = () => {
  const { id } = useParams();
  const endpoint = "/api/employees";
  const { auth } = useAuthContext();
  const { displayToast } = useToastContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const { itemData: employee } = useGetItemData(`${endpoint}/${id}`);

  const defaultValues = {
    name: employee?.data?.name || "",
    surname: employee?.data?.surname || "",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue("name", defaultValues.name);
      setValue("surname", defaultValues.surname);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [setValue, defaultValues.name, defaultValues.surname]);

  const updateEmployeeData = async (data) => {
    const newData = { ...data, roles: auth?.roles };

    try {
      await axiosPrivate.put(`${endpoint}/${id}`, newData);

      navigate("/employees");
    } catch (error) {
      displayToast(error.response.statusText, "error");
    }
  };

  return (
    <div style={styles.container}>
      {employee.status === "loading" ? (
        <Loader text="loading employee's data" />
      ) : employee.status === "error" ? (
        <Error text="error occurred" />
      ) : (
        <EmployeeForm
          avatar={<EditOutlinedIcon />}
          heading="update employee"
          control={control}
          errors={errors}
          handleSubmitData={handleSubmit(updateEmployeeData)}
          buttonText="update"
        />
      )}
    </div>
  );
};

export default UpdateEmployee;
