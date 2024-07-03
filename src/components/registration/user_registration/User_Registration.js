import React, { useEffect, useState } from 'react';
// common components ----------
import SearchDropdown from '../../../common/components/SearchDropDown';
import CommonInputFeild from '../../../common/components/CommonInputfeild';
import DropDownFeild from '../../../common/components/CommonDropDown';
// hook form section ----------
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';
import axios from 'axios';

function User_Registration() {
    const schema = yup.object().shape({
        prefix: yup.object().shape({
            value: yup.string(),
            label: yup.string()
        }).required("Prefix is required"),
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        middleName: yup.string().required("Middle name is required"),
        address: yup.string().required("Address is required"),
        bankUpi: yup.string()
            .required("Bank UPI is required")
            .matches(/^[\w.-]+@[\w.-]+$/, "Bank UPI must be a valid UPI ID"),
        mobileNo: yup.string()
            .required("Mobile number is required")
            .matches(/^\d{10,14}$/, "Mobile number must be between 10 and 14 digits"),
    });

    const defaultValues = {
        prefix: null,
        firstName: '',
        lastName: '',
        middleName: '',
        address: '',
        bankUpi: '',
        gender: '',
        mobileNo: '',
        city: null,
        state: null
    };

    const { control, handleSubmit, formState: { errors }, setValue, register, watch, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const [genders, setGenders] = useState([
        { id: 1, label: "Male", value: "male" },
        { id: 2, label: "Female", value: "female" },
        { id: 3, label: "Other", value: "other" }
    ]);

    const prefixData = watch("prefix");

    const onSubmit = async (data) => {
        const payload = {
            "prefix": [data.prefix],
            "firstName": data.firstName,
            "lastName": data.lastName,
            "middleName": data.middleName,
            "address": data.address,
            "bankUpi": data.bankUpi,
            "gender": data.gender,
            "mobileNo": data.mobileNo,
            "city": [data.city],
            "state": [data.state]
        }
        // console.log("xcfvgbh", payload);
        try {
            const resquest = await axios.post('http://192.168.0.55:8080/UserData', payload)
            console.log(resquest)
        } catch (error) {
            console.log(error);
        }
        reset();
    };

    const handleReset = () => {
        reset()
    }

    function handleInputChange() { };

    useEffect(() => {
        if (prefixData) {
            if (prefixData.label === "Mr") {
                setValue("gender", "male");
            } else if (prefixData.label === "Miss" || prefixData.label === "Mrs") {
                setValue("gender", "female");
            } else {
                setValue("gender", "other");
            }
        }
    }, [prefixData, setValue]);

    return (
        <div className="p-0">
            {/* -------------- registration component ------------------ */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="w-[32.8%]">
                    <SearchDropdown
                        control={control}
                        isSearchable={true}
                        searchIcon={true}
                        name=""
                        placeholder={"Search By Patient Name / Mobile No."}
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
                    <div className=" w-1/3">
                        <DropDownFeild
                            control={control}
                            error={errors?.prefix}
                            name="prefix"
                            label="Prefix*"
                            dataArray={[
                                { id: 1, label: "Mr", value: "Mr" },
                                { id: 2, label: "Miss", value: "Miss" },
                                { id: 3, label: "Mrs", value: "Mrs" },
                                { id: 4, label: "Other", value: "Other" }
                            ]}
                            isSearchable={false}
                            placeholder="Prefix*"
                            isClearable={false}
                            inputRef={register("prefix")}
                        />
                    </div>
                    <CommonInputFeild
                        control={control}
                        name="firstName"
                        label={"First Name*"}
                        placeholder={"First Name"}
                        error={errors?.firstName}
                    />
                    <CommonInputFeild
                        control={control}
                        name="middleName"
                        label={"Middle Name*"}
                        placeholder={"Middle Name"}
                        error={errors?.middleName}
                    />
                    <CommonInputFeild
                        control={control}
                        name="lastName"
                        label={"Last Name*"}
                        placeholder={"Last Name"}
                        error={errors?.lastName}
                    />
                    <div className=" flex items-center space-x-1 w-[70%]">
                        <label className="text-[16px] font-medium">Gender :</label>
                        <div className="flex gap-0 items-center">
                            {genders.length > 0
                                ? genders.map((gender, genderIndex) => (
                                    <button
                                        key={gender.id}
                                        type="button"
                                        onClick={() => setValue("gender", gender.value)}
                                        className={`border border-gray-300 w-10 h-8 ${genderIndex === 0 ? 'rounded-l' : ''} ${watch("gender") === gender.value ? 'bg-[#3B3C36] text-white' : ''} ${genderIndex === genders.length - 1 ? 'rounded-r' : ''}`}
                                    >
                                        {gender.label.charAt(0)}
                                    </button>
                                ))
                                : ""}
                        </div>
                    </div>
                </div>
                {/*--------- address details -------------- */}
                <div>
                    <h2 className="text-[18px] font-semibold">Address Details :</h2>
                    <div className="w-full flex items-center gap-4 mt-2">
                        <div className="w-[32.7%]">
                            <CommonInputFeild
                                control={control}
                                name="address"
                                label={"Address*"}
                                placeholder={"Address"}
                                error={errors?.address}
                            />
                        </div>
                        <div className='w-[23.6%]'>
                            <DropDownFeild
                                control={control}
                                name="state"
                                label={"State"}
                                placeholder={"State"}
                                isSearchable={true}
                                error={errors?.state}
                                dataArray={[{ id: 1, label: "State1" }, { id: 2, label: "State2" }]}
                            />
                        </div>
                        <div className='w-[23.6%]'>
                            <DropDownFeild
                                control={control}
                                isClearable={true}
                                name="city"
                                label={"City"}
                                placeholder={"City"}
                                isSearchable={true}
                                error={errors?.city}
                                dataArray={[{ id: 1, label: "City1" }, { id: 2, label: "City2" }]}
                            />
                        </div>
                    </div>
                </div>
                {/* ----------------- Payment and mobile no -------------- */}
                <div className="pt-2 w-full">
                    <h2 className="text-[18px] font-semibold">Payment Mode :</h2>
                    <div className="mt-2 w-full flex items-center space-x-4">
                        <div className="w-[32.7%]">
                            <CommonInputFeild
                                control={control}
                                name="bankUpi"
                                label={"Bank UPI*"}
                                placeholder={"UPI Number"}
                                error={errors?.bankUpi}
                            />
                        </div>
                        <div className="w-[23.6%]">
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

export default User_Registration;