import { Box, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import modalCoin from "../../../assets/modal-coin.png";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { setIsCustomModal } from "../../../store/customModalSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(90%, 400px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 2,
};

type CustomModalProps = {
  closeRoute: string;
  continueRoute: string;
};

const CustomModal = ({ closeRoute, continueRoute }: CustomModalProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector((state: RootState) => state.customModal.isCustomModal);

  const handleClose = () => {
    dispatch(setIsCustomModal(false));
    navigate(`/${closeRoute}`);
  };

  const handleCloseBack = () => {
    dispatch(setIsCustomModal(false));
    navigate(`/${continueRoute}`);
  };

  return (
    <Modal
      className="modal-popup"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModalOpen}
      onClose={() => dispatch(setIsCustomModal(false))}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <div>
          <Box sx={style} height={350} className="modal-popup__box ">
            <div className="modal-popup__body">
              <img className="modal-img" src={modalCoin} alt="Modal coin" />
              <div className="modal-text">
                <h3>Welcome from Citizens Rewards.</h3>
                <p>
                  Your phone number seems like new! We will verifying you and please set a PIN for
                  further login.
                </p>
              </div>
              <div className="btn-bar">
                <Button text="Back" onClick={handleCloseBack} buttonType="cancel" />
                <Button text="Ok!" onClick={handleClose} />
              </div>
            </div>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
