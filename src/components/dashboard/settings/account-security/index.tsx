import EditPassword from "./edit-password"
import EditEmail from "./edit-email"
import DeleteAccount from "./delete-account"
import { Card } from '@/components/ui/card';

export default function AccountAndSecurity() {
    return (
        <Card className="bg-white rounded-md shadow-sm w-full p-4">
            <EditEmail />
            <div className=" h-[1px] bg-[#D0D5DD] my-4"/>
            <EditPassword />
            <div className=" h-[1px] bg-[#D0D5DD] my-4 w-full"/>
            <DeleteAccount />
        </Card>
    )
}
