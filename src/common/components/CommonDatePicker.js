import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FormControl, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
function DatePickerField({
  name,
  label,
  control,
  defaultValue,
  disabled,
  disablePast,
  disableFuture,
  sx,
  variant,
  inputProps,
  type,
  inputRef,
  inputFormat,
  error,
  dontCapitalize,
  color,
  onChange,
  minDate,
  value,
  onError,

  ...rest
}) {
  return (
    <div >
      <FormControl className="w-full" sx={sx}>
        <Controller
          sx={{ width: "100%" }}
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label={label}
                value={value}
                minDate={minDate}
                onChange={onChange}
                format={inputFormat}
                onBlur={onBlur}
                disabled={disabled}
                disablePast={disablePast}
                disableFuture={disableFuture}
                sx={{
                  "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                    height: "40px"
                  },
                  "& .css-1q3qg0t-MuiInputBase-root-MuiOutlinedInput-root": {
                    height: "16px",
                    paddingBottom: '4px',
                    fontSize: 19,
                    width: "100%",
                    borderColor: "#ffffff",
                    overflow: "hidden",
                  },
                  "& .css-4jar7x": {
                    height: "32px",
                  },
                  "& .css-wnl09l-MuiFormLabel-root-MuiInputLabel-root": {

                    top: "-8px",
                  },
                  // "& .css-wnl09l-MuiFormLabel-root-MuiInputLabel-root": {
                  //   top: "-8px",
                  // },
                  "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
                    top: '-6px'
                  },

                  svg: {
                    color: "#0B83A5",
                    height: 22,
                    width: "100%",
                    marginRight: "16px",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    onError={onError}
                    error={error}
                    {...params}
                    size="small"
                    fullWidth
                    InputLabelProps={{
                      style: {
                        fontSize: "14px",
                        position: "absolute",
                        top: "-2px",
                      },
                    }}

                  />
                )}
                {...rest}
              />
            </LocalizationProvider>
          )}
        />
      </FormControl>
    </div>
  );
}

export default DatePickerField;