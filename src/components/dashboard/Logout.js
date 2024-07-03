import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../components/user_authontication/slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 3,
    p: 2,
};

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }


    return (
        <>
            <Tooltip title='Logout' arrow>
                <button type='button' onClick={handleOpen}>
                    <MdOutlineLogout size={25} />
                </button>
            </Tooltip>
            {/* Confirmation Modal component ----------------- */}
            <ConfirmationModal
                open={open}
                style={style}
                handleClose={handleClose}
                handleLogout={handleLogout}
            />
        </>
    );
}

export default React.memo(Logout);

function ConfirmationModal({
    open,
    style,
    handleClose,
    handleLogout
}) {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                    <h1 className='text-center text-[22px] font-semibold'>Do You Want Confirm Logout?</h1>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, gap: '20px' }}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                            className=''
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleLogout}
                            className=''
                        >
                            Confirm
                        </Button>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}