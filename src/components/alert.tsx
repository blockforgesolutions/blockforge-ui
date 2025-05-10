import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert as AlertComponent, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertProps {
  message: string;
  type: "error" | "success" | "warning";
  onClose: () => void;
}

export function Alert({ message, type, onClose }: AlertProps) {
  const alertStyles = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
  }

  return (
    <AlertComponent className={cn("flex items-center space-x-4 p-4 rounded-lg shadow-md", alertStyles[type])}>
      <div className="flex-1">
        <AlertTitle className="font-semibold">Something went wrong!</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      <Button variant="link" onClick={onClose}>
        <X className="h-5 w-5" />
      </Button>
    </AlertComponent>
  )
}
