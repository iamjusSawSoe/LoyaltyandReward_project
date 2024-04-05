import { Box, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import errorImg from "../../../assets/Error visual 1x.png";
import Button from "../Button";
import { setIsErrorModal } from "../../../store/errorSlice";
import type { RootState } from "../../../store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90%, 400px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 2,
};

export default function ErrorModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isErrorModal = useSelector((state: RootState) => state.error.isErrorModal);
  const errorMessage = useSelector((state: RootState) => state.error.errorMessage);

  const handleClose = () => {
    dispatch(setIsErrorModal(false));
    if (errorMessage.linkUrl === "/") navigate("/");
  };

  return (
    <Modal
      className="error-modal modal-popup"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isErrorModal}
      onClose={() => handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isErrorModal}>
        <div>
          <Box sx={style} height={240} className=" modal-popup__box ">
            <div className="modal-popup__body">
              <img className="error-img" src={errorImg} alt="Error Image" />
              <div className="modal-popup__para">
                <h3>{errorMessage.headerText}</h3>
                <p>{errorMessage.labelText}</p>
              </div>

              <div className="btn-bar">
                <Button text="Ok!" onClick={handleClose} />
              </div>
            </div>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}
