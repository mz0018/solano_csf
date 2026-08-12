import { ModalUI } from "../../ui/form/ModalUI"
// import { ErrorText } from "../../ui/form/ErrorText"
// import { InlineLoader } from "../Loader"

type ChangePasswordModalProps = {
  passwordModalOpen: boolean
  setPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const SuperAdminClientChangePasswordModal = ({ passwordModalOpen, setPasswordModalOpen }: ChangePasswordModalProps) => {

    return (
        <ModalUI
            isOpen={passwordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
            title="Client password reset"
        >
            <div className="space-y-4">
                {<></>}
            </div>
        </ModalUI>
    )
}