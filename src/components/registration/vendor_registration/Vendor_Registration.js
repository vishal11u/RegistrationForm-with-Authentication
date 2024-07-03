import React, { useEffect } from 'react';
// common components ----------
import SearchDropdown from '../../../common/components/SearchDropDown';
import CommonInputFeild from '../../../common/components/CommonInputfeild';
// hook form section ----------
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';
import axios from 'axios';

function Vendor_Registration() {
  const schema = yup.object().shape({
    name: yup.string().required("First name is required"),
    middlename: yup.string().required("Last name is required"),
    lastname: yup.string().required("Middle name is required"),
    bankUpi: yup.string()
      .required("Bank UPI is required")
      .matches(/^[\w.-]+@[\w.-]+$/, "Bank UPI must be a valid UPI ID"),
    mobileNo: yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10,14}$/, "Mobile number must be between 10 and 14 digits"),
  });

  const defaultValues = {
    name: '',
    lastname: '',
    middlename: '',
    bankUpi: '',
    mobileNo: ''
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const resquest = await axios.post('http://192.168.0.55:8080/savePreRegistration', data)
      console.log(resquest)
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  function handleInputChange() { };

  const handleReset = () => {
    reset()
  }

  useEffect(() => {
    onSubmit();
  }, [])

  return (
    <div className="p-0">
      {/* -------------- registration component ------------------ */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-[25%]">
          <SearchDropdown
            control={control}
            isSearchable={true}
            searchIcon={true}
            name=""
            placeholder={"Search By Vendor Name / Mobile No."}
            dataArray={[
              { id: 1, label: "ABC" },
              { id: 2, label: "XYZ" },
              { id: 3, label: "JDB" }
            ]}
            handleInputChange={handleInputChange}
          />
        </div>
        {/* -------------- */}
        <div className="flex items-center w-full gap-4">
          <div className="w-[25%]">
            <CommonInputFeild
              control={control}
              name="name"
              label={"First Name*"}
              placeholder={"First Name"}
              error={errors?.name}
            />
          </div>
          <div className="w-[25%]">
            <CommonInputFeild
              control={control}
              name="middlename"
              label={"Middle Name*"}
              placeholder={"Middle Name"}
              error={errors?.middlename}
            />
          </div>
          <div className="w-[25%]">
            <CommonInputFeild
              control={control}
              name="lastname"
              label={"Last Name*"}
              placeholder={"Last Name"}
              error={errors?.lastname}
            />
          </div>
        </div>
        {/* ----------------- Payment and mobile no -------------- */}
        <div className="pt-2 w-full">
          <h2 className="text-[18px] font-semibold">Payment Mode :</h2>
          <div className="mt-1 w-full flex items-center space-x-4">
            <div className="w-[25%]">
              <CommonInputFeild
                control={control}
                name="bankUpi"
                label={"Bank UPI ID*"}
                placeholder={"UPI Number"}
                error={errors?.bankUpi}
              />
            </div>
            <div className="w-[25%]">
              <CommonInputFeild
                control={control}
                name="mobileNo"
                label={"Mobile No*"}
                placeholder={"Mobile No"}
                error={errors?.mobileNo}
              />
            </div>
          </div>
        </div>
        <div className=" w-full text-right space-x-3">
          <Button type="button" variant="outlined" color="error" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Vendor_Registration;