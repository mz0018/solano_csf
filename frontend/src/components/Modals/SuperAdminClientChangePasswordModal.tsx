import { Input } from "../../ui/form/Input"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <Input 
                    name="addressDetail" 
                    type="text" 
                    onChange={(e) => console.log(e.target.value)} 
                    className="w-full mt-1 p-3 text-black"
                    placeholder="Enter Client Name" 
                />
            </div>
        </ModalUI>
    )
}