import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DeleteAccount() {
    
    return (
        <div className="dm_sans relative">
            <h1 className="text-[#101928] text-[20px] font-bold py-2">Delete account</h1>
            <p className="text-[#667185] text-sm font-medium">Permanently delete your EventGizmo account</p>
            <Button className="bg-[#FF3B30] hover:bg-red-700  text-white text-center py-3 px-4 mt-5">Delete</Button>
        </div>
    )
}


{/* <AlertDialog >
<AlertDialogTrigger asChild>
  
</AlertDialogTrigger>
<AlertDialogContent className="bg-white z-[999999] absolute">
    <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
        </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex items-center gap-4 flex-row justify-end">
        <AlertDialogCancel className="bg-white text-[#004AAD] hover:bg-gray-100 px-10">Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-[#FF3B30] text-white hover:bg-red-600 px-10">Continue</AlertDialogAction>
    </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog> */}
